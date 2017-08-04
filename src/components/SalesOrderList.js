import React, { Component } from 'react';
import { Button, Text, View, StyleSheet, ListView, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import Icon from 'react-native-vector-icons/EvilIcons';
import { loadOrders } from '../actions';
import SalesOrderBox from './SalesOrderBox';
import { StackNavigator } from 'react-navigation';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';

var sampleSalesOrderRequest = require('../reducers/sampleSalesOrderRequest.json');
console.log(sampleSalesOrderRequest);
sampleSalesOrderRequest.map((order)=>{
  order.issisalesmanager = order.am_SalesManager.Name;
  order.issisalesperson = order.am_ISSISalesPerson.Name;
  order.salesorderid = order.SalesOrderId;
  order.customer = order.CustomerId.Name;
  order.endcustomer = order.am_EndCustomer.Name;
  order.orderstatus = order.am_OrderStatus.Value;
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
      sampleSalesOrderRequest,
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
    let newList = sampleSalesOrderRequest.filter(salesorder => {
        return salesorder.orderstatus == status;
    })
    this.dataSource = ds.cloneWithRows(newList);
  }

  componentDidMount(){
    //make XMLHTTPRequest()
    console.log("SalesOrderList.js Props: ");
    console.log(this.props);
    console.log("SalesOrderList NavigationOptions: ");
    console.log(SalesOrderList.navigationOptions);
  }

  static navigationOptions = ({navigation,screenProps}) => ({
    headerTitle: "Sales Orders",
    headerLeft: null,
    headerRight: <Button title="Logout" onPress = {() => navigation.navigate('App')}/>
  })

  renderView() {
    this.dataSource = ds.cloneWithRows(sampleSalesOrderRequest);
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
