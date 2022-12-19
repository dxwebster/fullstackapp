import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import { Alert } from 'react-native';
import { FULLSTACK_APP_TOKEN, FULLSTACK_APP_USER } from '../constants';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  name: string;
  avatar_url: string;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  loading: boolean;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const [token, user] = await AsyncStorage.multiGet([
        FULLSTACK_APP_TOKEN,
        FULLSTACK_APP_USER,
      ]);

      if (token[1] && user[1]) {
        api.defaults.headers.authorization = `Bearer ${token[1]}`;

        setData({ token: token[1], user: JSON.parse(user[1]) });
      }

      setLoading(false);
    }

    loadStoragedData();
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    const { data: users } = await api.get('users');

    const [user] = users.filter(
      (item: SignInCredentials) =>
        item.email === email && item.password === password,
    );

    if (!user) {
      Alert.alert('Ocorreu um  erro ao fazer login, cheque as credenciais');
    }

    await api.post('sessions', { email, password });

    const token = 'token_value';

    await AsyncStorage.multiSet([
      [FULLSTACK_APP_TOKEN, token],
      [FULLSTACK_APP_USER, JSON.stringify(user)],
    ]);

    api.defaults.headers.authorization = `Bearer ${token[1]}`;

    setData({ token, user });
  }, []);

  const signOut = useCallback(async () => {
    console.log('aqui');
    await AsyncStorage.multiRemove([FULLSTACK_APP_USER, FULLSTACK_APP_TOKEN]);

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
