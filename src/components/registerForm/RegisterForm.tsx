import { schema, type RegisterFormData } from "./schema";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => unknown;
}

const RegisterForm = ({ onSubmit }: RegisterFormProps) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(schema),
  });

  const handleCancel = () => {
    navigate("/");
  };

  isSubmitSuccessful && reset();

  return (
    <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
      <section>
        <input
          type="text"
          placeholder="first name"
          {...register("firstName")}
          className="h-14 border border-orange-500 rounded-lg text-2xl p-2"
        />
        <small className="flex text-red-500 min-h-[1.25rem]">
          {errors.firstName?.message}
        </small>
      </section>
      <section>
        <input
          type="text"
          placeholder="last name"
          {...register("lastName")}
          className="h-14 border border-orange-500 rounded-lg text-2xl p-2"
        />
        <small className="flex text-red-500 min-h-[1.25rem]">
          {errors.lastName?.message}
        </small>
      </section>
      <section>
        <input
          type="text"
          placeholder="username"
          {...register("userName")}
          className="h-14 border border-orange-500 rounded-lg text-2xl p-2"
        />
        <small className="flex text-red-500 min-h-[1.25rem]">
          {errors.userName?.message}
        </small>
      </section>
      <section>
        <input
          type="text"
          placeholder="password"
          {...register("password")}
          className="h-14 border border-orange-500 rounded-lg text-2xl p-2"
        />
        <small className="flex text-red-500 min-h-[1.25rem]">
          {errors.password?.message}
        </small>
      </section>
      <section>
        <input
          type="text"
          placeholder="email"
          {...register("email")}
          className="h-14 border border-orange-500 rounded-lg text-2xl p-2"
        />
        <small className="flex text-red-500 min-h-[1.25rem]">
          {errors.email?.message}
        </small>
      </section>
      <section>
        <input
          type="text"
          placeholder="role"
          {...register("role")}
          className="h-14 border border-orange-500 rounded-lg text-2xl p-2"
        />
        <small className="flex text-red-500 min-h-[1.25rem]">
          {errors.role?.message}
        </small>
      </section>

      <section className="flex gap-6 justify-end mt-4">
        <button
          className="rounded-lg shadow-md text-orange-400"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button className="rounded-lg shadow-md text-orange-600" type="submit">
          Login
        </button>
      </section>
    </form>
  );
};

export default RegisterForm;
