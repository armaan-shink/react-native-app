/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useRef } from 'react';
import {View, StyleSheet, SafeAreaView, Alert} from 'react-native';
import Home from './src/components/Home';
import LinearGradient from 'react-native-linear-gradient';
import LoginPage from './src/components/LoginPage';
import LoginPageTest from './src/components/LoginPageTest';
import Main from './src/components/Main';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// firebase analytics
import analytics, {firebase} from '@react-native-firebase/analytics';

/* import Amplify from 'aws-amplify';
import {withAuthenticator} from 'aws-amplify-react-native';
import config from './src/aws-exports';

Amplify.configure(config); */

import { Amplify, Notifications } from 'aws-amplify';
import awsExports from './src/aws-exports';
Amplify.configure(awsExports);

//firebase
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';

const App = () => {

  const routeNameRef = React.useRef();
  const navigationRef = React.useRef();

  const firebaseNotification = async () => {
    //AWS
    /* Notifications.Push.enable();
    const permissions = {
      alert: true,
      sound: true,
      badge: true
    };
    const result = await Notifications.Push.requestPermissions(permissions);
    console.log(result);
    const status = await Notifications.Push.getPermissionStatus();
    console.log(status); 

    const myTokenReceivedHandler = (token) => {
      // Do something with the received token
      console.log(token);
    };
    const listener = Notifications.Push.onTokenReceived(myTokenReceivedHandler);
    listener.remove();
    */

    //Firebase
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
    
    await messaging().registerDeviceForRemoteMessages();
    const token = await messaging().getToken();
    console.log(token);
  }

  const firebaseAnalytics = async () => {
    const appInstanceId = await analytics().getAppInstanceId();
    //await analytics().setAnalyticsCollectionEnabled(true);
    console.log("App Instance: ", appInstanceId);

    /* const firebaseConfig = {
      apiKey: 'AIzaSyA9BBpK_PhyZUDVvMtos3paXZcuNqtMqY4',
      projectId: 'shink-test-401412',
      appId: '1:521241665183:android:e9cd386c76cdb75ab5ccaa',
    };
    firebase.initializeApp(firebaseConfig); */
  }

  useEffect(() => {
    //getNotificationStatus();
    firebaseNotification();
    firebaseAnalytics();
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(`${remoteMessage.notification.title}`, `${remoteMessage.notification.body}`);    
    });

    return unsubscribe;
  }, [])

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={() => {
        routeNameRef.current = navigationRef.current.getCurrentRoute().name;
      }}
      onStateChange={async () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current.getCurrentRoute().name;

        if (previousRouteName !== currentRouteName) {
          await analytics().logScreenView({
            screen_name: currentRouteName,
            screen_class: currentRouteName,
          });
        }
        routeNameRef.current = currentRouteName;
      }}
    >
      <Stack.Navigator initialRouteName='Create'>
        <Stack.Screen name="Create" component={LoginPageTest} />
        <Stack.Screen name="Main" component={Main} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'white',
    color: 'black',
  },

  circle: {
    position: 'absolute',
    zIndex: -1,
    bottom: '-32%',
    width: 450,
    height: 400,
    borderRadius: 225,
  },
});

export default App;
