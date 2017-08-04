import React from 'react';  
import { AppRegistry } from 'react-native';
import App from './src/components/App';
import { StackNavigator } from 'react-navigation';
import SalesOrderList from './src/components/SalesOrderList';
import SalesOrderItem from './src/components/SalesOrderItem';
import Login from './src/components/Login';

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