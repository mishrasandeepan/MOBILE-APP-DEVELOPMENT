import React, { useContext } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { FavoriteContext } from "../context/FavoriteContext";

const FavoriteScreen = () => {
  const { favoriteProducts } = useContext(FavoriteContext);

  return (
    <LinearGradient colors={['#FDF0F3', '#FFFBFC']} style={styles.container}>
      <Header title="Favorites" />
      <FlatList
        data={favoriteProducts}
        renderItem={({ item }) => <ProductCard item={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    paddingTop: 20,
  },
});

export default FavoriteScreen;

