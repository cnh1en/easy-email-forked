import React from 'react';
import { AppProvider } from '@shopify/polaris';
import translations from '@shopify/polaris/locales/en.json';

const PolarisProvider = ({ children }: { children: React.ReactNode }) => {
  return <AppProvider i18n={translations}>{children}</AppProvider>;
};

export default PolarisProvider;
