import React, { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider, App as AntdApp } from 'antd';
import { AuthProvider } from '@/context/AuthContext';
import { AbilityContext } from '@/config/ability';
import { useAuth } from '@/context/AuthContext';

const queryClient = new QueryClient();

const AbilityProvider = ({ children }: { children: ReactNode }) => {
  const { ability } = useAuth();
  return (
    <AbilityContext.Provider value={ability}>
      {children}
    </AbilityContext.Provider>
  );
};

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider>
        <AntdApp>
          <AuthProvider>
            <AbilityProvider>
              {children}
            </AbilityProvider>
          </AuthProvider>
        </AntdApp>
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default AppProviders;
