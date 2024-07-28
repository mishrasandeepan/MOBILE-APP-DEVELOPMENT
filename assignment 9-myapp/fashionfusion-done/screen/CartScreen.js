import React, { useContext } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import Header from '../components/Header';
import CartCard from '../components/CartCard';
import { fonts } from '../utils/fonts';
import { CartContext } from '../context/CartContext';

const CartScreen = () => {
  const navigation = useNavigation(); // Initialize useNavigation hook
  const { cartItems, deleteCartItem, totalPrice } = useContext(CartContext);

  const handleDeleteItem = async (id) => {
    await deleteCartItem(id);
  };

  const handleCheckout = () => {
    navigation.navigate('GettingStarted'); // Navigate to GettingStarted screen
  };

  return (
    <LinearGradient colors={['#b392ac', '#f7d1cd']} style={styles.container}>
      <Header isCart={true} />
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <CartCard item={item} handleDelete={handleDeleteItem} />
        )}
        keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContentContainer}
        ListFooterComponent={
          <>
            <View style={styles.bottomContentContainer}>
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Total:</Text>
                <Text style={styles.priceText}>${totalPrice}</Text>
              </View>
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Shipping:</Text>
                <Text style={styles.priceText}>$0.0</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.flexRowContainer}>
                <Text style={styles.titleText}>Grand Total:</Text>
                <Text style={[styles.priceText, styles.grandPriceText]}>
                  ${totalPrice}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.button} onPress={handleCheckout}>
              <Text style={styles.buttonText}>Checkout</Text>
            </TouchableOpacity>
          </>
        }
      />
    </LinearGradient>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Allow the container to take full height
    padding: 15,
  },
  flexRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  bottomContentContainer: {
    marginHorizontal: 10,
    marginTop: 30,
  },
  titleText: {
    fontSize: 18,
    color: '#757575',
    fontWeight: '500',
  },
  priceText: {
    fontSize: 18,
    color: '#757575',
    fontWeight: '600',
  },
  divider: {
    borderWidth: 1,
    borderColor: '#C0C0C0',
    marginTop: 10,
    marginBottom: 5,
  },
  grandPriceText: {
    color: '#3C3C3C',
    fontWeight: '700',
  },
  button: {
    backgroundColor: '#E96E6E',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 30,
  },
  buttonText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: '700',
    fontFamily: fonts.regular,
  },
  flatListContentContainer: {
    flexGrow: 1, // Allow FlatList to expand and fill available space
    paddingBottom: 100, // Adjust based on footer height
  },
});
