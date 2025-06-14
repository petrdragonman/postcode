import { useNavigate } from "react-router";
import LoginForm from "../components/loginForm/LoginForm";
import type { LoginFormData } from "../components/loginForm/schema";

const LoginPage = () => {
  const navigate = useNavigate();
  const onSubmit = (data: LoginFormData) => {
    console.log(data);
  };

  return (
    <>
      <header>Log In Page</header>
      <LoginForm onSubmit={onSubmit} />
    </>
  );
};

export default LoginPage;
