import React, {Component} from 'react';
import { Button, Text, View, StyleSheet, Image, ListView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/EvilIcons';
import * as actions from '../actions';
import { MKTextField, MKColor, MKButton, getTheme } from 'react-native-material-kit';
import Loader from './Loader';
import SalesOrderDetail from './SalesOrderDetail';

var sampleSalesOrderDetail = require('../reducers/sampleSalesOrderDetails2.json');
sampleSalesOrderDetail.map((detail)=>{
  detail.product = detail.ProductId.Name;
  detail.devicespa = detail.new_DeviceSPA.Name;
  detail.quantity = detail.Quantity;
  detail.priceperunit = detail.PricePerUnit.Value;
  detail.amount = detail.BaseAmount_Base.Value;
  detail.salesorderid = detail.SalesOrderId.Id;
  detail.salesorderdetailid = detail.SalesOrderDetailId;
});

const ApprovalButton = MKButton.coloredButton()
  .withBackgroundColor(MKColor.Blue)
  .withText('APPROVE')
  .build();

const RejectButton = MKButton.coloredButton()
  .withText('REJECT')
  .withBackgroundColor(MKColor.Red)
  .build();


const theme = getTheme();

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
  }
});

class SalesOrderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salesorderdetail: sampleSalesOrderDetail
    };
  }

  approve(){
    console.log('approved!');
  }

  reject(){
    console.log('rejected!');
  }

  static navigationOptions = ({navigation,screenProps})=>({
    title: 'Sales Order Item',
    headerRight: <Button title="Logout" onPress = {() => navigation.navigate('App')}/>
  })

  componentDidMount(){
    //make XMLHTTPRequest for sample request details set matching sales order id of sales order item
  }

  renderDetails() {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => true,
    });
    this.dataSource = ds.cloneWithRows(sampleSalesOrderDetail);
    return (
        <ListView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.contentContainer}
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={
            (rowData) =>
              <SalesOrderDetail
                marginBottom = {5}
                navigation={this.props.navigation}
                salesorderdetail={rowData} />
          }
        />
      );
  } 
  render(){
    const { navigate } = this.props.navigation
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        // onPress={() => props.selectSalesOrder({this.props.navigation.state.params.salesorder.salesorderid})}
        >
        <Text style={styles.labelText}> Sales Order ID: </Text>
        <Text style={styles.baseText}>  {this.props.navigation.state.params.salesorder.salesorderid} </Text>
        <Text style={styles.labelText}> ISSI Sales Manager: </Text>
        <Text style={styles.baseText}> {this.props.navigation.state.params.salesorder.issisalesmanager} </Text>
        <Text style={styles.labelText}> ISSI Sales Person: </Text>
        <Text style={styles.baseText}> {this.props.navigation.state.params.salesorder.issisalesperson} </Text>
        <Text style={styles.labelText}> Bill-to Customer: </Text>
        <Text style={styles.baseText}> {this.props.navigation.state.params.salesorder.customer} </Text>
        <Text style={styles.labelText}> End Customer:  </Text>
        <Text style={styles.baseText}> {this.props.navigation.state.params.salesorder.endcustomer} </Text>
        <Text style={styles.labelText}> Order Status: </Text>
        <Text style={styles.baseText}> {this.props.navigation.state.params.salesorder.orderstatus} </Text>
        <View style={styles.buttonContainer}>
          <ApprovalButton style = {styles.button} onPress={this.approve.bind(this)} />
          <RejectButton style = {styles.button} onPress={this.reject.bind(this)} />
        </View>
        {this.renderDetails()}
      </ScrollView>
  );
  }
};

// export default connect(null, actions)(SalesOrderItem);
export default SalesOrderItem;
