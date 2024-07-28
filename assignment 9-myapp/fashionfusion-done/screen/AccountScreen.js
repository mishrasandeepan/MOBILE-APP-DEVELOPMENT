import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const accountOptions = [
  { id: '1', title: 'Profile Settings', icon: 'person' },
  { id: '2', title: 'Order History', icon: 'history' },
  { id: '3', title: 'Wishlist', icon: 'favorite-border' },
  { id: '4', title: 'Payment Methods', icon: 'payment' },
  { id: '5', title: 'Help & Support', icon: 'help-outline' },
  { id: '6', title: 'Logout', icon: 'exit-to-app' },
];

const AccountScreen = ({ route, navigation }) => {
  const { userName } = route.params || { userName: 'John Doe' };

  const handleOptionPress = (optionTitle) => {
    if (optionTitle === 'Logout') {
      // Navigate to GettingStarted screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'GettingStarted' }],
      });
    } else {
      // Handle other options
      Alert.alert(`You clicked on ${optionTitle}`);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.optionContainer}
      onPress={() => handleOptionPress(item.title)}
    >
      <Icon name={item.icon} size={24} color="#333" />
      <Text style={styles.optionText}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          style={styles.profilePic}
          source={{ uri: 'https://via.placeholder.com/80' }} // Replace with actual profile picture URL
        />
        <Text style={styles.userName}>{userName}</Text>
      </View>
      <FlatList
        data={accountOptions}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.optionsList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 15,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profilePic: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#ddd',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  optionsList: {
    marginTop: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginVertical: 5,
    elevation: 2,
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default AccountScreen;

