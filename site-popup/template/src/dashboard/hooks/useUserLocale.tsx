import { useEnvironment } from '@wix/sdk-react';
import { EnvironmentState } from '@wix/dashboard';

export const useUserLocale = () => {
  const { locale } = useEnvironment<EnvironmentState>();
  return locale;
};
