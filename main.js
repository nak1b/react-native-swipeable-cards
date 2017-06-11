import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import Deck from './src/Deck';

const DATA = [
  { id: 1, text: 'Card #1', uri: require('./assets/arch1.jpeg')},
  { id: 2, text: 'Card #2', uri: require('./assets/arch2.jpeg') },
  { id: 4, text: 'Card #4', uri: require('./assets/arch4.jpeg') },
  { id: 3, text: 'Card #3', uri: require('./assets/arch3.jpeg') },
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
      >
        <Text style={{marginTop: 6, fontSize: 15, fontWeight: 'bold'}}>{item.text}</Text>
        <Text style={{marginTop: 6, marginBottom: 8}}>Card Details Will go Here.</Text>
        <Button
          icon={{name: 'code'}}
          backgroundColor='#03A9F4'
          buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
          title='VIEW NOW' />
      </Card>
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
