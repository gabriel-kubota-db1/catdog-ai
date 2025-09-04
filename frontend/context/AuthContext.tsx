import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getMe } from '@/http/AuthHttpService';
import { storage } from '@/storage';
import { defineAbilityFor, AppAbility } from '@/config/ability';

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  ability: AppAbility;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [ability, setAbility] = useState<AppAbility>(defineAbilityFor(null));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = storage.getToken();
    if (token) {
      try {
        jwtDecode(token); // check if token is valid
        getMe()
          .then((userData) => {
            setUser(userData);
            setAbility(defineAbilityFor(userData));
          })
          .catch(() => {
            storage.clearToken();
            setUser(null);
            setAbility(defineAbilityFor(null));
          })
          .finally(() => setLoading(false));
      } catch (error) {
        storage.clearToken();
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    setAbility(defineAbilityFor(user));
  }, [user]);

  const logout = () => {
    storage.clearToken();
    setUser(null);
  };

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout, ability }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
