import { useNavigate } from "react-router";
import { schema, type LoginFormData } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => unknown;
}

const LoginForm = ({ onSubmit }: LoginFormProps) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(schema),
  });

  const handleCancel = () => {
    navigate("/");
  };

  isSubmitSuccessful && reset();

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <input type="text" placeholder="username" {...register("userName")} />
        <small className="flex text-red-500 min-h-[1.25rem]">
          {errors.userName?.message}
        </small>
      </section>
      <section>
        <input type="text" placeholder="password" {...register("password")} />
        <small className="flex text-red-500 min-h-[1.25rem]">
          {errors.password?.message}
        </small>
      </section>
      <button className="rounded-lg shadow-md text-orange-600" type="submit">
        Login
      </button>
      <button
        className="rounded-lg shadow-md text-orange-600"
        onClick={handleCancel}
      >
        Cancel
      </button>
    </form>
  );
};

export default LoginForm;
