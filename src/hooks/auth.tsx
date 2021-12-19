import React, { createContext, useCallback, useState, useContext } from 'react';
import { api } from '../services/api';

interface IUser {
  id: string;
  name: string;
}

interface AuthState {
  token: string;
  user: IUser;
}

interface SignInCredentials {
  name: string;
  password: string;
}

interface AuthContextData {
  user: IUser;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
  updateUser(user: IUser): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@MailGo:token');
    const user = localStorage.getItem('@MailGo:user');

    if (token && user) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ name, password }) => {
    const response = await api.post('sessions', {
      name,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@MailGo:token', token);
    localStorage.setItem('@MailGo:user', JSON.stringify(user));

    api.defaults.headers.common.Authorization = `Bearer ${token}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@MailGo:token');
    localStorage.removeItem('@MailGo:user');

    setData({} as AuthState);
  }, []);

  const updateUser = useCallback(
    (user: IUser) => {
      localStorage.setItem('@MailGo:user', JSON.stringify(user));

      setData({
        token: data.token,
        user,
      });
    },
    [data.token],
  );

  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signOut, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
