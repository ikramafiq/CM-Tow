import { createContext, useContext, useState, type ReactNode } from 'react';
import { type User, type UserRole, mockUsers } from '../data/mock-data';

interface AuthContextValue {
  currentUser: User | null;
  role: UserRole | null;
  login: (email: string, password: string) => User | null;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const login = (email: string, password: string): User | null => {
    const user = mockUsers.find(
      (u) => u.email === email && u.password === password && u.isActive
    ) ?? null;
    if (user) setCurrentUser(user);
    return user;
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, role: currentUser?.role ?? null, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
