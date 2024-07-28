import React, { useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Header from "../components/Header";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import data from "../data.json";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';

const HomeScreen = () => {
  const [products, setProducts] = useState(data.products);
  const [favorites, setFavorites] = useState([]);
  const navigation = useNavigation();

  const handleProductDetails = (item) => {
    navigation.navigate("PRODUCT_DETAILS", { item });
  };

  const toggleFavorite = (item) => {
    const index = favorites.findIndex((prod) => prod.id === item.id);
    if (index !== -1) {
      // Remove from favorites
      const updatedFavorites = [...favorites];
      updatedFavorites.splice(index, 1);
      setFavorites(updatedFavorites);
    } else {
      // Add to favorites
      setFavorites([...favorites, item]);
    }

    // Update isFavorite in products list
    setProducts(
      products.map((prod) => {
        if (prod.id === item.id) {
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      })
    );
  };

  const navigateToFavorites = () => {
    navigation.navigate("FAVORITES", { favorites });
  };

  const handleTagSelection = (range) => {
    const filteredProducts = data.products.filter((item) => range.includes(item.id));
    setProducts(filteredProducts);
  };

  return (
    <LinearGradient colors={["#b392ac", "#f7d1cd"]} style={styles.container}>
      <Header>
        <TouchableOpacity onPress={navigateToFavorites}>
          <FontAwesome name="heart" size={24} color="#FF5733" />
        </TouchableOpacity>
      </Header>
      <View>
        <Text style={styles.headingText}>Match Your Style</Text>
        <View style={styles.inputContainer}>
          <Image
            source={require("../assets/search.png")}
            style={styles.searchIcon}
          />
          <TextInput placeholder="Search" style={styles.textInput} />
        </View>
      </View>
      <Tags onSelectTag={handleTagSelection} />
      <FlatList
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            handleProductClick={handleProductDetails}
            toggleFavorite={toggleFavorite}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headingText: {
    fontSize: 28,
    color: "#000000",
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
});

