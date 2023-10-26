/**
 * @format
 */


import 'react-native-get-random-values';
import 'react-native-url-polyfill/auto';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import { Amplify, Notifications } from 'aws-amplify';
/* import PushNotification from '@aws-amplify/pushnotification'; */
import awsExports from './src/aws-exports';

Amplify.configure(awsExports);
/* Notifications.Push.enable(); */

AppRegistry.registerComponent(appName, () => App);
