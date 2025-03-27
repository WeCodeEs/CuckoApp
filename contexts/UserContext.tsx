import React, { createContext, useContext, useState, ReactNode } from 'react';
import { updateUserProfile } from "@/constants/api";
import { User } from "@/constants/types";

interface UserContextProps {
  user: User | null;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => void;
  clearUser: () => void;
  setAvatar: (avatar: number | string) => void;
  setEmail: (email: string) => void;
  setPhone: (phone: string) => void;
  setFacultyId: (facultyId: number) => void;
  setName: (name: string) => void;
  setLastName: (lastName: string) => void;
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
    uuid: "029a4f12-a0ef-45ba-8c29-7b41faf82f0e",
    name: "Adan",
    lastName: "Jimenez",
    email: "adan@mail.com",
    facultyId: 1,
    avatar: require("@/assets/images/avatars/avatar-icon-1.png"),
    phone: "+52 9513952003",
  });

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const updateUser = async (data: Partial<User>) => {
    const currentUuid = user?.uuid;
    if (!currentUuid) {
      console.error("No se encontró el UUID en el contexto de usuario");
      return;
    }
  
    setUserState((prev) => ({ ...(prev || {}), ...data }));
  
    try {
      await updateUserProfile(currentUuid, data);
      console.log("Se ejecutó updateUserProfile en UserContext.tsx");
    } catch (e) {
      console.error("Error al ejecutar updateUserProfile:", e);
    }
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

  const setFacultyId = (facultyId: number) => {
    updateUser({ facultyId });
  };

  const setName = (name: string) => {
    setUserState(prev => ({ ...(prev || {}), name }));
  };

  const setLastName = (lastName: string) => {
    setUserState(prev => ({ ...(prev || {}), lastName }));
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
        setFacultyId,
        setName,
        setLastName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
