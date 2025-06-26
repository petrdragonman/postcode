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
    <main>
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <section>
          <input
            type="text"
            placeholder="username"
            {...register("username")}
            className="h-14 border border-orange-500 rounded-lg text-2xl p-2"
          />
          <small className="flex text-red-500 min-h-[1.25rem]">
            {errors.username?.message}
          </small>
        </section>
        <section>
          <input
            type="password"
            placeholder="password"
            {...register("password")}
            className="h-14 border border-orange-500 rounded-lg text-2xl p-2"
          />
          <small className="flex text-red-500 min-h-[1.25rem]">
            {errors.password?.message}
          </small>
        </section>
        <section className="flex gap-6 justify-center mt-4">
          <button
            className="rounded-lg shadow-md text-orange-400"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-lg shadow-md text-orange-600"
            type="submit"
          >
            Login
          </button>
        </section>
        <section>
          <p className="mt-6">
            Not a registered user yet?{" "}
            <a href="register" className="text-orange-800">
              Sign Up
            </a>{" "}
            to gain extra functionality.
          </p>
        </section>
      </form>
    </main>
  );
};

export default LoginForm;
