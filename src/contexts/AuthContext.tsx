import { createContext, ReactNode, useContext } from 'react';
import { auth } from '@services/auth';

type SignCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  signIn(credentials: SignCredentials): Promise<void>;
  isAuthenticated: boolean;
};

const AuthContext = createContext({} as AuthContextData);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({ email, password }: SignCredentials) {
    try {
      const response = await auth.post('/sessions', { email, password });
    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
