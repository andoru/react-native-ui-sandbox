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

class Listing extends Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }

  render() {
    return (
      <Navigator
          renderScene={this.renderScene.bind(this)}
          navigator={this.props.navigator}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }

  renderScene(route, navigator) {
    if (!this.state.dataSource) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie.bind(this)}
        style={styles.listView}
      />
    );
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading movies...
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <TouchableHighlight onPress={ () => this.gotoItem(movie) }>
        <View style={styles.container}>
          <Image
            source={{uri: movie.posters.thumbnail}}
            style={styles.thumbnail}
          />
          <View style={styles.rightContainer}>
            <Text style={styles.title} numberOfLines={1}>{movie.title}</Text>
            <Text style={styles.type} numberOfLines={1}>{movie.mpaa_rating}</Text>
            <Text style={styles.year}>{movie.year}</Text>
            <View style={styles.ratings}>
              <View style={styles.critic}>
                <Text>{movie.ratings.critics_rating}</Text>
              </View>
              <View style={styles.audience}>
                <Text>{movie.ratings.audience_rating}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  gotoItem(movie) {
    this.props.navigator.push({
      id: 'Item',
      name: 'ItemView',
      title: movie.title,
      item: movie,
    });
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
          Movies
        </Text>
      </TouchableOpacity>
    );
  }
};


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
  rightContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  listView: {
    paddingTop: 64,
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 21,
    marginBottom: 8,
    textAlign: 'left',
  },
  year: {
    textAlign: 'left',
  },
  thumbnail: {
    width: 60,
    height: 90,
    marginLeft: 8,
  },
  ratings: {
    flex: 1,
    flexDirection: 'row',
  },
  critic: {
    backgroundColor: 'red',
  },

  audience: {
    backgroundColor: 'green',
  },
});

module.exports = Listing;
