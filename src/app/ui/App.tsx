import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { AppRouter } from '../providers/router';
import { queryClient } from '../providers/query-client';
import { ModalTeleport } from '@/widgets/modal-teleport';
import '../styles/base.css';

const layoutStyles: React.CSSProperties = {
  position: 'relative',
  width: '70vw',
  maxWidth: 1200,
  minWidth: 375,
  height: '100vh',
  padding: '0 60px 50px 60px',
  backgroundColor: '#ffffff',
  overflowY: 'auto',
};

export function App() {
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <div className="layout" style={layoutStyles}>
            <AppRouter />
          </div>
          <ModalTeleport />
        </BrowserRouter>
      </QueryClientProvider>
    </RecoilRoot>
  );
}
