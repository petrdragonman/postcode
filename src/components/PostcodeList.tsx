import type { Postcode } from "../services/PostcodesService";
import PostcodeCard from "./postcodeCard/PostcodeCard";

interface PostcodeListProps {
  postcodes: Postcode[];
}

const PostcodeList = ({ postcodes }: PostcodeListProps) => {
  if (postcodes.length === 0) {
    return null;
  }

  return (
    <>
      {postcodes.map((postcode) => (
        <PostcodeCard key={postcode.id} postcode={postcode} />
      ))}
    </>
  );
};

export default PostcodeList;
