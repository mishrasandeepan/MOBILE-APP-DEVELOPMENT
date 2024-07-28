import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { CartProvider, CartContext } from './context/CartContext';
import FavoriteProvider from './context/FavoriteContext';

// Import screens for the main app
import HomeScreen from './screen/HomeScreen';
import ProductDetailsScreen from './screen/ProductDetailsScreen';
import CartScreen from './screen/CartScreen';
import ReorderScreen from './screen/ReoderScreen';
import AccountScreen from './screen/AccountScreen';
import FavoriteScreen from './screen/FavoriteScreen';

// Updated GettingStartedScreen component
const GettingStartedScreen = ({ navigation }) => (
  <View style={styles.gettingStartedContainer}>
    <Text style={styles.gettingStartedHeader}>Welcome to FashionFusion App</Text>
    <Text style={styles.gettingStartedSubtitle}>E-SHOP welcomes you!</Text>
    <Button
      title="Get Started"
      onPress={() => navigation.navigate('Signup')}
      color="#735d78" // Customize button color
    />
  </View>
);

// Updated SignupScreen component
const SignupScreen = ({ navigation }) => {
  const [signupData, setSignupData] = useState({ username: '', password: '', email: '' });

  const handleSignup = () => {
    navigation.navigate('Login', { username: signupData.username, password: signupData.password });
  };

  return (
    <View style={styles.signupContainer}>
      <Text style={styles.signupHeader}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888" // Customize placeholder text color
        value={signupData.username}
        onChangeText={(text) => setSignupData({ ...signupData, username: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#888"
        value={signupData.password}
        onChangeText={(text) => setSignupData({ ...signupData, password: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={signupData.email}
        onChangeText={(text) => setSignupData({ ...signupData, email: text })}
      />
      <Button
        title="Sign Up"
        onPress={handleSignup}
        color="#E96E6E"
      />
    </View>
  );
};

// Updated LoginScreen component
const LoginScreen = ({ route, navigation }) => {
  const { username, password } = route.params || { username: '', password: '' };

  const handleLogin = () => {
    navigation.navigate('HomeStack', { userName: username });
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.loginHeader}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        value={username}
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        placeholderTextColor="#888"
        value={password}
        editable={false}
      />
      <Button
        title="Login"
        onPress={handleLogin}
        color="#E96E6E"
      />
    </View>
  );
};

// Create stack navigators
const AuthStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
    <MainStack.Screen name="HOME" component={HomeScreen} />
    <MainStack.Screen name="PRODUCT_DETAILS" component={ProductDetailsScreen} />
  </MainStack.Navigator>
);

const AppTabs = ({ route }) => {
  const { userName } = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="HOME_STACK"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={focused ? require('./assets/focused/home.png') : require('./assets/normal/home.png')}
              style={{ height: size, width: size, resizeMode: 'center' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MY_FAVORITES"
        component={FavoriteScreen} // Updated to show FavoriteScreen
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={focused ? require('./assets/focused/heart.png') : require('./assets/normal/heart.png')}
              style={{ height: size, width: size, resizeMode: 'center' }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CART"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, size }) => {
            const { cartItems } = useContext(CartContext);
            return (
              <View style={{ position: 'relative' }}>
                <Image
                  source={focused ? require('./assets/focused/shopping_cart.png') : require('./assets/normal/shopping_cart.png')}
                  style={{ height: size, width: size, resizeMode: 'center' }}
                />
                <View
                  style={{
                    position: 'absolute',
                    right: -3,
                    bottom: 22,
                    height: 14,
                    width: 14,
                    backgroundColor: focused ? '#E96E6E' : '#C0C0C0',
                    borderRadius: 7,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Text style={{ color: 'white', fontSize: 10 }}>{cartItems.length}</Text>
                </View>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="ACCOUNT"
        component={AccountScreen}
        initialParams={{ userName }} // Pass userName as initial param
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={focused ? require('./assets/focused/account.png') : require('./assets/normal/account.png')}
              style={{ height: size, width: size, resizeMode: 'center' }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => (
  <NavigationContainer>
    <CartProvider>
      <FavoriteProvider>
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
          <AuthStack.Screen name="GettingStarted" component={GettingStartedScreen} />
          <AuthStack.Screen name="Signup" component={SignupScreen} />
          <AuthStack.Screen name="Login" component={LoginScreen} />
          <AuthStack.Screen name="HomeStack" component={AppTabs} />
        </AuthStack.Navigator>
      </FavoriteProvider>
    </CartProvider>
  </NavigationContainer>
);

// Styles
const styles = StyleSheet.create({
  gettingStartedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#E96E6E', // Background color for Getting Started Screen
  },
  gettingStartedHeader: {
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 60,
  },
  gettingStartedSubtitle: {
    fontSize: 21,
    color: '#f7d1cd',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  signupContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f8edeb',
  },
  signupHeader: {
    fontSize: 28,
    color: '#E96E6E',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f2e9e4',
  },
  loginHeader: {
    fontSize: 28,
    color: '#E96E6E',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#E96E6E',
    marginBottom: 15,
    borderRadius: 10,
    backgroundColor: '#FFF',
  },
  favoriteScreenContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFF',
  },
  favoriteScreenHeader: {
    fontSize: 28,
    color: '#E96E6E',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  favoriteItemContainer: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E96E6E',
    marginBottom: 10,
  },
  favoriteItemName: {
    fontSize: 18,
    color: '#333',
  },
});

export default App;

