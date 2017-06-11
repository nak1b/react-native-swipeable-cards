import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Deck from './src/Deck';

const DATA = [
  { id: 1, text: 'Card #1', uri: '/asset/arc1.jpeg' },
  { id: 2, text: 'Card #2', uri: '/asset/arc2.jpeg' },
  { id: 3, text: 'Card #3', uri: '/asset/arc3.jpeg' },
  { id: 4, text: 'Card #4', uri: '/asset/arc4.jpeg' },
  { id: 5, text: 'Card #5', uri: '/asset/arc5.jpeg' },
  { id: 6, text: 'Card #6', uri: '/asset/arc6.jpeg' },
  { id: 7, text: 'Card #7', uri: '/asset/arc7.jpeg' },
  { id: 8, text: 'Card #8', uri: '/asset/arc8.jpeg' },
];

class App extends React.Component {
  renderCard(item) {
    return (
      <Text>item.text</Text>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Deck
          data={DATA}
          renderCard={this.renderCard}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});

Expo.registerRootComponent(App);
