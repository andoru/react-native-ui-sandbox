
import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Navigator
} from 'react-native';

var Splash = require('./Splash');
var Listing = require('./Listing');
var Item = require('./Item');

class App  extends Component {

  render() {
    return (
      <Navigator
          initialRoute={{id: 'Splash', name: 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            return Navigator.SceneConfigs.PushFromRight;
          }} />
    );
  }

  renderScene(route, navigator) {
    var routeId = route.id;
    if (routeId === 'Splash') {
      return (
        <Splash
          navigator={navigator} />
      );
    }
    if (routeId === 'Listing') {
      return (
        <Listing
          navigator={navigator} />
      );
    }
    if (routeId === 'Item') {
      return (
        <Item
          navigator={navigator} />
      );
    }
    return this.noRoute(navigator);
  }

  noRoute(navigator) {
    return (
      <View style={styles.container}>
        <Text>
          No Route
        </Text>
      </View>
    );
  }

}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderColor: '#EEE'
  },
});

AppRegistry.registerComponent('UISandbox', () => App);
