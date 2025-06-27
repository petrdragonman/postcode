import { useNavigate } from "react-router";
import LoginForm from "../components/loginForm/LoginForm";
import type { LoginFormData } from "../components/loginForm/schema";
import { useState } from "react";
import { signin, storeToken } from "../services/AuthService";
import { useAuth } from "../context/useAuth";

const LoginPage = () => {
  const { isAuthenticated, logout, login } = useAuth();
  const [loginData, setLogindata] = useState<LoginFormData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginFormData) => {
    setLogindata(data);
    const result = await signin(data);
    storeToken(result.jwtToken);
    login(result.jwtToken);
    navigate("/");
  };

  return (
    <>
      <header className="text-3xl text-orange-500 pb-10">Log In</header>
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};

export default LoginPage;

/**
 * http://localhost:8080/signin
 * 
 * {
    "username": "petr",
    "password": "test@123"
   }
 *
 *
 *
 * "jwtToken": "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJwZXRyIiwiaWF0IjoxNzUwNjM2NTc5LCJleHAiOjE3NTA2NzY1Nzl9.u5rgjhsyev5X98tU1obT4c_Hgn4cvQHBLbulvl2rboPZixbbadCzVJfm1fb6sn94",
    "roles": [
        "ADMIN"
    ],
    "username": "petr"
 */
