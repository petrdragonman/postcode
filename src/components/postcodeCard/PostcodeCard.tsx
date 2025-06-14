import type { Postcode } from "../../services/PostcodesService";

interface PostcodeCardProps {
  postcode: Postcode;
  onEdit: (postcode: Postcode) => void;
  onDelete: (id: number) => void;
}

const PostcodeCard = ({ postcode, onEdit, onDelete }: PostcodeCardProps) => {
  const onDeleteClick = () => {
    onDelete(postcode.id);
  };
  const onEditHandle = () => {
    onEdit(postcode);
  };

  return (
    <>
      <div className="flex justify-between border border-orange-500 rounded-lg">
        {/* <article className="flex gap-4 m-2 text-2xl"> */}
        <section className="flex gap-4 text-2xl m-2">
          <p className="">{postcode.postcode}</p>
          <p>{postcode.suburb}</p>
          <p>{postcode.stateCode}</p>
        </section>
        <section className="flex gap-6 text-2xl m-2">
          <img
            src="pencil.svg"
            alt="edit pencil icon"
            className="w-6"
            onClick={onEditHandle}
          />
          <img
            src="bin.svg"
            alt="bin icon"
            className="w-6"
            onClick={onDeleteClick}
          />
        </section>
        {/* </article> */}
      </div>
    </>
  );
};

export default PostcodeCard;
