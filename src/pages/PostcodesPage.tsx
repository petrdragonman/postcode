//////////////////////////////////////////////////////
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  getAllPostcodes,
  getPostcodeByCode,
  getPostcodeBySuburb,
} from "../services/PostcodesService";
import type { SearchFormData } from "../components/searchForm/schema";
import PostcodeList from "../components/PostcodeList";
import SearchForm from "../components/searchForm/SearchForm";
import LoadingPlcedolder from "../components/loading placeholder/LoadingPlcedolder";

const PostcodesPage = () => {
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

  const { data, isPending, error } = useQuery({
    queryKey: ["postcodes", searchQuery],
    queryFn: () => {
      if (searchQuery === null) return getAllPostcodes();
      return /^\d+$/.test(searchQuery)
        ? getPostcodeByCode(searchQuery)
        : getPostcodeBySuburb(searchQuery);
    },
  });

  const onSubmit = (query: SearchFormData) => {
    setSearchQuery(query.query.trim() || null);
  };

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (data) {
    console.log(data);
  }

  if (data == null) {
    console.log(data);
  }

  return (
    <div>
      <header className="text-orange-600 text-3xl mb-10">POSTCODES</header>
      <SearchForm onSubmit={onSubmit} />
      {isPending && <LoadingPlcedolder />}
      {!isPending && data.data == null && (
        <div className="text-2xl text-red-600 italic">{data.message}</div>
      )}
      {!isPending && data && <PostcodeList postcodes={data.data} />}
    </div>
  );
};

export default PostcodesPage;
/////////////////////////////////////////////////////////

// import { useQuery } from "@tanstack/react-query";
// import { useState } from "react";
// import {
//   getAllPostcodes,
//   getPostcodeByCode,
//   getPostcodeBySuburb,
// } from "../services/PostcodesService";
// import type { SearchFormData } from "../components/searchForm/schema";
// import PostcodeList from "../components/PostcodeList";
// import SearchForm from "../components/searchForm/SearchForm";

// const PostcodesPage = () => {
//   const [searchQuery, setSearchQuery] = useState<string | null>(null);

//   const { data, isPending, error } = useQuery({
//     queryKey: ["postcodes", searchQuery],
//     queryFn: () =>
//       //searchQuery ? getPostcodeBySuburb(searchQuery) : getAllPostcodes(),
//       // searchQuery ? getPostcodeByCode(searchQuery) : getAllPostcodes(),
//       searchQuery
//         ? getPostcodeByCode(searchQuery)
//         : getPostcodeBySuburb(searchQuery),
//   });

//   const onSubmit = (query: SearchFormData) => {
//     console.log(query.query);
//     setSearchQuery(query.query);
//   };

//   if (error) {
//     return <div>Error fetching data</div>;
//   }

//   return (
//     <div>
//       <header className="text-orange-600 text-3xl mb-10">POSTCODES</header>
//       <SearchForm onSubmit={onSubmit} />
//       {isPending && <div>Loading...</div>}
//       {!isPending && data && <PostcodeList postcodes={data.data} />}

//       {/* {!isPending &&
//         data &&
//         (searchQuery ? (
//           <PostcodeCard postcode={data.data} />
//         ) : (
//           <PostcodeList postcodes={data.data} />
//         ))} */}
//     </div>
//   );
// };

// export default PostcodesPage;

/**
 * const queryClient = useQueryClient();

const onSubmit = async (query: SearchFormData) => {
  const result = await queryClient.fetchQuery({
    queryKey: ["postcode", query.query],
    queryFn: () => getPostcodeBySuburb(query.query),
  });
  // Do something with result
};
 */

// import { useQuery } from "@tanstack/react-query";
// import {
//   getAllPostcodes,
//   getPostcodeBySuburb,
// } from "../services/PostcodesService";
// import PostcodeList from "../components/PostcodeList";
// import SearchForm from "../components/searchForm/SearchForm";
// import type { SearchFormData } from "../components/searchForm/schema";
// import PostcodeCard from "../components/postcodeCard/PostcodeCard";

// const PostcodesPage = () => {
//   const { data, isPending, error } = useQuery({
//     queryKey: ["postcodes"],
//     queryFn: getAllPostcodes,
//   });

//   if (error) {
//     alert("An error has accured while fetching data.");
//   }

//   const onSubmit = (query: SearchFormData) => {
//     console.log(query);
//     const { data, isPending, error } = useQuery({
//       queryKey: ["postcode", query.query],
//       queryFn: () => getPostcodeBySuburb(query.query),
//     });
//   };

//   return (
//     <div>
//       <header className="text-orange-600 text-3xl mb-10">POSTCODES</header>
//       <SearchForm onSubmit={onSubmit} />
//       {!isPending && <PostcodeList postcodes={data.data} />}
//       {!isPending && <PostcodeCard postcode={data} />}
//     </div>
//   );
// };

// export default PostcodesPage;
