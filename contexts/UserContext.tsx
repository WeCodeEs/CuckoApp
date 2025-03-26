import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface User {
  phone?: string;
  name?: string;
  lastName?: string;
  email?: string;
  school?: number;
  avatar?: number | string; 
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  clearUser: () => void;
  setAvatar: (avatar: number | string) => void;
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

/* BORRAR USUARIO DE PRUEBA EN PRODUCCIÓN */
export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUserState] = useState<User | null>({
    name: "Juan",
    lastName: "Pérez",
    email: "juan@example.com",
    school: 4,
    avatar: require("@/assets/images/avatars/avatar-icon-1.png"),
    phone: "+52 9511234567",
  });

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const updateUser = (data: Partial<User>) => {
    setUserState(prev => ({ ...(prev || {}), ...data }));
  };

  const clearUser = () => {
    setUserState(null);
  };

  const setAvatar = (avatar: number | string) => {
    updateUser({ avatar });
  };

  const setEmail = (email: string) => {
    updateUser({ email });
  };

  const setPhone = (phone: string) => {
    updateUser({ phone });
  };

  const setSchool = (school: number) => {
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
