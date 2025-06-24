import { useNavigate } from "react-router";
import RegisterForm from "../components/registerForm/RegisterForm";
import type { RegisterFormData } from "../components/registerForm/schema";
import { useState } from "react";

const RegisterPage = () => {
  const [registerData, setRegisterData] = useState<RegisterFormData>();
  const navigate = useNavigate();
  const onSubmit = (data: RegisterFormData) => {
    console.log(data);
    setRegisterData(data);
  };

  return (
    <>
      <header className="text-3xl text-orange-500 pb-10">Login</header>
      <RegisterForm onSubmit={onSubmit} />
    </>
  );
};

export default RegisterPage;
