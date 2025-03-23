'use client';

import '@/vaquita-ui-submodule/styles/commons.css';
import { MainLayout } from '@/vaquita-ui-submodule/components';
import './styles.css';
import React from 'react';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  
  const address = '0x123';
  
  return (
    <MainLayout
      walletButtons={
        <>
          <button>hi!</button>
        </>
      }
    >
      {children}
    </MainLayout>
  );
}
