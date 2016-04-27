import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions,
  LayoutAnimation,
} from 'react-native';

var MapView = require('react-native-maps');

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 51.449;
const LONGITUDE = -2.6;
const LATITUDE_DELTA = 0.02;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Discover extends Component {

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: stores,
      selected: {}
    };

    this.onRegionChange = this.onRegionChange.bind(this);
  }

  onRegionChange(region) {
    this.setState({
      region: region
    });
  }

  centerOnMarker(marker) {
    this.refs.discovery.refs.map.animateToRegion({
      latitude: marker.latlng.latitude,
      longitude: marker.latlng.longitude,
      latitudeDelta: this.state.region.latitudeDelta,
      longitudeDelta: this.state.region.longitudeDelta,
    });
  }

  render() {
    return (
      <Navigator
          ref="discovery"
          renderScene={this.renderScene.bind(this)}
          navigationBar={
            <Navigator.NavigationBar style={{backgroundColor: '#246dd5', alignItems: 'center'}}
                routeMapper={NavigationBarRouteMapper} />
          } />
    );
  }

  renderScene(route, navigator) {
    return this.renderMap();
  }

  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          Loading...
        </Text>
      </View>
    );
  }

  renderMap() {
    console.log(this.state);
    return (
      <View style={styles.container}>
        <MapView
          ref='map'
          style={styles.map}
          region={this.state.region}
          onRegionChange={ this.onRegionChange }
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.latlng}
              onSelect={ () => this.markerSelected(marker) }
              image={this.getIconForType(marker.type)}
            />
          ))}
        </MapView>
        <View style={[styles.card, this.state.selected.title && styles.card_active]}>
          <Text style={styles.title}>{this.state.selected.title}</Text>
          <Text style={styles.description}>{this.state.selected.description}</Text>
          <TouchableOpacity style={styles.button} onPress={ () => this.goToSelected() }>
            <Text style={styles.button_text}>
              View Menu
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  markerSelected(marker) {
    console.log(marker);
    this.centerOnMarker(marker);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    this.setState({
      selected: marker
    });
  }

  getIconForType(type) {
    switch(type) {
      case 'coffee':
        return require('./assets/icons/icon-coffee.png');
      case 'beer':
        return require('./assets/icons/icon-beer.png');
      default:
        return require('./assets/icons/icon-meal.png');
    }
  }

  goToSelected() {
    this.props.navigator.push({
      id: 'Listing',
      name: 'ListView',
      store: this.state.selected,
    })
  }

}


var NavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    return null;
  },
  RightButton(route, navigator, index, navState) {
    return null;
  },
  Title(route, navigator, index, navState) {
    return (
      <TouchableOpacity style={{flex: 1, justifyContent: 'center'}}>
        <Text style={{color: 'white', margin: 10, fontSize: 16}}>
          Map
        </Text>
      </TouchableOpacity>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    marginTop: 64,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: '#F5FCFF',
    borderBottomWidth: 1,
    borderColor: '#EEE'
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  card: {
    position: 'absolute',
    bottom: -156,
    left: 0,
    right: 0,
    height: 156,
    backgroundColor: '#F6F6F6',
    shadowColor: '#000000',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      height: 1,
      width: 0,
    }
  },
  card_active: {
    bottom: -28,
  },
  title: {
    paddingTop: 12,
    paddingLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
  description: {
    paddingTop: 2,
    paddingLeft: 12,
    fontSize: 14,
    fontWeight: '300',
  },
  button: {
    position: 'absolute',
    bottom: 28,
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
  }
});

var stores = [
  {
    title: 'Simpleweb Kitchen',
    description: 'The kitchen has hot water.',
    type: 'coffee',
    image: 'http://media.themalaymailonline.com/images/sized/ez/oldtown-ipoh2-crave-april27_840_560_100.jpg',
    key: 1,
    latlng: {
      latitude: 51.447607,
      longitude: -2.606,
    },
    menu: [
      { title: 'Coffee', price: '£3.00' },
      { title: 'Tea', price: '£2.00' },
      { title: 'Hot Chocolate', price: '£2.50' },
    ]
  },
  {
    title: 'M Shed',
    description: 'M Shed is a museum all about Bristol.',
    type: 'beer',
    image: 'https://s-media-cache-ak0.pinimg.com/736x/b8/f8/6b/b8f86b835a630bdfc2a61d6fcfcfb078.jpg',
    key: 2,
    latlng: {
      latitude: 51.447618,
      longitude: -2.598244,
    },
    menu: [
      { title: 'Beer', price: '£3.50' },
      { title: 'Beer', price: '£4.00' },
      { title: 'More Beer', price: '£4.50' },
    ]
  },
];

module.exports = Discover;
