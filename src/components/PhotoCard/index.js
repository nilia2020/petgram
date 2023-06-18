import { useNearScreen } from "../../hooks/useNearScreen";
import { ImgWrapper, Img, Button, Article } from "./styles";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1531523668299-e20047c89111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60";

export const PhotoCard = ({ id, likes = 0, src = DEFAULT_IMAGE }) => {
  const key = `like-${id}`;
  const [show, ref] = useNearScreen();
  const [liked, setLiked] = useLocalStorage(key, false);
  const Icon = liked ? MdFavorite : MdFavoriteBorder;

  return (
    <Article ref={ref}>
      {show && (
        <>
          <a href={`/detail/${id}`}>
            <ImgWrapper>
              <Img src={src} />
            </ImgWrapper>
          </a>
          <Button onClick={() => setLiked(!liked)}>
            <Icon size={32} color="red" />
            {likes} likes!
          </Button>
        </>
      )}
    </Article>
  );
};
