import { ListOfCategories } from "./components/ListOfCategories";
import { GlobalStyle } from "../src/styles/globalStyles";
import { Logo } from "./components/Logo";
import { ListOfPhotoCards } from "./components/ListOfPhotoCards";
import { PhotoCardWithQuery } from "./container/PhotoCardWithQuery";
export const App = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const detailId = urlParams.get("detail");
  console.log(detailId);
  return (
    <>
      <GlobalStyle />
      <Logo />
      {detailId ? (
        <PhotoCardWithQuery id={detailId} />
      ) : (
        <>
          <ListOfCategories />
          <ListOfPhotoCards categoryId={"649882f954a50624d9398b3f"} />
        </>
      )}
    </>
  );
};
