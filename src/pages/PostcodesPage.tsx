import { useQuery } from "@tanstack/react-query";
import { getAllPostcodes } from "../services/PostcodesService";
import PostcodeList from "../components/PostcodeList";

const PostcodesPage = () => {
  const { data, isPending, error } = useQuery({
    queryKey: ["postcodes"],
    queryFn: getAllPostcodes,
  });
  if (error) {
    alert("An error has accured while fetching data.");
  }

  return (
    <div>
      <header className="text-orange-600 text-3xl mb-10">POSTCODES</header>
      {!isPending && <PostcodeList postcodes={data.data} />}
    </div>
  );
};

export default PostcodesPage;
