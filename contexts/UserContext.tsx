import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  phone?: string;
  name?: string;
  lastName?: string;
  email?: string;
  school?: string;
  avatar?: string;  
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  clearUser: () => void;

  setAvatar: (avatar: string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setSchool: (school: string) => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser debe usarse dentro de un UserProvider");
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUserState] = useState<User | null>(null);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const updateUser = (data: Partial<User>) => {
    setUserState((prev) => {
      return { ...(prev || {}), ...data };
    });
  };

  const clearUser = () => {
    setUserState(null);
  };

  const setAvatar = (avatar: string) => {
    updateUser({ avatar });
  };

  const setEmail = (email: string) => {
    updateUser({ email });
  };

  const setPhone = (phone: string) => {
    updateUser({ phone });
  };

  const setSchool = (school: string) => {
    updateUser({ school });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        updateUser,
        clearUser,
        setAvatar,
        setEmail,
        setPhone,
        setSchool,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
