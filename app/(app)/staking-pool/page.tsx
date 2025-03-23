'use client';

import { MainHeader } from '@/vaquita-ui-submodule/components';
import StakingPool from '@/vaquita-ui-submodule/components/StakingPool/page';
import { motion } from 'framer-motion';
import React from 'react';

const Page = () => {
  
  const address = '0x12';
  
  return (
    <motion.div
      key="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      style={{ height: '100%', width: '100%' }}
    >
      <MainHeader
        walletButtons={
          <>
            <button>header 1</button>
          </>
        }
      />
      <StakingPool address={address} />
    </motion.div>
  );
};

export default Page;
