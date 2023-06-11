import { PhotoCard } from "../PhotoCard";

import React from "react";

export const ListOfPhotoCards = () => {
  return (
    <ul>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
        <PhotoCard key={id} />
      ))}
    </ul>
  );
};
