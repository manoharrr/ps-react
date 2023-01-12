import React, { useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useStorage";

type AuthenticationType = {
  user: null | string;
  login: (user: null | string) => void;
  logout: () => void;
};

const Authentication = React.createContext<AuthenticationType>(
  {} as AuthenticationType
);

export type Props = {
  children?: React.ReactNode;
};

const AuthenticationProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<null | string>(null);
  const [localVal, setLocal, removeLocal] = useLocalStorage("name", "");
  const login = (user: string | null) => {
    setUser(user);
    setLocal(user);
  };
  const logout = () => {
    console.log("clicked logout");
    setUser(null);
    removeLocal();
  };
  useEffect(() => {
    if (localVal.length > 0) {
      setUser(localVal);
    }
    // eslint-disable-next-line
  }, []);
  return (
    <Authentication.Provider value={{ user, login, logout }}>
      {children}
    </Authentication.Provider>
  );
};

export default AuthenticationProvider;

export const useAuthentication = () => React.useContext(Authentication);
