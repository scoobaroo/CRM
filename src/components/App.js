import React, { Component, PropTypes } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect, Provider } from 'react-redux';
import Login from './Login';
import Loader from './Loader';
import reducers from '../reducers/SalesOrderReducer';
import AppNavigator from '../../index.ios';
import { StackNavigator, NavigationActions } from 'react-navigation';
import SalesOrderList from './SalesOrderList';
import SalesOrderItem from './SalesOrderItem';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

// let initialNavState = AppNavigator.router.getStateForAction(
//   NavigationActions.init()
// );

// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));

// console.log(store.getState());

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  state = { loggedIn: null};
  
  updateState (data) {
    this.setState(data);
  }

  static navigationOptions = {
    header: null
  }

  renderView() {
    console.log("App.js Props:");
    console.log(this.props);
    console.log("App.js State:");
    console.log(this.state);
    switch (this.state.loggedIn) {
      case true:
        return <SalesOrderList navigation = {this.props.navigation} />
      case false:
        return <Login 
                  updateAppState = {this.updateState.bind(this)}
                  navigation = {this.props.navigation}
                />;
      default:
        return <Login 
                  updateAppState = {this.updateState.bind(this)}
                  navigation = {this.props.navigation}
                />;
    }
  }
  
  render() {
    return (
      <View style={styles.container}>
        {this.renderView()}
      </View>
    );
  }
}