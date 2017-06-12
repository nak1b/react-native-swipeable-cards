import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';

const DATA = [
  { id: 1, text: 'Card #1', uri: require('./assets/arch1.jpeg')},
  { id: 2, text: 'Card #2', uri: require('./assets/arch2.jpeg') },
  { id: 3, text: 'Card #3', uri: require('./assets/arch3.jpeg') },
  { id: 4, text: 'Card #4', uri: require('./assets/arch4.jpeg') },
  { id: 5, text: 'Card #5', uri: require('./assets/arch5.jpeg') },
  { id: 6, text: 'Card #6', uri: require('./assets/arch6.jpeg') },
  { id: 7, text: 'Card #7', uri: require('./assets/arch7.jpeg') },
  { id: 8, text: 'Card #8', uri: require('./assets/arch8.jpeg') },
];

class App extends React.Component {
  renderCard(item) {
    return (
      <Card 
        image={item.uri}
        key={item.id}
        imageStyle={{height: 250}}
        containerStyle={{height: 250}} />
    );
  }

  renderEmptyView() {
    return (
      <Card title='No More Cards'>
        <Button
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='Fetch More' />
      </Card>
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.heading}>Swipe Left Or Right</Text>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
          renderNoMoreCards={this.renderEmptyView}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40
  },

  heading: {
    fontSize: 20,
    color: '#424242',
    alignSelf: 'center',
    marginBottom: 16
  }
});

Expo.registerRootComponent(App);
