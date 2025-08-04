import { createContext, useContext, useState, ReactNode } from 'react';
import { User, UserRole } from '../types/user';

// Demo user for presentation
const demoUser: User = {
  id: '1',
  name: 'El Ghali Benchekroun',
  email: 'elghali.benchekroun@databricks.com',
  role: UserRole.ADMIN,
  organization: 'Databricks Financial Intelligence',
  avatar: 'https://ca.slack-edge.com/E02727P8HV4-U05TRC8UE4T-6ae00704f9a7-512'
};

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isProvider: boolean;
  isConsumer: boolean;
  isAdmin: boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(demoUser);

  const isProvider = user?.role === UserRole.PROVIDER || user?.role === UserRole.ADMIN;
  const isConsumer = user?.role === UserRole.CONSUMER || user?.role === UserRole.PROVIDER || user?.role === UserRole.ADMIN;
  const isAdmin = user?.role === UserRole.ADMIN;

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isProvider,
        isConsumer,
        isAdmin,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}