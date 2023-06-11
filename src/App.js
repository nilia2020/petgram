import React from "react";
import { ListOfCategories } from "./components/ListOfCategories";
import { GlobalStyle } from "../src/styles/globalStyles";
import { Logo } from "./components/Logo";
import { ListOfPhotoCards } from "./components/ListOfPhotoCards";
export const App = () => (
  <>
    <GlobalStyle />
    <Logo />
    <ListOfCategories />
    <ListOfPhotoCards />
  </>
);
