import { PhotoCard } from "../PhotoCard";
import { gql, useQuery } from "@apollo/client";

const GET_PHOTOS = gql`
  query getPhotos {
    photos {
      _id
      userId
      categoryId
      likes
      src
    }
  }
`;

export const ListOfPhotoCards = ({ categoryId }) => {
  const { loading, error, data } = useQuery(GET_PHOTOS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <ul>
      {data.photos.map((photo) =>
        photo.categoryId === categoryId ? (
          <PhotoCard key={photo._id} id={photo._id} {...photo} />
        ) : (
          <PhotoCard key={photo._id} id={photo._id} {...photo} />
        )
      )}
    </ul>
  );
};
