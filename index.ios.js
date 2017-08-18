import React from 'react';  
import { AppRegistry } from 'react-native';
import App from './src/components/App';
import { StackNavigator } from 'react-navigation';
import SalesOrderList from './src/components/SalesOrderList';
import SalesOrderItem from './src/components/SalesOrderItem';
import Login from './src/components/Login';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyDV1Kz5PcULAwCBmGXfZcPhuIZ69Lm0WpU",
  authDomain: "issi-crm.firebaseapp.com",
  databaseURL: "https://issi-crm.firebaseio.com",
  projectId: "issi-crm",
  storageBucket: "issi-crm.appspot.com",
  messagingSenderId: "567548041578"
});


const routeConfiguration = {
  App: { screen: App },
  Login: { screen: Login },
  SalesOrderList : { screen: SalesOrderList },     
  SalesOrderItem : { screen: SalesOrderItem },
};

const stackNavigatorConfiguration = {
  initialRouteName: 'App',
  headerMode: 'screen'
}

export default AppNavigator = StackNavigator(routeConfiguration,stackNavigatorConfiguration)

AppRegistry.registerComponent('crm', () => AppNavigator);