import React, { createContext, useContext, useState, ReactNode } from 'react';
import { updateUserProfile } from "@/constants/api";
import { User } from "@/constants/types";
import { formatPhoneNumber } from "@/constants/validations"
import { Session } from "@supabase/auth-js";

interface UserContextProps {
  user: User | null;
  session: Session | null;
  setUser: (user: User) => void;
  updateUser: (data: Partial<User>) => Promise<any>;
  clearUser: () => void;
  setAvatar: (avatar: number | string) => void;
  setEmail: (email: string) => Promise<void>;
  setPhone: (phone: string) => Promise<void>;
  setFacultyId: (facultyId: number) => Promise<void>;
  setName: (name: string) => void;
  setLastName: (lastName: string) => void;
  setSession: (sessionData: Session) => void;
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
    avatar: null,
    phone: "+52 9513952003",
    session: null,
  });
  const [session, setSessionState] = useState<Session | null>(null);

  const setUser = (newUser: User) => {
    setUserState(newUser);
  };

  const setSession = (sessionData: Session) => {
    setSessionState(sessionData);
    if (sessionData && sessionData.user && sessionData.user.id) {
      const supabaseUser = sessionData.user;
      const userData: User = {
        uuid: supabaseUser.id,
        phone: formatPhoneNumber(supabaseUser.phone!),
      };
      setUserState(userData);
    }
  };

  const updateUser = async (data: Partial<User>) => {
    const currentUuid = user?.uuid;
    if (!currentUuid) {
      console.error("No se encontró ID de usuario en el contexto");
      throw new Error("No se encontró ID de usuario en el contexto");
    }
  
    setUserState((prev) => ({ ...(prev || {}), ...data }));
  
    try {
      await updateUserProfile(currentUuid, data);
      console.log("Se ejecutó updateUserProfile en UserContext.tsx");
    } catch (e) {
      console.error("Error al ejecutar updateUserProfile:", e);
      throw e;
    }
  };
  
  
  

  const clearUser = () => {
    setUserState(null);
  };

  const setAvatar = (avatar: number | string) => {
    setUserState(prev => ({ ...(prev || {}), avatar }));
  };

  const setEmail = async (email: string): Promise<void> => {
    await updateUser({ email });
  };
  
  const setPhone = async (phone: string): Promise<void> => {
    await updateUser({ phone });
  };
  
  const setFacultyId = async (facultyId: number): Promise<void> => {
    await updateUser({ facultyId });
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
        session,
        setUser,
        updateUser,
        clearUser,
        setAvatar,
        setEmail,
        setPhone,
        setFacultyId,
        setName,
        setLastName,
        setSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
