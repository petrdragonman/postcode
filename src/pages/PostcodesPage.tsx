import { useQuery } from "@tanstack/react-query";
import { getAllPostcodes } from "../services/PostcodesService";
import PostcodeList from "../components/PostcodeList";
import SearchForm from "../components/searchForm/SearchForm";
import type { SearchFormData } from "../components/searchForm/schema";

const PostcodesPage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["postcodes"],
    queryFn: getAllPostcodes,
  });
  if (error) {
    alert("An error has accured while fetching data.");
  }

  const onSubmit = (query: SearchFormData) => {
    console.log(query);
  };

  return (
    <div>
      <header className="text-orange-600 text-3xl mb-10">POSTCODES</header>
      {/* <SearchBar onSubmit={onSubmit} /> */}
      <SearchForm onSubmit={onSubmit} />
      {!isPending && <PostcodeList postcodes={data.data} />}
    </div>
  );
};

export default PostcodesPage;
