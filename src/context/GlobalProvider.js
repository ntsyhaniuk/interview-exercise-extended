import { context } from './global';
import { useGlobalState } from './useGlobalState';

export const GlobalProvider = ({ children }) => {
  const [state, setGlobal] = useGlobalState();

  // React Compiler memoizes the provider value; keep the object inline.
  return (
    <context.Provider value={{ state, setGlobal }}>
      {children}
    </context.Provider>
  );
};
