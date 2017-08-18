import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, ListView, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { loadOrders } from '../actions';
import SalesOrderBox from './SalesOrderBox';
import { StackNavigator } from 'react-navigation';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import * as firebase from 'firebase';

var salesOrderRequest = require('../reducers/salesOrderRequest.json');
console.log(salesOrderRequest);
salesOrderRequest.map((order)=>{
  order.name = order.Name;
  order.issisalesmanager = order.am_SalesManager.Name;
  order.issisalesperson = order.am_ISSISalesPerson.Name;
  order.salesorderid = order.SalesOrderId;
  order.customer = order.CustomerId.Name;
  order.endcustomer = order.am_EndCustomer.Name;
  order.orderstatus = order.am_OrderStatus.Value;
  if(order.orderstatus==8){
    order.orderstatus = "In Review - Sales Person"
  } else if( order.orderstatus == 9) {
    order.orderstatus = "In Review - Sales Manager"
  } else if( order.orderstatus == 10) {
    order.orderstatus = "In Review - Marketing"
  } else if( order.orderstatus == 5) {
    order.orderstatus = "In Review - CSR"
  } else if( order.orderstatus == 1) {
    order.orderstatus = "Draft";
  } else if( order.orderstatus == 100000001) {
    order.orderstatus = "Submit for Approval"
  } else if( order.orderstatus == 100000002) {
    order.orderstatus = "Approved"
  } else if( order.orderstatus == 4) {
    order.orderstatus = "Denied"
  } else if( order.orderstatus == 7) {
    order.orderstatus = "Ready for AX"
  } else if( order.orderstatus == 11) {
    order.orderstatus = "Order Created in AX"
  } else if( order.orderstatus == 12) {
    order.orderstatus = "Canceled"
  } else if( order.orderstatus == 3) {
    order.orderstatus = "Invoiced"
  } else if( order.orderstatus == 2) {
    order.orderstatus = "Shipped"
  }
  return order
});

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
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    paddingBottom: 5
  },
  button : {
    width:80,
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row'
  },
  labelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  logoutButton : {
    width:80,
    height:60,
    justifyContent: 'center',
    alignItems: 'center',
    color: 'black',
    backgroundColor: 'white'
  },
});

const AllButton = MKButton.coloredButton()
  .withBackgroundColor(MKColor.Blue)
  .withText('ALL')
  .build();

const DraftButton = MKButton.coloredButton()
  .withText('DRAFT')
  .withBackgroundColor(MKColor.Red)
  .build();

const SalesPersonButton = MKButton.coloredButton()
  .withText('IN REVIEW-SALESPERSON')
  .withBackgroundColor(MKColor.Yellow)
  .build();

const SalesManagerButton = MKButton.coloredButton()
  .withText('IN REVIEW-SALESMANAGER')
  .withBackgroundColor(MKColor.Orange)
  .build();

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => true,
});

class SalesOrderList extends Component {
  constructor(props){
    super(props);
    this.state= {
      salesOrderRequest,
      loading:false
    }
    // store.dispatch({
    //   type: 'LOAD_ORDERS',
    //   salesorders: sampleSalesOrderRequest
    // })
  }
  logout(){
    console.log('logout clicked!!!!!!!!!!!!');
    navigate('App');
  }


    // componentWillMount() {
    //   this.props.loadInitialSalesOrders();
    // }
  filterByOrderStatus = (status) => {
    let newList = salesOrderRequest.filter(salesorder => {
        return salesorder.orderstatus == status;
    })
    this.dataSource = ds.cloneWithRows(newList);
  }

  componentDidMount(){
    //make XMLHTTPRequest()
  }

  static navigationOptions = ({navigation,screenProps}) => ({
    headerTitle: "Sales Orders",
    headerLeft: null,
    headerRight: <Button title="Logout" onPress = {() => 
                                          firebase.auth().signOut().then(function() {
                                            navigation.navigate('App')
                                            alert("Successfully Signed Out");
                                          }, function(error) {
                                            alert(error);
                                            console.log(error);
                                          })
                }/>
  })

  renderView() {
    this.dataSource = ds.cloneWithRows(salesOrderRequest);
    return (
        <ListView
          automaticallyAdjustContentInsets={false}
          contentContainerStyle={styles.contentContainer}
          enableEmptySections={true}
          dataSource={this.dataSource}
          renderRow={
            (rowData) =>
              <SalesOrderBox
                marginBottom = {5}
                navigation={this.props.navigation}
                salesorder={rowData} />
          }
      />
    );
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style = {styles.container} >
         {/* <View style = {styles.buttonContainer} >
          <AllButton style = {styles.button} />
          <SalesPersonButton  style = {styles.button} onPress = {this.filterByOrderStatus(8)}/>
          <SalesManagerButton style = {styles.button} onPress = {this.filterByOrderStatus(9)}/>
          <DraftButton style = {styles.button} onPress = {this.filterByOrderStatus(1)}/>
        </View>  */}
        {this.renderView()}
      </View>
    );
  }
}

// const mapStateToProps = state => {
//   return  {salesorers : state.sampleSalesOrderRequest};
// };

export default SalesOrderList;
