import type { UserProfile } from "../models/User";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { register, signin } from "../services/AuthService";
import type { RegisterFormData } from "../components/registerForm/schema";
import { toast } from "react-toastify";
import type { LoginFormData } from "../components/loginForm/schema";
import React from "react";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (data: RegisterFormData) => void;
  loginUser: (data: LoginFormData) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
    }
    setIsReady(true);
  }, []);

  const registerUser = async (data: RegisterFormData) => {
    if (!registerUser) {
      toast.warning("Login Unsuccessful!");
    }
    const result = await register(data);
    localStorage.setItem("token", result.token);
    const userObj = {
      username: result.username,
      roles: result.roles,
    };
    localStorage.setItem("user", JSON.stringify(userObj));
    setToken(result.token);
    setUser(userObj);
    toast.success("Login Success!");
    navigate("/");
  };

  const loginUser = async (data: LoginFormData) => {
    if (!loginUser) {
      toast.warning("Login Unsuccessful!");
    }
    const result = await signin(data);
    localStorage.setItem("token", result.jwtToken);
    const userObj = {
      username: result.username,
      roles: result.roles,
    };
    localStorage.setItem("user", JSON.stringify(userObj));
    setToken(result.jwtToken);
    setUser(userObj);
    toast.success("Login Success!");
    navigate("/");
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
