import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  Modal,
  ListView,
  ScrollView,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

var StripeNative = require('react-native-stripe');

const STRIPE_KEY = "pk_test_4rGWcguGvrsYwtQAu8rWNvj4";
const MERCHANT_ID = "test";

const SOME_ITEMS = [
  {
    label: "Llama Kitty T-shirt",
    amount: 19.99,
  },
  {
    label: "Hello Kitty Humidifier",
    amount: 25.00,
  },
];

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
        animated: true,
        modalVisible: false,
        transparent: true,
        items: props.items,
        total: 0,
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
    };
    this.state.dataSource = this.state.dataSource.cloneWithRows(this.state.items);
  }

  componentDidMount() {
    StripeNative.init(STRIPE_KEY, MERCHANT_ID);
    this.getTotal();
  }

  getTotal() {
    total = 0;

    for (item of this.state.items) {
      total += item.amount
    }

    this.setState({ total: total });
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar
              style={{backgroundColor: '#246dd5'}}
              routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }

  renderScene(route, navigator) {
    return (

        <View style={styles.container}>

          <Modal
            animated={this.state.animated}
            transparent={this.state.transparent}
            visible={this.state.modalVisible}
            onRequestClose={() => {this.setModalVisible(false)}}
            >
            <View style={styles.modal}>
              <View style={styles.modal_wrap}>
                <View style={styles.modal_header}>
                  <Text>Modal Header</Text>
                </View>
                <ScrollView style={styles.modal_scroll}>
                  <View style={styles.modal_content}>
                    <Text>This modal was presented {this.state.animated ? 'with' : 'without'} animation.</Text>
                  </View>
                </ScrollView>
                <View style={styles.modal_footer}>
                  <Text>Modal Header</Text>
                </View>
              </View>
            </View>
          </Modal>

          <View style={styles.inner_container}>

            <TouchableOpacity onPress={ () => this.setModalVisible(true) }>
              <View style={styles.button}>
                <Text style={styles.button_text}>
                  Set Pickup
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={ () => this.setPaymentMethod() }>
              <View style={styles.button}>
                <Text style={styles.button_text}>
                  Add Payment
                </Text>
              </View>
            </TouchableOpacity>

            <View>
              <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderItem.bind(this)}
                style={styles.listView}
              />
              <View style={styles.item}>
                <Text style={styles.item_title}>Total</Text>
                <Text style={styles.item_price}>£{ this.state.total.toFixed(2) }</Text>
              </View>
            </View>

          </View>

          <View style={styles.footer_card}>
            <TouchableOpacity style={styles.footer_button} onPress={ () => this.placeOrder() }>
              <Text style={styles.footer_button_text}>
                Place Order
              </Text>
            </TouchableOpacity>
          </View>

        </View>

    );
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text style={styles.item_title}>{ item.label }</Text>
        <Text style={styles.item_price}>£{ item.amount.toFixed(2) }</Text>
      </View>
    );
  }

  setPaymentMethod() {
    console.log('set payment method');

    Promise.all([StripeNative.canMakePayments(), StripeNative.canMakePaymentsUsingNetworks()]).then(
      (canMakePayments) => {
        if (!canMakePayments[0])
          alert("Apple Pay is not enabled on this device");
        else if (!canMakePayments[1])
          alert("Apple Pay is enabled but no card is configured");
        else {
          var options = {
            fallbackOnCardForm: false,
            shippingAddressFields: StripeNative.iOSConstants.PKAddressFieldAll,
          };
          StripeNative.paymentRequestWithApplePay(this.state.items, "Ordoo", options).then( (obj) => {
            var token = obj[0],
              shippingInfo = obj[1],
              billingInfo = obj[2];

            // (Create charge here)

            (chargeWasSuccessful ? StripeNative.success : StripeNative.failure)();
          }, (err) => {
            // alert(err);
          })
        }
      });
  }

  placeOrder() {
    alert('Place Order!!!');
    // this.props.navigator.push({
    //   id: 'Order',
    //   name: 'OrderView',
    //   items: this.state.basket,
    // });
  }
}

var NavigationBarRouteMapper = ({

  LeftButton(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}
          onPress={() => navigator.parentNavigator.pop()}>
        <Text style={{color: 'white', margin: 10,}}>
          Back
        </Text>
      </TouchableOpacity>
    );
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          Order Summary
        </Text>
      </TouchableOpacity>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
  },
  inner_container: {
    flex: 1,
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
  item: {
    padding: 16,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',
  },
  item_title: {
    fontSize: 16,
  },
  item_price: {
    position: 'absolute',
    top: 16,
    right: 16,
    fontSize: 16,
    color: '#4A90E2',
  },
  button: {
    margin: 16,
    padding: 16,
    alignSelf: 'stretch',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
  },
  button_text: {
    color: 'white'
  },
  footer_card: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: '#4A90E2',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  footer_button: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
  },
  footer_button_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  modal: {
    paddingTop: 100,
    paddingBottom: 100,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modal_wrap: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  modal_header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: 'green',
  },
  modal_footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: 'green',
  },
  modal_scroll: {
    marginTop: 64,
    marginBottom: 64,
  },
  modal_content: {
    height: 700,
    backgroundColor: 'red'
  },
});

module.exports = Order;
