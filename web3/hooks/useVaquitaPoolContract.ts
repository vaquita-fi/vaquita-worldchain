import * as viemChains from 'viem/chains';
import { PUBLIC_NETWORK, VAQUITA_POOL_CONTRACT_ADDRESS } from '../config/constants';
import VaquitaABI from '../config/VaquitaPoolABI';
import { getChainByName } from '../utils';
import { generateContractHook } from './useContract';

const network = getChainByName(viemChains, PUBLIC_NETWORK);

/**
 * Returns contract data for the Vaquita contract.
 */
export const useVaquitaPoolContract = generateContractHook({
  abi: VaquitaABI,
  [network.id]: {
    chain: network,
    address: VAQUITA_POOL_CONTRACT_ADDRESS,
  },
  
  // ... more chains for this contract go here
});
