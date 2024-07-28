import React, { createContext, useState } from 'react';

export const FavoriteContext = createContext();

const FavoriteProvider = ({ children }) => {
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  const toggleFavorite = (product) => {
    if (product.isFavorite) {
      setFavoriteProducts(favoriteProducts.filter((p) => p.id !== product.id));
    } else {
      setFavoriteProducts([...favoriteProducts, { ...product, isFavorite: true }]);
    }
  };

  return (
    <FavoriteContext.Provider
      value={{
        favoriteProducts,
        toggleFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;

