import { USDC_DECIMALS, VAQUITA_POOL_CONTRACT_ADDRESS, USDC_CONTRACT_ADDRESS } from '@/web3/config/constants';
import { useCallback } from 'react';
import { v4 } from 'uuid';
import { MiniKit } from '@worldcoin/minikit-js';
import type { MiniAppSendTransactionErrorPayload } from '@worldcoin/minikit-js';
import { ErrorTransaction, SuccessTransaction, Transaction } from '../types';
import { useVaquitaPoolContract } from './useVaquitaPoolContract';

// Extend the SuccessTransaction type to include depositId
interface DepositSuccessTransaction extends SuccessTransaction {
  depositId: `0x${string}`;
}

export const useVaquitaPool = () => {
  const contract = useVaquitaPoolContract();
  
  const deposit = useCallback(
    async (_amount: number): Promise<Transaction> => {
      // Convert amount to the correct format with decimals
      const amount = BigInt(_amount) * BigInt(USDC_DECIMALS);
      
      // Generate a unique deposit ID
      const depositId = v4();
      // Convert UUID to bytes32 format
      const bytes32Value = `0x${depositId.replace(/-/g, '')}` as `0x${string}`;
      
      try {
        // Check if MiniKit is installed
        if (!MiniKit.isInstalled()) {
          throw new Error("MiniKit not installed");
        }
        
        // Set up the permit2 deadline (30 minutes from now)
        const deadline = Math.floor((Date.now() + 30 * 60 * 1000) / 1000).toString();
        
        // Create the permit transfer object
        const permitTransfer = {
          permitted: {
            token: USDC_CONTRACT_ADDRESS,
            amount: amount.toString(),
          },
          nonce: Date.now().toString(),
          deadline,
        };
        
        console.info(`depositing..., amount: "${amount}", depositId: "${depositId}"`);
        
        // Use MiniKit's sendTransaction
        const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
          transaction: [
            {
              address: VAQUITA_POOL_CONTRACT_ADDRESS,
              abi: contract.abi,
              functionName: 'deposit',
              args: [
                bytes32Value,
                amount.toString(),
              ],
            },
          ],
          permit2: [
            {
              ...permitTransfer,
              spender: VAQUITA_POOL_CONTRACT_ADDRESS,
            },
          ],
        });
        
        if (finalPayload.status === 'error') {
          const errorPayload = finalPayload as MiniAppSendTransactionErrorPayload;
          throw new Error(errorPayload.error_code || 'Transaction failed');
        }
        
        const transactionId = finalPayload.transaction_id;
        console.info(`deposit sent, transactionId: "${transactionId}"`);
        
        const result: DepositSuccessTransaction = { 
          success: true, 
          error: null, 
          transactionHash: transactionId as `0x${string}`, 
          receipt: { transactionId },
          depositId: bytes32Value 
        };
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
    [contract.abi],
  );
  
  const withdraw = useCallback(
    async (depositId: `0x${string}`): Promise<Transaction> => {
      try {
        // Check if MiniKit is installed
        if (!MiniKit.isInstalled()) {
          throw new Error("MiniKit not installed");
        }
        
        console.info(`withdrawing..., depositId: "${depositId}"`);
        
        // Use MiniKit's sendTransaction
        const { finalPayload } = await MiniKit.commandsAsync.sendTransaction({
          transaction: [
            {
              address: VAQUITA_POOL_CONTRACT_ADDRESS,
              abi: contract.abi,
              functionName: 'withdraw',
              args: [
                depositId,
              ],
            },
          ],
        });
        
        if (finalPayload.status === 'error') {
          const errorPayload = finalPayload as MiniAppSendTransactionErrorPayload;
          throw new Error(errorPayload.error_code || 'Transaction failed');
        }
        
        const transactionId = finalPayload.transaction_id;
        console.info(`withdraw sent, transactionId: "${transactionId}"`);
        
        const result: SuccessTransaction = { 
          success: true, 
          error: null, 
          transactionHash: transactionId as `0x${string}`, 
          receipt: { transactionId } 
        };
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
    [contract.abi],
  );
  
  return {
    deposit,
    withdraw,
  };
};
