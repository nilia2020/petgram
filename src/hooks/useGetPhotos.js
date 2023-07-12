import { gql, useQuery } from "@apollo/client";

export function useGetPhotos() {
  const getPhotos = gql`
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
  const { loading, error, data } = useQuery(getPhotos);
  return { loading, error, data };
}
