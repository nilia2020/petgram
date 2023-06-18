import { gql, useQuery } from "@apollo/client";

const getSinglePhoto = gql`
  query getSinglePhoto($id: ID!) {
    photo(id: $id) {
      id
      categoryId
      src
      likes
      liked
      userId
    }
  }
`;

export const useGetSinglePhoto = (id) => {
  const { loading, error, data } = useQuery(getSinglePhoto, {
    variables: { id },
  });
  return { loading, error, data };
};
