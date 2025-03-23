import { USDC_DECIMALS, VAQUITA_POOL_CONTRACT_ADDRESS } from '@/web3/config/constants';
import { getPublicClient } from '@wagmi/core';
import { useCallback } from 'react';
import { v4 } from 'uuid';
import { pad, toHex } from 'viem';
import { useWriteContract } from 'wagmi';
import { ErrorTransaction, SuccessTransaction, Transaction } from '../types';
import { useUSDC } from './useUSDC';
import { useVaquitaPoolContract } from './useVaquitaPoolContract';
import { useWagmiConfig } from './useWagmiConfig';

export const useVaquitaPool = () => {
  
  const { writeContractAsync } = useWriteContract();
  const contract = useVaquitaPoolContract();
  const wagmiConfig = useWagmiConfig();
  
  const client = getPublicClient(wagmiConfig);
  
  const { approveTokens } = useUSDC(VAQUITA_POOL_CONTRACT_ADDRESS);
  
  const deposit = useCallback(
    async (_amount: number): Promise<Transaction> => {
      
      const amount = BigInt(_amount) * BigInt(USDC_DECIMALS);
      const depositId = v4();
      const uuidHex = depositId.replace(/-/g, '');
      const uuidBytes = toHex(Buffer.from(uuidHex, 'hex'));
      const bytes32Value = pad(uuidBytes, { size: 32 });
      
      try {
        const approved = await approveTokens(amount);
        
        if (approved.error) {
          throw approved.error;
        }
        
        console.info(`depositing..., amount: "${amount}", depositId: "${depositId}"`);
        const transactionHash = await writeContractAsync({
          address: VAQUITA_POOL_CONTRACT_ADDRESS,
          abi: contract.abi,
          functionName: 'deposit',
          args: [
            bytes32Value,
            amount,
          ],
          gas: 3000000n,
        });
        console.info(`deposit sent, transactionHash: "${transactionHash}"`);
        
        console.info(`wait for transaction receipt..., transactionHash: "${transactionHash}"`);
        const receipt = await client.waitForTransactionReceipt({
          hash: transactionHash,
          confirmations: 1,
        });
        
        const result: SuccessTransaction = { success: true, error: null, transactionHash, receipt: receipt };
        console.info('deposited', { result });
        
        return result;
      } catch (error) {
        const result: ErrorTransaction = {
          success: false,
          error: error as Error,
          transactionHash: null,
          receipt: null,
        };
        console.error('error depositing', { result });
        return result;
      }
    },
    [ approveTokens, writeContractAsync, contract.abi ],
  );
  
  const withdraw = useCallback(
    async (depositId: `0x${string}`): Promise<Transaction> => {
      
      try {
        console.info(`withdrawing..., depositId: "${depositId}"`);
        const transactionHash = await writeContractAsync({
          address: VAQUITA_POOL_CONTRACT_ADDRESS,
          abi: contract.abi,
          functionName: 'withdraw',
          args: [
            depositId,
          ],
          // gas: 3000000n,
        });
        console.info(`withdraw sent, transactionHash: "${transactionHash}"`);
        
        console.info(`wait for transaction receipt..., transactionHash: "${transactionHash}"`);
        const receipt = await client.waitForTransactionReceipt({
          hash: transactionHash,
          confirmations: 1,
        });
        
        const result: SuccessTransaction = { success: true, error: null, transactionHash, receipt: receipt };
        console.info('withdrawn', { result });
        
        return result;
      } catch (error) {
        const result: ErrorTransaction = {
          success: false,
          error: error as Error,
          transactionHash: null,
          receipt: null,
        };
        console.error('error withdrawing', { result });
        return result;
      }
    },
    [ approveTokens, writeContractAsync, contract.abi ],
  );
  
  return {
    deposit,
    withdraw,
  };
};
