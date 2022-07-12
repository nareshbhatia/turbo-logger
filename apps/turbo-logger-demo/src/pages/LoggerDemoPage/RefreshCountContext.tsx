import * as React from 'react';

// ---------- RefreshCountContext ----------
// contains RefreshCount and RefreshCountSetter

type RefreshCountSetter = (refreshCount: number) => void;

const RefreshCountContext = React.createContext<
  { refreshCount: number; setRefreshCount: RefreshCountSetter } | undefined
>(undefined);

// ---------- RefreshCountContextProvider ----------
interface RefreshCountContextProviderProps {
  children?: React.ReactNode;
}

function RefreshCountContextProvider({
  children,
}: RefreshCountContextProviderProps) {
  const [refreshCount, setRefreshCount] = React.useState(0);

  const value = { refreshCount, setRefreshCount };
  return (
    <RefreshCountContext.Provider value={value}>
      {children}
    </RefreshCountContext.Provider>
  );
}

// ---------- useRefreshCountContext ----------
function useRefreshCountContext() {
  const refreshCountContext = React.useContext(RefreshCountContext);
  /* istanbul ignore next */
  if (refreshCountContext === undefined) {
    throw new Error(
      'useRefreshCountContext must be used within a RefreshCountContextProvider'
    );
  }
  return refreshCountContext;
}

export { RefreshCountContextProvider, useRefreshCountContext };
