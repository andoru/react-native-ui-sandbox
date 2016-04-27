var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Button,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  LayoutAnimation,
} from 'react-native';

var ParallaxView = require('react-native-parallax-view');

class Listing extends Component {

  constructor(props) {
    super(props);
    this.state = {
        store: props.store,
        dataSource: new ListView.DataSource({
          rowHasChanged: (row1, row2) => row1 !== row2,
        }),
        basket: []
    };

    this.state.dataSource = this.state.dataSource.cloneWithRows(this.state.store.menu);

  }

  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
                routeMapper={NavigationBarRouteMapper(this.state.store.title)} />
          } />
    );
  }

  renderScene(route, navigator) {
    if (!this.state.dataSource) {
      return this.renderLoadingView();
    }

    return (
      <View style={styles.container}>

        <ParallaxView
          backgroundSource={{ uri: this.state.store.image }}
          windowHeight={300}
          header={(
            <Text style={styles.header}>
                Header Content
            </Text>
          )}
          scrollableViewStyle={{ backgroundColor: 'red' }}
        >
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this.renderItem.bind(this)}
            style={styles.listView}
          />
        </ParallaxView>

        <View style={[styles.card, this.state.basket.length && styles.card_active]}>
          <TouchableOpacity style={styles.button} onPress={ () => this.goToOrder() }>
            <Text style={styles.button_text}>
              View Order
            </Text>
            <View style={styles.button_count}>
              <Text style={styles.button_count_text}>
                { this.state.basket.length }
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading items...
        </Text>
      </View>
    );
  }

  renderItem(item) {
    return (
      <TouchableHighlight onPress={ () => this.addToOrder(item) }>
        <View style={styles.item}>
          <Text style={styles.item_title}>{ item.label }</Text>
          <Text style={styles.item_price}>£{ item.amount.toFixed(2) }</Text>
        </View>
      </TouchableHighlight>
    );
  }

  addToOrder(item) {
    order = this.state.basket;
    order.push(item);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({
      basket: order,
    });
  }

  goToOrder() {
    this.props.navigator.push({
      id: 'Order',
      name: 'OrderView',
      items: this.state.basket,
    });
  }

}


var NavigationBarRouteMapper = title => ({
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
          { title }
        </Text>
      </TouchableOpacity>
    );
  }
});


var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FCFF',
  },
  listView: {
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 21,
    marginBottom: 8,
    textAlign: 'left',
  },
  card: {
    position: 'absolute',
    bottom: -64,
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
  card_active: {
    bottom: 0,
  },
  button: {
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
  button_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  button_count: {
    position: 'absolute',
    top: 18,
    bottom: 0,
    right: 16,
  },
  button_count_text: {
    padding: 4,
    width: 32,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#326299',
    borderRadius: 3,
    overflow: 'hidden',
  },
  item: {
    padding: 16,
    flex: 1,
    flexDirection: 'row',
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
});

module.exports = Listing;
