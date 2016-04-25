var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

import React, {
  Component,
  Image,
  ListView,
  StyleSheet,
  Text,
  View,
  Button,
  Modal,
  ScrollView,
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
        animated: true,
        modalVisible: false,
        transparent: true,
    };

    this.state.dataSource = this.state.dataSource.cloneWithRows(this.state.store.menu);

  }

  setModalVisible(visible) {
    console.log('here i am');
    this.setState({modalVisible: visible});
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

        <Modal
          animated={this.state.animated}
          transparent={this.state.transparent}
          visible={this.state.modalVisible}
          onRequestClose={() => {this.setModalVisible(false)}}
          >
          <View style={styles.modal}>
            <View style={styles.modal_wrap}>
              <View style={styles.modal_header}>
                <Text>Modal Header</Text>
              </View>
              <ScrollView style={styles.modal_scroll}>
                <View style={styles.modal_content}>
                  <Text>This modal was presented {this.state.animated ? 'with' : 'without'} animation.</Text>
                </View>
              </ScrollView>
              <View style={styles.modal_footer}>
                <Text>Modal Header</Text>
              </View>
            </View>
          </View>
        </Modal>

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
      <TouchableHighlight onPress={ () => this.setModalVisible(true) }>
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
  modal: {
    paddingTop: 100,
    paddingBottom: 100,
    paddingLeft: 16,
    paddingRight: 16,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modal_wrap: {
    flex: 1,
    flexDirection: 'row',
    borderRadius: 8,
    overflow: 'hidden',
  },
  modal_header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: 'green',
  },
  modal_footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 64,
    backgroundColor: 'green',
  },
  modal_scroll: {
    marginTop: 64,
    marginBottom: 64,
  },
  modal_content: {
    height: 700,
    backgroundColor: 'red'
  },
});

module.exports = Listing;
