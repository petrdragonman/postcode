import { useNavigate } from "react-router";
import { schema, type SearchFormData } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "../button/Button";

interface SearchFormProps {
  onSubmit: (data: SearchFormData) => unknown;
}

const SearchForm = ({ onSubmit }: SearchFormProps) => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitSuccessful, errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(schema),
  });

  isSubmitSuccessful && reset();

  return (
    <form
      className="flex items-center w-full gap-x-4 m-2 p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col flex-1">
        <input
          type="text"
          placeholder="type here your query"
          {...register("query")}
          className="h-10 px-3 border border-orange-600 rounded-lg bg-white"
        />
        <small className="flex text-red-500 min-h-[1.25rem]">
          {errors?.query?.message}
        </small>
      </div>
      <div>
        <button
          type="submit"
          className="flex align-top h-12 px-4 bg-blue-300 border border-blue-600 rounded-lg text-orange-600 "
        >
          Search
        </button>
        <small className="flex text-red-500 min-h-[1.25rem]">
          {/* {errors?.query?.message} */}
        </small>
      </div>
    </form>
  );
};

export default SearchForm;
