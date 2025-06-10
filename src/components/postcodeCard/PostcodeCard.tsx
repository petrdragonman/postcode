import type { Postcode } from "../../services/PostcodesService";

interface PostcodeCardProps {
  postcode: Postcode;
}

const PostcodeCard = ({ postcode }: PostcodeCardProps) => {
  return (
    <>
      <div className="flex m-2 border border-orange-500 rounded">
        <article className="flex gap-4 m-2 text-2xl">
          <p className="">{postcode.postcode}</p>
          <p>{postcode.suburb}</p>
          <p>{postcode.stateCode}</p>
        </article>
      </div>
    </>
  );
};

export default PostcodeCard;
