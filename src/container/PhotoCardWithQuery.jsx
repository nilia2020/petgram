import { PhotoCard } from "../components/PhotoCard";
import { useGetSinglePhoto } from "../hooks/useGetSinglePhoto";

export const PhotoCardWithQuery = ({ id }) => {
    const { loading, error, data } = useGetSinglePhoto(id);

    if (loading) return null;
    if (error) return `Error! ${error.message}`;
    const { photo = {} } = data;

    return <PhotoCard key={photo.id} {...photo} />;
};
