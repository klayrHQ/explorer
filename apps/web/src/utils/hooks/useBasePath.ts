import { useApp } from './useApp';

export const useBasePath = () => {
  const app = useApp();
  return `/${app}`;
};
