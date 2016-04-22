import React, {
  Component,
  StyleSheet,
  Text,
  Image,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

class Item extends Component {

  constructor(props) {
    super(props);
    this.state = {
        movie: props.item
    };
  }

  render() {
    console.log(this.state.movie)
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar
              style={{backgroundColor: '#246dd5'}}
              routeMapper={NavigationBarRouteMapper(this.state.movie.title)} />
          } />
    );
  }

  renderScene(route, navigator) {
    return (
      <View style={styles.container}>
        <Image
            source={{uri: this.state.movie.posters.profile}}
            style={styles.thumbnail}
          />
        <Text>
          {this.state.movie.runtime} mins
        </Text>
      </View>
    );
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
    marginTop: 64,
    flex: 1,
    flexDirection: 'row',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderColor: '#EEE'
  },
  image: {
    width: 60,
    height: 90,
  }
});

module.exports = Item;
