import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
  ScrollView,
  Image,
  Switch,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const mrfProducts = [
  {
    id: 1,
    title: 'Cricket Bat (MRF)',
    description: 'High-quality cricket bat for professional use.',
    price: '65000',
    image: require('./assets/cricketbat.png'),
  },
  {
    id: 2,
    title: 'Cricket Gloves (MRF)',
    description: 'Comfortable gloves offering superior grip.',
    price: '2000',
    image: require('./assets/gloves.png'),
  },
  {
    id: 3,
    title: 'Cricket Pads (MRF)',
    description: 'Protective pads for legs during cricket play.',
    price: '1200',
    image: require('./assets/pads.png'),
  },
  {
    id: 4,
    title: 'MRF T-Shirt',
    description: 'MRF branded T-shirt for cricket enthusiasts.',
    price: '5000',
    image: require('./assets/mrf_tshirt.png'),
  },
];

const nonMrfProducts = [
  {
    id: 5,
    title: 'Cricket Ball',
    description: 'Durable cricket ball for all weather conditions.',
    price: '5000',
    image: require('./assets/cricketball.png'),
  },
  {
    id: 6,
    title: 'Cricket Helmet',
    description: 'Safety helmet for head protection during cricket matches.',
    price: '2000',
    image: require('./assets/helmet2.png'),
  },
  {
    id: 7,
    title: 'Trousers',
    description: 'trousers for players.',
    price: '1500',
    image: require('./assets/one8_trousers.png'),
  },
  {
    id: 8,
    title: 'Cricket Shoes',
    description: 'Specialized shoes with spikes for better grip on field.',
    price: '18000',
    image: require('./assets/shoes.png'),
  },
];

const App = () => {
  const [page, setPage] = useState('GettingStarted');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [storedUsername, setStoredUsername] = useState('');
  const [storedPassword, setStoredPassword] = useState('');
  const [productsPageVisible, setProductsPageVisible] = useState(false);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [backgroundImageSource, setBackgroundImageSource] = useState(require('./assets/background.jpg'));
  const [backgroundSwitch, setBackgroundSwitch] = useState(false);

  const handleSignup = () => {
    setStoredUsername(username);
    setStoredPassword(password);
    setPage('Login');
  };

  const handleLogin = () => {
    if (username === storedUsername && password === storedPassword) {
      setPage('Welcome');
    } else {
      alert('Invalid username or password');
    }
  };

  const handleLogout = () => {
    setPage('GettingStarted');
    setUsername('');
    setPassword('');
    setProductsPageVisible(false);
  };

  const handleViewProducts = () => {
    setPage('Products');
    setProductsPageVisible(true);
  };

  const toggleBackgroundImage = () => {
    const newBackgroundImage = backgroundSwitch
      ? require('./assets/background.jpg')
      : require('./assets/new_background.jpg');
    setBackgroundImageSource(newBackgroundImage);
    setBackgroundSwitch(!backgroundSwitch);
  };

  const addToCart = (product) => {
    setCart([...cart, product]);
    alert('Added to Cart');
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const addToFavorites = (product) => {
    if (favorites.some((fav) => fav.id === product.id)) {
      const updatedFavorites = favorites.filter((fav) => fav.id !== product.id);
      setFavorites(updatedFavorites);
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const removeFromFavorites = (productId) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== productId);
    setFavorites(updatedFavorites);
  };

  const goBack = () => {
    // Implement navigation logic to go back
    // For simplicity, we'll use a basic logic here
    switch (page) {
      case 'Signup':
      case 'Login':
        setPage('GettingStarted');
        break;
      case 'Welcome':
      case 'MRFProducts':
      case 'NonMRFProducts':
      case 'Products':
      case 'MyFavorites':
      case 'MyAccount':
        setPage('Welcome');
        break;
      default:
        setPage('GettingStarted');
        break;
    }
  };

  const renderGettingStartedPage = () => (
    <BackgroundImage>
      <View style={styles.container}>
        <Text style={[styles.title, { color: '#ffffff' }]}>Getting Started</Text>
        <TouchableOpacity style={styles.button} onPress={() => setPage('Login')}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Toggle Background Image:</Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={backgroundSwitch ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleBackgroundImage}
            value={backgroundSwitch}
          />
        </View>
      </View>
      <BottomIcons />
    </BackgroundImage>
  );

  const renderSignupPage = () => (
    <BackgroundImage>
      <View style={styles.container}>
        <Text style={[styles.title, { color: '#ffffff' }]}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => setPage('Login')}>
            <Text style={[styles.signupText, styles.signupLink]}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomIcons />
    </BackgroundImage>
  );

  const renderLoginPage = () => (
    <BackgroundImage>
      <View style={styles.container}>
        <Text style={[styles.title, { color: '#ffffff' }]}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity onPress={() => setPage('Signup')}>
            <Text style={[styles.signupText, styles.signupLink]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <BottomIcons />
    </BackgroundImage>
  );

  const renderWelcomePage = () => (
    <BackgroundImage>
      <View style={styles.container}>
        <Text style={[styles.title, { color: '#ffffff' }]}>Welcome, {storedUsername}!</Text>
        <TouchableOpacity style={styles.button} onPress={() => setPage('MRFProducts')}>
          <Text style={styles.buttonText}>MRF Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setPage('NonMRFProducts')}>
          <Text style={styles.buttonText}>Non-MRF Products</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setPage('MyFavorites')}>
          <Text style={styles.buttonText}>My Favorites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <BottomIcons />
    </BackgroundImage>
  );

  const renderMRFProductsPage = () => (
    <BackgroundImage>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.productsList}>
          {mrfProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Text style={styles.buttonText}>Back to Welcome</Text>
        </TouchableOpacity>
      </View>
      <BottomIcons />
    </BackgroundImage>
  );

  const renderNonMRFProductsPage = () => (
    <BackgroundImage>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.productsList}>
          {nonMrfProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Text style={styles.buttonText}>Back to Welcome</Text>
        </TouchableOpacity>
      </View>
      <BottomIcons />
    </BackgroundImage>
  );

  const renderProductsPage = () => (
    <BackgroundImage>
      <View style={styles.productContainer}>
        <ScrollView contentContainerStyle={styles.productsList}>
          {mrfProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ScrollView>
        <ScrollView contentContainerStyle={styles.productsList}>
          {nonMrfProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <BottomIcons />
    </BackgroundImage>
  );

  const renderMyFavoritesPage = () => (
    <BackgroundImage>
      <View style={styles.container}>
        <Text style={[styles.title, { color: '#ffffff' }]}>My Favorites</Text>
        <ScrollView contentContainerStyle={styles.productsList}>
          {favorites.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Text style={styles.buttonText}>Back to Welcome</Text>
        </TouchableOpacity>
      </View>
      <BottomIcons />
    </BackgroundImage>
  );

  const renderMyCartPage = () => (
    <BackgroundImage>
      <View style={styles.container}>
        <Text style={[styles.title, { color: '#ffffff' }]}>My Cart</Text>
        <ScrollView contentContainerStyle={styles.productsList}>
          {cart.map((product) => (
            <ProductCard key={product.id} product={product} showRemoveButton />
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.button} onPress={goBack}>
          <Text style={styles.buttonText}>Back to Welcome</Text>
        </TouchableOpacity>
      </View>
      <BottomIcons />
    </BackgroundImage>
  );

const renderMyAccountPage = () => (
  <BackgroundImage>
    <View style={styles.container}>
      <Text style={[styles.title, { color: '#ffffff' }]}>My Account</Text>

      <ScrollView contentContainerStyle={styles.accountContainer}>
        {/* Container 1: Orders, Wish List, Coupons, Help Center */}
        <View style={styles.accountSection}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Orders</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Wish List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Coupons</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Help Center</Text>
          </TouchableOpacity>
        </View>

        {/* Container 2: My Activity */}
        <View style={styles.accountSection}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Reviews</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Question</Text>
          </TouchableOpacity>
        </View>

        {/* Container 3: Information */}
        <View style={styles.accountSection}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Terms and Policies</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>FAQs</Text>
          </TouchableOpacity>
        </View>

        {/* Container 4: Account Settings */}
        <View style={styles.accountSection}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Select Language</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.button} onPress={goBack}>
        <Text style={styles.buttonText}>Back to Welcome</Text>
      </TouchableOpacity>
    </View>
    <BottomIcons />
  </BackgroundImage>
);

  const ProductCard = ({ product, showRemoveButton }) => {
    const isFavorite = favorites.some((fav) => fav.id === product.id);

    return (
      <View style={styles.productCard}>
        <Image source={product.image} style={styles.productImage} resizeMode="contain" />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={() => (isFavorite ? removeFromFavorites(product.id) : addToFavorites(product))}
        >
          <FontAwesome
            name={isFavorite ? 'heart' : 'heart-o'}
            size={20}
            color={isFavorite ? 'red' : 'black'}
          />
        </TouchableOpacity>
        <Text style={styles.productTitle}>{product.title}</Text>
        <Text style={styles.productDescription}>{product.description}</Text>
        <Text style={styles.productPrice}>Rs. {product.price}</Text>
        <View style={styles.productButtons}>
          <TouchableOpacity style={styles.button} onPress={() => addToCart(product)}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          {showRemoveButton && (
            <TouchableOpacity
              style={[styles.button, { backgroundColor: 'red' }]}
              onPress={() => removeFromCart(product.id)}
            >
              <Text style={styles.buttonText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  const BottomIcons = () => (
    <View style={styles.bottomIcons}>
      <TouchableOpacity style={styles.iconButton} onPress={() => setPage('MyCart')}>
        <FontAwesome name="shopping-cart" size={24} color="black" />
        <Text style={styles.iconText}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => setPage('MyAccount')}>
        <FontAwesome name="user" size={24} color="black" />
        <Text style={styles.iconText}>Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={goBack}>
        <FontAwesome name="arrow-left" size={24} color="black" />
        <Text style={styles.iconText}>Back</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconButton} onPress={() => setPage('MyFavorites')}>
        <FontAwesome name="heart" size={24} color="red" />
        <Text style={styles.iconText}>Favorites</Text>
      </TouchableOpacity>
    </View>
  );

  const BackgroundImage = ({ children }) => (
    <ImageBackground source={backgroundImageSource} style={styles.backgroundImage}>
      {children}
    </ImageBackground>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#ffffff',
      marginBottom: 24,
    },
    input: {
      width: '70%',
      paddingVertical: 14,
      paddingHorizontal: 16,
      marginBottom: 16,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      fontSize: 16,
      backgroundColor: 'white',
    },
    button: {
      width: '50%',
      backgroundColor: '#ff9900',
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
      marginBottom: 12,
    },
    buttonText: {
      color: '#ffffff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    signupContainer: {
      flexDirection: 'row',
      marginTop: 10,
    },
    signupText: {
      fontSize: 14,
      color: '#ffffff',
    },
    signupLink: {
      marginLeft: 5,
      textDecorationLine: 'underline',
      color: '#007bff',
    },
    productContainer: {
      flex: 1,
      alignItems: 'center',
      paddingTop: 50,
      paddingBottom: 100,
      position: 'relative',
    },
    productsList: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
    },
    productCard: {
      width: Dimensions.get('window').width * 0.4,
      alignItems: 'center',
      backgroundColor: '#ffffff',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      marginBottom: 20,
      padding: 20,
      position: 'relative',
    },
    productImage: {
      width: '100%',
      height: 150,
      marginBottom: 10,
      borderRadius: 10,
    },
    productTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    productDescription: {
      fontSize: 14,
      marginBottom: 10,
      textAlign: 'center',
    },
    productPrice: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    productButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 10,
    },
    logoutButton: {
      position: 'absolute',
      bottom: 20,
      width: '50%',
      backgroundColor: '#ff9900',
      borderRadius: 8,
      paddingVertical: 16,
      alignItems: 'center',
    },
    switchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      position: 'absolute',
      bottom: 20,
    },
    switchLabel: {
      color: '#ffffff',
      marginRight: 10,
    },
    backgroundImage: {
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      width: '100%', 
      height: '100%', 
    },
    favoriteButton: {
      position: 'absolute',
      top: 10,
      right: 10,
    },
      accountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  accountSection: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    padding: 20,
    width: '100%',
  },

    bottomIcons: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      height: 50,
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
    },
    iconButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    iconText: {
      fontSize: 12,
      color: 'black',
      marginTop: 2,
    },
    contentText: {
      fontSize: 16,
      marginVertical: 5,
      color: '#ffffff',
    },
  });

  let productsPage;
  switch (page) {
    case 'Signup':
      productsPage = renderSignupPage();
      break;
    case 'Login':
      productsPage = renderLoginPage();
      break;
    case 'Welcome':
      productsPage = renderWelcomePage();
      break;
    case 'MRFProducts':
      productsPage = renderMRFProductsPage();
      break;
    case 'NonMRFProducts':
      productsPage = renderNonMRFProductsPage();
      break;
    case 'Products':
      productsPage = renderProductsPage();
      break;
    case 'MyFavorites':
      productsPage = renderMyFavoritesPage();
      break;
    case 'MyCart':
      productsPage = renderMyCartPage();
      break;
    case 'MyAccount':
      productsPage = renderMyAccountPage();
      break;
    default:
      productsPage = renderGettingStartedPage();
      break;
  }

  return <SafeAreaView style={{ flex: 1 }}>{productsPage}</SafeAreaView>;
};

export default App;