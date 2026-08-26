import { context } from './global';
import { useGlobalState } from './useGlobalState';

export const GlobalProvider = ({ children }) => {
  const [state, setGlobal] = useGlobalState();

  const memoizedValue = useMemo(() => ({ state, setGlobal }), [state, setGlobal]);

  return (
    <context.Provider value={memoizedValue}>
      {children}
    </context.Provider>
  );
};
