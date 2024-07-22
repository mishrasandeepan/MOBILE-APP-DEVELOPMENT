import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const App = () => {
  const [page, setPage] = useState('GettingStarted');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [storedUsername, setStoredUsername] = useState('');
  const [storedPassword, setStoredPassword] = useState('');

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
  };

  const renderGettingStartedPage = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Getting Started</Text>
      <TouchableOpacity style={styles.button} onPress={() => setPage('Login')}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );

  const renderSignupPage = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
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
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoginPage = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
  );

  const renderWelcomePage = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {storedUsername}!</Text>
      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {page === 'GettingStarted' && renderGettingStartedPage()}
      {page === 'Signup' && renderSignupPage()}
      {page === 'Login' && renderLoginPage()}
      {page === 'Welcome' && renderWelcomePage()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF2D0', // Light background color
  },
  container: {
    width: '70%',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#ffffff', // White background
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333', // Dark text color
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ccc', // Light border color
    borderRadius: 8,
    fontSize: 16,
  },
  button: {
    width: '30%',
    backgroundColor: '#ff9900', // Orange button color
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  buttonText: {
    color: '#ffffff', // White button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  signupText: {
    fontSize: 14,
    color: '#666',
  },
  signupLink: {
    marginLeft: 5,
    textDecorationLine: 'underline',
    color: '#007bff',
  },
});

export default App;