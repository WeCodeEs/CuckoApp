import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { User } from "@/constants/types";

interface SessionContextProps {
  session: any;
  user: User | null;
  accessToken: string | null;
  setSession: (session: any) => void;
  clearSession: () => void;
}

interface SessionProviderProps {
  children: ReactNode;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined
);

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};

export const SessionProvider = ({ children }: SessionProviderProps) => {
  const [session, setSession] = useState<any>(null);
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const clearSession = () => {
    setSession(null);
    setUser(null);
    setAccessToken(null);
  };

  useEffect(() => {
    if (session) {
      setSession(session);
      setUser(session.user);
      setAccessToken(session.access_token);
    }
  }, []);

  return (
    <SessionContext.Provider
      value={{ session, user, accessToken, setSession, clearSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};
