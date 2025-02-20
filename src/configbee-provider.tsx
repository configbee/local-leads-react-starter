"use client"
import React from 'react';
import { CbWrapper } from 'configbee-react';

const ConfigbeeProvider = ({ children }:{
    children: React.ReactNode
  }) => {
    if(!import.meta.env.VITE_CB_ENV_ID){
      return <>{children}</>
    }
  return (
    <CbWrapper
      accountId={import.meta.env.VITE_CB_ACCOUNT_ID}
      projectId={import.meta.env.VITE_CB_PROJECT_ID}
      environmentId={import.meta.env.VITE_CB_ENV_ID}
    >
      {children}
    </CbWrapper>
  );
};

export default ConfigbeeProvider;