import { context } from './global';
import { useGlobalState } from './useGlobalState';

export const GlobalProvider = ({ children }) => {
  const [state, setGlobal] = useGlobalState();

  return (
    <context.Provider value={{ state, setGlobal }}>
      {children}
    </context.Provider>
  );
};