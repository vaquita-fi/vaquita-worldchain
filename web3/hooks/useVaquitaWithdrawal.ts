import { GroupResponseDTO } from '@/vaquita-ui-submodule/types';
import { useCallback } from 'react';

export const useVaquitaWithdrawal = () => {
  
  const withdrawalEarnedRound = useCallback(
    async (
      group: GroupResponseDTO,
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      console.info('withdrawalEarnedRound', { group });
      return { tx: '', error: null, success: false };
    }, []);
  
  const withdrawalCollateralAndEarnedInterest = useCallback(
    async (
      group: GroupResponseDTO,
    ): Promise<{ tx: string; error: any; success: boolean }> => {
      console.info('withdrawalCollateralAndEarnedInterest', { group });
      return { tx: '', error: null, success: false };
    }, []);
  
  return {
    withdrawalEarnedRound,
    withdrawalCollateralAndEarnedInterest,
  };
};
