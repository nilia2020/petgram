const DEFAULT_IMAGE = "https://i.imgur.com/dJa0Hpl.jpg";
import { Anchor, Image } from "./styles";

export const Category = ({ cover = DEFAULT_IMAGE, path, emoji = "?" }) => (
  <Anchor href={path}>
    <Image src={cover} />
    {emoji}
  </Anchor>
);
