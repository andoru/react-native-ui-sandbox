import React, {
  Component,
  StyleSheet,
  Text,
  View
} from 'react-native';

class Splash extends Component {

  componentWillMount() {
    var navigator = this.props.navigator;
    setTimeout(() => {
      navigator.replace({
        id: 'Discover',
      });
    }, 4000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.splash_text}>
          Order things then collect them.
        </Text>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#4A90E2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  splash_text: {
    fontSize: 21,
    color: 'white',
  }
});

module.exports = Splash;
