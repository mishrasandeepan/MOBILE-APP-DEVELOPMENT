import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, ActivityIndicator, FlatList, Image } from 'react-native';

const ProductCard = ({ products, username, loading, handleLogout }) => (
  <ScrollView contentContainerStyle={styles.scrollViewContent}>
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome, {username}!</Text>
        <Text style={styles.title}>MRF Cricket Products</Text>
        {loading ? (
          <ActivityIndicator size="large" color
          = "#0000ff" />
        ) : (
          <FlatList
            data={products}
            keyExtractor={(item) => item.id.toString()} // Ensure key is a string
            numColumns={2} // Displaying 2 columns for better layout
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            )}
            contentContainerStyle={styles.flatListContent}
          />
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.smallButton} onPress={handleLogout}>
            <Text style={styles.buttonText}>Log Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  </ScrollView>
);

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: '90%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // semi-transparent background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#4CAF50',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: '45%', // Adjusted width for better spacing
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardDescription: {
    marginVertical: 10,
    textAlign: 'center',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  flatListContent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  smallButton: {
    width: '80%',
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductCard;