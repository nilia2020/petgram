import { PhotoCard } from "../PhotoCard";
import { useQuery, gql } from "@apollo/client";
import { getPhotos } from "../../hooks/useGetPhotos";

export const ListOfPhotoCards = ({ categoryId }) => {
  const { loading, error, data } = useQuery(getPhotos, {
    variables: { categoryId },
  });
  if (error) {
    return <h2>Internal Server Error</h2>;
  }
  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <ul>
      {data.photos.map((photo) => (
        <PhotoCard key={photo.id} {...photo} />
      ))}
    </ul>
  );
};
