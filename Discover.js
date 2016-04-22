import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight,
  TouchableOpacity,
  Dimensions
} from 'react-native';

var MapView = require('react-native-maps');

var { width, height } = Dimensions.get('window');

const ASPECT_RATIO = width / height;
const LATITUDE = 51.447713;
const LONGITUDE = -2.609553;
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
      markers: [
        {
          key: 1,
          latlng: {
            latitude: 51.447607,
            longitude: -2.609724,
          },
          title: 'Simpleweb Kitchen',
          description: 'The kitchen has hot water.'
        }
      ]
    };
  }

  onRegionChange(region) {
    this.state = {
      region: region
    }
  }

  centerOnMarker(marker) {
    console.log(this.refs);
    this.refs.map.animateToRegion({
      latitude: marker.latlng.latitude,
      longitude: marker.latlng.longitude,
      latitudeDelta: this.state.region.latitudeDelta,
      longitudeDelta: this.state.region.longitudeDelta,
    });
    // this.state.region.latitude = marker.latlng.latitude;
    // this.state.region.longitude = marker.latlng.longitude;
    console.log('center!!!');
    console.log(this.state.region);
  }

  render() {
    return (
      <Navigator
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
      <MapView
        ref="map"
        style={styles.map}
        region={this.state.region}
        onRegionChange={this.onRegionChange}
      >
        {this.state.markers.map(marker => (
          <MapView.Marker
            key={marker.key}
            coordinate={marker.latlng}
            title={marker.title}
            onSelect={ () => this.markerSelected(marker) }
          />
        ))}
      </MapView>
    );
  }

  markerSelected(marker) {
    console.log(marker);
    this.centerOnMarker(marker);
      // setTimeout( () =>
      //   this.props.navigator.push({
      //     id: 'Listing',
      //     name: 'ListView',
      //   })
      // ,1000);
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

var marker =
  {
    latlng: {
      lat: 51.447607,
      lng: -2.609724,
    },
    title: 'Simpleweb Kitchen',
    description: 'The kitchen has hot water.'
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
});

module.exports = Discover;
