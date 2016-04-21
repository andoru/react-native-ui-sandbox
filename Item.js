import React, {
  Component,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

class Item extends Component {

  constructor(props) {
      super(props);
      this.state = {
          hat: this.props.hat
      };
  }

  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }

  renderScene(route, navigator) {
    return (
      <View style={styles.container}>
        <Text>
          List item. {this.state.hat}
        </Text>
      </View>
    );
  }
}

var NavigationBarRouteMapper = {
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
          A Movie
        </Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    marginTop: 64,
    flex: 1,
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderColor: '#EEE'
  },
});

module.exports = Item;
