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
        id: 'Listing',
      });
    }, 1000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
          Splash page.
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

module.exports = Splash;
