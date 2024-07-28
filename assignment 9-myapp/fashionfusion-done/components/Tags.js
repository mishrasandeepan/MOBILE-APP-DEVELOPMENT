import React, { useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Tags = ({ onSelectTag }) => {
  const [selected, setSelected] = useState("Trending Now");

  const tags = [
    { title: "Trending Now", range: [3,6,16,17,18,20] },
    { title: "New", range: [2,3,4,10,15,16, 17,22, 23] },
    { title: "All", range: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26] },
    { title: "Mens", range: [14,15,16,17,18,19,20,21,22,23,24,25,26] }, // Changed to "Mens" and range adjusted
  ];

  const handleTagPress = (item) => {
    setSelected(item.title);
    onSelectTag(item.range);
  };

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={tags}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleTagPress(item)}>
            <Text
              style={[
                styles.tagText,
                item.title === selected ? styles.isSelected : null,
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default Tags;

const styles = StyleSheet.create({
  tagText: {
    fontSize: 16,
    fontFamily: "Poppins-Regular",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 10,
    backgroundColor: "#DFDCDC",
    color: "#938F8F",
    fontWeight: "700",
  },
  isSelected: {
    backgroundColor: "#E96E6E",
    color: "#FFFFFF",
  },
  container: {
    marginVertical: 10,
  },
});
