import React, { createContext, FC, ReactNode, useMemo, useState } from 'react';

export const AuthContext = createContext<ContextTypes>({
  auth: '',
  login: (): void => undefined,
  logout: (): void => undefined,
});

type ContextTypes = {
  auth: string;
  login: (authData: string) => void;
  logout: () => void;
};
type Props = { children: ReactNode };

export const AuthProvider: FC<Props> = ({ children }) => {
  const persistedAuth = JSON.parse(localStorage.getItem('auth') as string);
  const [auth, setAuth] = useState(persistedAuth);

  function login(authData: string) {
    setAuth(authData);
    localStorage.setItem('auth', JSON.stringify(authData));
  }

  function logout() {
    setAuth('');
    localStorage.removeItem('auth');
  }

  const memoizedValues = useMemo(() => {
    return {
      auth,
      login,
      logout,
    };
  }, [auth, login, logout]);

  return (
    <AuthContext.Provider value={memoizedValues}>
      {children}
    </AuthContext.Provider>
  );
};
