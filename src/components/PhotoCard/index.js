import { useEffect, useRef, useState } from "react";
import { ImgWrapper, Img, Button, Article } from "./styles";
import { MdFavoriteBorder, MdFavorite } from "react-icons/md";

const DEFAULT_IMAGE =
  "https://images.unsplash.com/photo-1531523668299-e20047c89111?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60";

export const PhotoCard = ({ id, likes = 0, src = DEFAULT_IMAGE }) => {
  const ref = useRef(null);
  const [show, setShow] = useState(false);
  const [liked, setliked] = useState(() => {
    try {
      const like = window.localStorage.getItem(id);
      return like;
    } catch (e) {
      console.error(e);
    }
  });

  useEffect(() => {
    Promise.resolve(
      typeof window.IntersectionObserver !== "undefined"
        ? window.IntersectionObserver
        : import("intersection-observer")
    ).then(() => {
      const observer = new window.IntersectionObserver((entries) => {
        const { isIntersecting } = entries[0];
        if (isIntersecting) {
          setShow(true);
          observer.disconnect();
        }
      });
      observer.observe(ref.current);
    });
  }, [ref]);
  const Icon = liked ? MdFavorite : MdFavoriteBorder;
  const setLocalStorage = (value) => {
    try {
      window.localStorage.setItem(id, value);
      setliked(value);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Article ref={ref}>
      {show && (
        <>
          <a href={`/detail/${id}`}>
            <ImgWrapper>
              <Img src={src} />
            </ImgWrapper>
          </a>
          <Button onClick={() => setLocalStorage(!liked)}>
            <Icon size={32} color="red" />
            {likes} likes!
          </Button>
        </>
      )}
    </Article>
  );
};
