import * as React from 'react';
import { Logger } from '@turboutils/logger';
import { User } from '../../models';

// ---------- AuthState ----------
interface AuthState {
  user?: User;
}

// ---------- AuthStateContext ----------
const AuthStateContext = React.createContext<
  | {
      authState: AuthState;
      handleSignIn: (user: User) => void;
      handleSignOut: () => void;
    }
  | undefined
>(undefined);

// ---------- AuthStateContextProvider ----------
interface AuthStateContextProviderProps {
  children?: React.ReactNode;
}

function AuthStateContextProvider({ children }: AuthStateContextProviderProps) {
  const [authState, setAuthState] = React.useState<AuthState>({
    user: undefined,
  });

  const handleSignIn = async (user: User) => {
    // Flush logs before signing in
    await Logger.flush();

    // Sign in
    setAuthState({ ...authState, user });
    Logger.setUserId(user.username);
    Logger.info({ type: 'SignIn', userId: user.username });
  };

  const handleSignOut = async () => {
    // Flush logs before signing out
    const username = authState.user ? authState.user.username : 'unknown';
    Logger.info({ type: 'SignOut', userId: username });
    await Logger.flush();

    // Sign out
    setAuthState({ ...authState, user: undefined });
    Logger.setUserId('unknown');
  };

  const value = { authState, handleSignIn, handleSignOut };
  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  );
}

// ---------- useAuthStateContext ----------
function useAuthStateContext() {
  const authStateContext = React.useContext(AuthStateContext);
  /* istanbul ignore next */
  if (authStateContext === undefined) {
    throw new Error(
      'useAuthStateContext must be used within a AuthStateContextProvider'
    );
  }
  return authStateContext;
}

export { AuthStateContextProvider, useAuthStateContext };
