import { useState, useEffect } from "react";
import { Category } from "../Category";
import { List, Item } from "./styles";

const useCategoriesData = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    window
      .fetch(
        "https://petgram-server-production.up.railway.app/api/categories/seeall"
      )
      .then((res) => res.json())
      .then((response) => {
        setCategories(response);
      });
    setLoading(false);
  }, []);
  return { categories, loading };
};

export const ListOfCategories = () => {
  const { categories, loading } = useCategoriesData();
  const [showFixed, setShowFixed] = useState(false);

  useEffect(() => {
    const onScroll = (e) => {
      const newShowFixed = window.scrollY > 200;
      showFixed !== newShowFixed && setShowFixed(newShowFixed);
    };
    document.addEventListener("scroll", onScroll);
    return () => document.removeEventListener("scroll", onScroll);
  }, [showFixed]);
  const renderList = (fixed) => (
    <List fixed={fixed}>
      {loading ? (
        <Item key="loading">
          <Category />
        </Item>
      ) : (
        categories.map((category) => (
          <Item key={category._id}>
            <Category {...category} />
          </Item>
        ))
      )}
    </List>
  );
  return (
    <>
      {loading && <p>Cargando...</p>}
      {renderList()}
      {showFixed && renderList(true)}
    </>
  );
};
