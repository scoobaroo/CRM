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
import firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

// const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(Thunk));

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  state = { loggedIn: null};

  componentWillMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false});
      }
    });
  }

  updateState (data) {
    this.setState(data);
  }

  static navigationOptions = {
    header: null
  }

  renderView() {
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