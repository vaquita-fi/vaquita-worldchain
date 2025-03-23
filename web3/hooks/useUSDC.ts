import { getPublicClient } from '@wagmi/core';
import { useCallback } from 'react';
import { useAccount, useWriteContract } from 'wagmi';
import { USDC_CONTRACT_ADDRESS } from '../config/constants';
import erc20Abi from '../ERC20ABI';
import { ErrorTransaction, SuccessTransaction, Transaction } from '../types';
import { useWagmiConfig } from './useWagmiConfig';

export const useUSDC = (spenderAddress: `0x${string}`) => {
  
  const { address } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const wagmiConfig = useWagmiConfig();
  const client = getPublicClient(wagmiConfig);
  
  const approveTokens = useCallback(async (amount: bigint): Promise<Transaction> => {
    if (!address) {
      throw new Error('No account connected');
    }
    
    try {
      console.info(`approving tokens..., amount: "${amount}"`);
      const transactionHash = await writeContractAsync({
        address: USDC_CONTRACT_ADDRESS,
        abi: erc20Abi,
        functionName: 'approve',
        args: [ spenderAddress, amount ],
      });
      console.info(`approve tokens sent, transactionHash: "${transactionHash}"`);
      
      console.info(`wait for transaction receipt..., transactionHash: "${transactionHash}"`);
      const receipt = await client.waitForTransactionReceipt({
        hash: transactionHash,
        confirmations: 1,
      });
      
      const result: SuccessTransaction = { success: true, error: null, transactionHash, receipt: receipt };
      console.info('approved tokens', { result });
      
      return result;
    } catch (error) {
      const result: ErrorTransaction = { success: false, error: error as Error, transactionHash: null, receipt: null };
      console.error('error approving tokens', { result });
      return result;
    }
  }, [ writeContractAsync, address, spenderAddress ]);
  
  return {
    approveTokens,
  };
};
