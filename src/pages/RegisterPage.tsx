import { useNavigate } from "react-router";
import RegisterForm from "../components/registerForm/RegisterForm";
import type { RegisterFormData } from "../components/registerForm/schema";
import { useState } from "react";
import { register } from "../services/AuthService";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState<RegisterFormData>();
  const navigate = useNavigate();
  const onSubmit = async (data: RegisterFormData) => {
    setRegisterData(data);
    const result = await register(data);
    navigate("/");
  };

  return (
    <>
      <header className="text-3xl text-orange-500 pb-10">Register</header>
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
};

export default RegisterPage;
