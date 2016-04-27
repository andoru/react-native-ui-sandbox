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

class Order extends Component {

  constructor(props) {
    super(props);
    this.state = {
        animated: true,
        modalVisible: false,
        transparent: true,
        items: props.items,
        total: '£XX.XX',
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
    };
    this.state.dataSource = this.state.dataSource.cloneWithRows(this.state.items);
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

          <TouchableOpacity onPress={ () => this.setModalVisible(true) }>
            <View style={styles.button}>
              <Text style={styles.button_text}>
                Set Pickup
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
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
              <Text style={styles.item_price}>{ this.state.total }</Text>
            </View>
          </View>

        </View>

    );
  }

  renderItem(item) {
    return (
      <View style={styles.item}>
        <Text style={styles.item_title}>{ item.title }</Text>
        <Text style={styles.item_price}>{ item.price }</Text>
      </View>
    );
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
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderColor: '#EEE'
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
  item: {
    padding: 16,
    flex: 1,
    alignItems: 'center',
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
