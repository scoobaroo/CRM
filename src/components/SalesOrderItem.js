import React, {Component} from 'react';
import { Modal, Button, Text, View, StyleSheet, Image, ListView, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { connect } from 'react-redux';
import * as actions from '../actions';
import { MKTextField, MKColor, MKButton, getTheme } from 'react-native-material-kit';
import Loader from './Loader';
import SalesOrderDetail from './SalesOrderDetail';
import * as firebase from 'firebase';

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
    marginTop: 10,
    alignItems: 'center',
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
  }
  state = {
    salesorder : this.props.navigation.state.params.salesorder,
    salesorderdetail: sampleSalesOrderDetail,
    rejectionreason: ""
  };

  updateOrderStatus(salesorder, status) {
    salesorder.orderstatus = status;
    var postData = {
      salesorder, salesorderdetails: sampleSalesOrderDetail
    };
    var updates = {};
    updates['/salesorders/' + salesorder.salesorderid ] = postData;
    return firebase.database().ref().update(updates);
  }

  approve(){
    const { salesorder } = this.props.navigation.state.params;
    this.updateOrderStatus(salesorder, "Approved")
    this.setState({orderstatus:"Approved"});
    console.log('approved!');
  }

  reject(){
    const { salesorder } = this.props.navigation.state.params;
    this.updateOrderStatus(salesorder, "Rejected")
    this.setState({orderstatus:"Rejected"});
    console.log('rejected!');
  }

  static navigationOptions = ({navigation,screenProps})=>({
    title: 'Sales Order Item',
    headerRight: <Button title="Logout" onPress={ () => 
                                          firebase.auth().signOut().then(function() {
                                            navigation.navigate('App')
                                            alert("Successfully Signed Out");
                                          }, function(error) {
                                            alert(error);
                                            console.log(error);
                                          }) 
                }/>
  })

  componentDidMount(){
    const { salesorder } = this.props.navigation.state.params;
    //make XMLHTTPRequest for sample request details set matching sales order id of sales order item
    function writeSalesOrderItemData(salesorder) {
      firebase.database().ref('salesorders/' + salesorder.salesorderid).set({
        salesorder, salesorderdetails: sampleSalesOrderDetail
      });
    }
    console.log('making database call');
    writeSalesOrderItemData(salesorder) 
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
  updateState(rejectionreason){
    this.setState(rejectionreason);
  }
  render(){
    const { navigate } = this.props.navigation;
    const { salesorder } = this.props.navigation.state.params;
    let rejectionreason = this.state.rejectionreason;
    let renderRejectionReason = () => {
        if(rejectionreason != "") {
            return (
              <View style = {{alignItems: 'center'}}>
                <Text style={styles.labelText}>Rejection Reason:</Text>
                <Text style={styles.baseText}>{rejectionreason}</Text>
              </View>
            )
        } 
    };
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        // onPress={() => props.selectSalesOrder({this.props.navigation.state.params.salesorder.salesorderid})}
        >
        <Text style={styles.labelText}> Sales Order Name: </Text>
        <Text style={styles.baseText}> {this.state.salesorder.name} </Text>
        <Text style={styles.labelText}> ISSI Sales Manager: </Text>
        <Text style={styles.baseText}> {this.state.salesorder.issisalesmanager} </Text>
        <Text style={styles.labelText}> ISSI Sales Person: </Text>
        <Text style={styles.baseText}> {this.state.salesorder.issisalesperson} </Text>
        <Text style={styles.labelText}> Bill-to Customer: </Text>
        <Text style={styles.baseText}> {this.state.salesorder.customer} </Text>
        <Text style={styles.labelText}> End Customer:  </Text>
        <Text style={styles.baseText}> {this.state.salesorder.endcustomer} </Text>
        <Text style={styles.labelText}> Order Status: </Text>
        <Text style={styles.baseText}> {this.state.salesorder.orderstatus} </Text>
        {renderRejectionReason()}
        <View style={styles.buttonContainer}>
          <ApprovalButton style = {styles.button} onPress={this.approve.bind(this)} />
          <RejectButton style = {styles.button} onPress={()=> navigate('Reject',
            {reject:this.reject.bind(this),updateParentState:this.updateState.bind(this)})} />
        </View>
        {this.renderDetails()}
      </ScrollView>
  );
  }
};

// export default connect(null, actions)(SalesOrderItem);
export default SalesOrderItem;
