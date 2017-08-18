import React, { Component } from 'react';
import { Text, Button, View, StyleSheet, Image, TouchableHighlight, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';
import { getTheme } from 'react-native-material-kit';
import * as actions from '../actions';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import Loader from './Loader';
import { StackNavigator } from 'react-navigation';

const theme = getTheme();

const styles = StyleSheet.create({
  baseText: {
    paddingLeft: 0,
    fontFamily: 'Arial',
    fontSize: 14,
  },
  titleText: {
    paddingTop: 20,
    fontSize: 32,
    alignItems: 'center',
    fontWeight: 'bold'
  },
  container: {
    flex: 1,
    flexWrap: 'wrap',
  },
  button: {
    backgroundColor: 'orangered',
    borderColor: 'orangered',
    borderWidth: 10,
    borderRadius: 10,
    padding: 3
  },
  buttonText: {
    fontSize : 14,
    fontWeight:'bold'
  },
  labelText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: 'darkred'
  }
});

class SalesOrderBox extends Component {
  static navigationOptions = ({navigation}) => ({
    SalesOrderItem: <SalesOrderItem
                      navigation={navigation} />,
  })

  constructor(props){
    super(props);
  }

  state = {};

  buttonStyle(){
    if(this.props.salesorder.orderstatus=='Draft'){
      return {
        backgroundColor: MKColor.Green,
        borderColor: MKColor.Green,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      }
    }
    else if(this.props.salesorder.orderstatus=='In Review - Sales Person'){
      return {
        backgroundColor: MKColor.Orange,
        borderColor: MKColor.Orange,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      };
    }
    else if(this.props.salesorder.orderstatus=='In Review - Sales Manager'){
      return {
        backgroundColor: MKColor.Yellow,
        borderColor: MKColor.Yellow,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      };
    }
    else if(this.props.salesorder.orderstatus=='In Review - Marketing'){
      return {
        backgroundColor: MKColor.Purple,
        borderColor: MKColor.Purple,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      };
    }
    else if(this.props.salesorder.orderstatus=='In Review - CSR'){
      return {
        backgroundColor: MKColor.DeepOrange,
        borderColor: MKColor.DeepOrange,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      };
    }
    else if(this.props.salesorder.orderstatus=='Ready for AX'){
      return {
        backgroundColor: MKColor.Blue,
        borderColor: MKColor.Blue,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      };
    }
    else if(this.props.salesorder.orderstatus=='Order Created in AX'){
      return {
        backgroundColor: MKColor.Teal,
        borderColor: MKColor.Teal,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      };
    }
    else if(this.props.salesorder.orderstatus=='Canceled'){
      return {
        backgroundColor: MKColor.Red,
        borderColor: MKColor.Red,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      };
    }
    else if(this.props.salesorder.orderstatus=='Invoiced'){
      return {
        backgroundColor: MKColor.Pink,
        borderColor: MKColor.Pink,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      };
    }
    else if(this.props.salesorder.orderstatus=='Shipped'){
      return {
        backgroundColor: MKColor.DeepPurple,
        borderColor: MKColor.DeepPurple,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      };
    }
    else if(this.props.salesorder.orderstatus=='Approved'){
      return {
        backgroundColor: MKColor.Cyan,
        borderColor: MKColor.Cyan,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      };
    }
    else if(this.props.salesorder.orderstatus=='Rejected'){
      return {
        backgroundColor: MKColor.Amber,
        borderColor: MKColor.Amber,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      };
    }
    else if(this.props.salesorder.orderstatus=='Submit for Approval'){
      return {
        backgroundColor: MKColor.Indigo,
        borderColor: MKColor.Indigo,
        borderWidth: 10,
        borderRadius: 10,
        padding: 3
      };
    }
  }

  render() {
    let salesorder = this.props.salesorder;
    const { navigate } = this.props.navigation;
    return (
      <TouchableHighlight
        onPress={() =>
          navigate('SalesOrderItem', { salesorder: salesorder })}
        underlayColor='black'
        activeOpacity={0.7}
        navigation = {this.props.navigation}>
        <View style = {this.buttonStyle()}>
          <Text style={styles.labelText}> Sales Order Name: </Text>
          <Text style={styles.buttonText}> {this.props.salesorder.name} </Text>
          <Text style={styles.labelText}> ISSI Sales Manager: </Text>
          <Text style={styles.buttonText}> {this.props.salesorder.issisalesmanager} </Text>
          <Text style={styles.labelText}> ISSI Sales Person: </Text>
          <Text style={styles.buttonText}> {this.props.salesorder.issisalesperson} </Text>
          <Text style={styles.labelText}> Bill-to Customer: </Text>
          <Text style={styles.buttonText}> {this.props.salesorder.customer} </Text>
          <Text style={styles.labelText}> End Customer:  </Text>
          <Text style={styles.buttonText}> {this.props.salesorder.endcustomer} </Text>
          <Text style={styles.labelText}> Order Status: </Text>
          <Text style={styles.buttonText}> {this.props.salesorder.orderstatus} </Text>
        </View>
      </TouchableHighlight>
    );
  }
};

// export default connect(null, actions)(SalesOrderBox);
export default SalesOrderBox;
