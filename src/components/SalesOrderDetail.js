/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { connect } from 'react-redux';
import { getTheme } from 'react-native-material-kit';
import EvilIcon from 'react-native-vector-icons/EvilIcons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import SimpleIcon from 'react-native-vector-icons/SimpleLineIcons';
import { MKTextField, MKColor, MKButton} from 'react-native-material-kit';
import * as actions from '../actions';

const styles = StyleSheet.create({
  container:{
    alignItems: 'center',
    marginTop: 20
  },
  baseText: {
    fontSize : 16,
    fontWeight:'bold'
  },
  labelText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'darkred'
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  button:{
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    height: 35,
    width: 125
  },
  title:{
    fontSize: 24,
    fontWeight: 'bold'
  }
});
class SalesOrderDetail extends Component {
  constructor(props){
    super(props);
  }
  renderInitialView(){

  }
  render() {
    return (
      <View style = {styles.container}>
        <Text style = {styles.title}> Sales Order Detail </Text>
        <Text style= {styles.labelText}> Sales Order Detail ID </Text>
        <Text style = {styles.baseText}> {this.props.salesorderdetail.salesorderdetailid} </Text>
        <Text style= {styles.labelText}> Parent Sales Order ID </Text>
        <Text style = {styles.baseText}> {this.props.salesorderdetail.salesorderid} </Text>
        <Text style= {styles.labelText}> Sales Product </Text>
        <Text style = {styles.baseText}> {this.props.salesorderdetail.product} </Text>
        <Text style= {styles.labelText}> Sales Device SPA </Text>
        <Text style = {styles.baseText}> {this.props.salesorderdetail.devicespa} </Text>
        <Text style= {styles.labelText}> Quantity </Text>
        <Text style = {styles.baseText}> {this.props.salesorderdetail.quantity} </Text>
        <Text style= {styles.labelText}> Price per Unit </Text>
        <Text style = {styles.baseText}> {this.props.salesorderdetail.priceperunit} </Text>
        <Text style= {styles.labelText}> Amount </Text>
        <Text style = {styles.baseText}> {this.props.salesorderdetail.amount} </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {
      salesorderdetails: state.salesorderdetails,
   };
};

// export default connect(mapStateToProps, actions)(SalesOrderDetails);
export default SalesOrderDetail;
