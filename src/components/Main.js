/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView, Text, Button, Image} from 'react-native';
//import {withAuthenticator} from 'aws-amplify-react-native';
//import CardsSwipe from 'react-native-cards-swipe';
import Swiper from 'react-native-deck-swiper';
import { Storage, API, graphqlOperation } from 'aws-amplify';
import awsExports from '../aws-exports';
import { Amplify, Notifications } from 'aws-amplify';
import LinearGradient from 'react-native-linear-gradient';

/* const cardsData = [
  { src: 'https://user-images-test-bucket115928-staging.s3.eu-north-1.amazonaws.com/public/19_11_36_11_9_2023__1000000034.jpg' },
  { src: 'https://user-images-test-bucket115928-staging.s3.eu-north-1.amazonaws.com/public/19_11_36_11_9_2023__1000000034.jpg' },
  { src: 'https://user-images-test-bucket115928-staging.s3.eu-north-1.amazonaws.com/public/19_11_36_11_9_2023__1000000034.jpg' },
  { src: 'https://user-images-test-bucket115928-staging.s3.eu-north-1.amazonaws.com/public/19_11_36_11_9_2023__1000000034.jpg' },
  { src: 'https://user-images-test-bucket115928-staging.s3.eu-north-1.amazonaws.com/public/19_11_36_11_9_2023__1000000034.jpg' },
]; */

/* const Card = ({card}) => {
  <View style={styles.card}>
    <BackgroundImage source={{uri: card.src}} style={styles.cardImg} />
  </View>
}; */

const Main = () => {

  const [awsData, setAwsData] = useState([]);

  const listTodos = `
    query list {
      listTodos {
        items {
          id firstname lastname gender age profileImage {
            bucket region key
          }
        }
      }
    }
  `

/* 'https://user-images-test-bucket115928-staging.s3.eu-north-1.amazonaws.com/public/19_11_36_11_9_2023__1000000034.jpg' */

/* https://user-images-test-bucket115928-staging.s3.eu-north-1.amazonaws.com/public/2_25_56_12_9_2023__1000000038.jpg */

  const awsFetchData = async () => {
    const userData = await API.graphql(graphqlOperation(listTodos));
    setAwsData(userData.data.listTodos.items);
  }

  useEffect(() => {
    awsFetchData();
  }, [])

  return (
    <SafeAreaView style={styles.pageContainer}> 
      <Swiper
        cards={awsData}
        renderCard={(card) => {
          const src = `https://${card ? card.profileImage.bucket : ''}.s3.${card ? card.profileImage.region : ''}.amazonaws.com/${card ? card.profileImage.key : ''}`
          console.log(src);
          return (
            <View style={styles.card}>
                <Image source={{uri: src}} style={styles.cardImg} />
                {/* <Text>Test</Text> */}
                <LinearGradient 
                  style={styles.userInfoContainer}
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.8)']}
                  start={{ x: 0.5, y: 0.0 }}
                  end={{ x: 0.5, y: 1 }}>
                  <Text style={styles.userName}>
                    {card ? card.firstname + ' ' + card.lastname : ''}
                  </Text>
                  <Text style={styles.userAge}>
                    {card ? card.age : ''}
                  </Text>
                </LinearGradient>
            </View>
          )
        }}
        cardStyle={{height: 600}}
        backgroundColor='rgba(0,0,0,0)'
        onSwiped={(cardIndex) => {console.log(cardIndex)}}
        onSwipedAll={() => {console.log('onSwipedAll')}}
        cardIndex={0}
        stackSize= {3}>
      </Swiper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    overflow: "hidden",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent"
  },
  cardImg: {
    flex: 1,
    width: '100%',
    height: 500,
  },

  userInfoContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
    paddingHorizontal: 20,
    height: 85,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  userName: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },

  userAge: {
    color: 'white',
    fontSize: 18,
  }
});

export default Main;