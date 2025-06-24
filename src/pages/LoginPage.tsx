import { useNavigate } from "react-router";
import LoginForm from "../components/loginForm/LoginForm";
import type { LoginFormData } from "../components/loginForm/schema";
import { useState } from "react";
import { signin } from "../services/AuthService";

const LoginPage = () => {
  const [loginData, setLogindata] = useState<LoginFormData>();
  const navigate = useNavigate();
  const onSubmit = async (data: LoginFormData) => {
    console.log(data);
    setLogindata(data);
    const result = await signin(data);
    console.log(result);
    alert("You are logged in! 🙂");
    navigate("/");
  };

  return (
    <>
      <header className="text-3xl text-orange-500 pb-10">Login</header>
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
