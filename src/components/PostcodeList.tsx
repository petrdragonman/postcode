import type { Postcode } from "../services/PostcodesService";
import PostcodeCard from "./postcodeCard/PostcodeCard";

interface PostcodeListProps {
  postcodes: Postcode[];
  onEdit: (postcode: Postcode) => void;
  onDelete: (id: number) => void;
}

const PostcodeList = ({ postcodes, onEdit, onDelete }: PostcodeListProps) => {
  if (postcodes.length === 0) {
    return (
      <div className="text-center py-8 text-xl text-gray-500">
        No postcodes found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {postcodes.map((postcode) => (
        <PostcodeCard
          key={postcode.id}
          postcode={postcode}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PostcodeList;

/////////////////////////////////////////

// import type { Postcode } from "../services/PostcodesService";
// import PostcodeCard from "./postcodeCard/PostcodeCard";

// interface PostcodeListProps {
//   postcodes: Postcode[];
//   onEdit: (postcode: Postcode) => void;
//   onDelete: (id: number) => void;
// }

// const PostcodeList = ({ postcodes }: PostcodeListProps) => {
//   if (postcodes === null || postcodes.length === 0) {
//     return null;
//   }

//   return (
//     <>
//       {postcodes.map((postcode) => (
//         <PostcodeCard
//           key={postcode.id}
//           postcode={postcode}
//           onEdit={onEdit}
//           onDelete={onDelete}
//         />
//       ))}
//     </>
//   );
// };

// export default PostcodeList;
