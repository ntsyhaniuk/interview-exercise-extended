import { useTransitionApi } from "./useTransitionApi";


export const useSmoothNavigate = (navigate) => {
  const smoothNavigate = useTransitionApi(navigate);

  return (...args) => {
    smoothNavigate(...args);
  };
};