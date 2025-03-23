import { GroupResponseDTO } from '@/vaquita-ui-submodule/types';
import { useCallback } from 'react';

export const useVaquitaDeposit = () => {
  
  const depositCollateralAndCreate = useCallback(
    async (
      group: GroupResponseDTO,
    ): Promise<{ tx: string; error: any; success: boolean; receipt: any; }> => {
      console.info('depositCollateralAndCreate', { group });
      return { tx: '', receipt: null, error: null, success: false };
    },
    [],
  );
  
  const depositCollateralAndJoin = useCallback(
    async (
      group: GroupResponseDTO,
    ): Promise<{ tx: string; receipt: any; error: any; success: boolean }> => {
      console.info('depositCollateralAndJoin', { group });
      return { tx: '', receipt: null, error: null, success: false };
    },
    [],
  );
  
  const depositRoundPayment = useCallback(
    async (
      group: GroupResponseDTO,
      turn: number,
    ): Promise<{ tx: string; receipt: any; error: any; success: boolean }> => {
      console.info('depositRoundPayment', { group, turn });
      return { tx: '', receipt: null, error: null, success: false };
    },
    [],
  );
  
  return {
    depositCollateralAndCreate,
    depositCollateralAndJoin,
    depositRoundPayment,
  };
};
