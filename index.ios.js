var MOCKED_MOVIES_DATA = [
  {title: 'Title', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
];

var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {
  AppRegistry,
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View
} from 'react-native';

class UISandbox extends Component {

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
    if (!this.state.dataSource) {
      return this.renderLoadingView();
    }

    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderMovie}
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
  rightContainer: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20
  },
  listView: {
    paddingTop: 20,
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
    width: 80,
    height: 120,
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

AppRegistry.registerComponent('UISandbox', () => UISandbox);
