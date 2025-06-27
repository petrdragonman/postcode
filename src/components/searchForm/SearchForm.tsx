import { useNavigate } from "react-router";
import { schema, type SearchFormData } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
      className="flex items-center w-full gap-x-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col flex-1">
        <input
          type="text"
          placeholder="postcode or suburb"
          {...register("query")}
          className="h-12 px-3 border border-orange-600 rounded-lg bg-white"
        />
        <small className="flex text-red-500 min-h-[1.25rem]">
          {errors?.query?.message}
        </small>
      </div>
      <div>
        <button type="submit" className="rounded-lg shadow-md text-orange-600 ">
          Search
        </button>
        <small className="flex min-h-[1.25rem]"></small>
      </div>
    </form>
  );
};

export default SearchForm;
