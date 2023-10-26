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

const Home = () => {
  return (
    <View style={styles.homeContainer}>
      <Image source={require('../assets/logos/shink5.jpg')} />
      <View style={styles.headings}>
        <Text style={styles.loading}>Loading love algorithms...</Text>
        <Text style={styles.subHeading}>The safer, kinder, AI-ascendant dating app</Text>
      </View>
      <Pressable style={styles.notifyBtn}>
        <LinearGradient
          colors={['#A8F9AA', '#5DC8F7']}
          start={{ x: 0.0, y: 0.25 }}
          end={{ x: 0.4, y: 1.5 }}
          style={styles.btnGradient}
        >
          <Text style={styles.btnText}>Notify Me</Text>
          <Svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none">
            <Path
              d="M10 17L15 12L10 7"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        </LinearGradient>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    height: '60%',
    top: '10%',
  },

  headings: {
    alignItems: 'center',
    flex: 1,
    width: '70%'
  },

  loading: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5DC8F7'
  },

  subHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#A8F9AA',
    marginTop: 20,
    textAlign: 'center',
  },

  notifyBtn: {
    fontSize:  18,
    fontWeight: 'bold',
  },

  btnGradient: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  btnText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  }
});

export default Home;