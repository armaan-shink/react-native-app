/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Path } from 'react-native-svg';

const LoginPage = () => {
  return (
    <View style={styles.loginPageContainer}>
      <Image source={require('../assets/logos/shink5.jpg')} style={styles.logo} />
      <Text style={styles.tagline}>The Safer, Kinder, AI-Ascendant Dating App</Text>
      <Pressable style={styles.fullLengthBtn}>
        <Text style={styles.btnText}>Continue with Phone Number</Text>
        <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path
            d="M10 17L15 12L10 7"
            stroke="white"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </Pressable>
      <Text style={styles.orText}>
        ----------------   or   ----------------
      </Text>
      <View style={styles.iconsContainer}>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/icons/googleIcon.png')} style={styles.iconImage} />
        </View>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/icons/facebookIcon.png')} style={styles.iconImage} />
        </View>
        <View style={styles.iconContainer}>
          <Image source={require('../assets/icons/appleIcon.png')} style={styles.iconImage} />
        </View>
      </View>
      <Text style={styles.tnc}>By choosing "Sign In" or "Create Account" you agree to our Terms of Service. Learn about how we handle your data in our Privacy Policy and Cookies Policy.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loginPageContainer: {
    position: 'relative',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
    height: '100%',
    width: '100%',
    
  },

  logo: {
    marginTop: 30
  },

  tagline: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#A8F9AA',
    textAlign: 'center',
    paddingHorizontal: 50,
  },

  tnc: {
    position: 'absolute',
    bottom: 0,
    zIndex: 1,
    fontSize: 12,
    color: 'white',
    paddingHorizontal: 20,
    marginBottom: 8,
    lineHeight: 15,
  },

  fullLengthBtn: {
    width: '80%',
    borderRadius: 10,
    backgroundColor: '#5DC8F7',
    padding: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },

  btnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  orText: {
    fontSize: 15,
    color: 'grey',
    marginTop: 20,
  },

  iconsContainer: {
    width: '70%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    overflow: 'hidden',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },

  iconImage: {
    width: 30,
    height: 30,
  }
});

export default LoginPage;