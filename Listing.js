var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
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

    console.log(this.state.store)

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
      <TouchableHighlight onPress={ () => this.gotoItem(item) }>
        <View style={styles.container}>
          <Text> { item.title }</Text>
        </View>
      </TouchableHighlight>
    );
  }

  gotoItem(item) {
    // this.props.navigator.push({
    //   id: 'Item',
    //   name: 'ItemView',
    //   title: item.title,
    //   item: item,
    // });
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
});

module.exports = Listing;
