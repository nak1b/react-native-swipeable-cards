import React, { Component } from 'react';
import { View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.30;
const SWIPE_OUT_DURATION = 260;

class Deck extends Component {
  static defaultProps = {
    onSwipeLeft: () => {},
    onSwipeRight: () => {},
    renderNoMoreCards: () => {},
    resetDeck: () => {}
  }

  constructor(props) {
    super(props);

    const position = new Animated.ValueXY();

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        const { dx, dy } = gesture;
        position.setValue({x: dx, y: dy}); 
      },
      onPanResponderRelease: (event, gesture) => {
        const { dx } = gesture;

        if(dx > SWIPE_THRESHOLD) {
          this.forceSwipeCard('right');

        }else if(dx < -SWIPE_THRESHOLD) {
          this.forceSwipeCard('left');

        }else {
          this.resetPosition();
        }
      }
    });

    this.state = { panResponder, position, index: 0 };
  }

  componentWillRecieveProps(nextProps) {
    if(nextProp.data !== this.props) {
      this.setState({index: 0});
    }
  }
  
  componentWillUpdate() {
    //for android
    UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    LayoutAnimation.spring();
  }

  forceSwipeCard(direction) {
    const x = direction === 'left' ? -SCREEN_WIDTH : SCREEN_WIDTH;

    Animated.timing(this.state.position, {
      toValue: {x: x, y: 0},
      duration: SWIPE_OUT_DURATION
    }).start(() => {
      this.onSwipeComplete(direction);
    });
  }

  onSwipeComplete(direction) {
    const { onSwipeLeft, onSwipeRight, data } = this.props;
    const item = data[this.state.index];

    direction === 'left' ? onSwipeLeft(item) : onSwipeRight(item);

    this.state.position.setValue({x: 0, y: 0});
    this.setState({index: this.state.index + 1}); 
  }

  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: {x: 0, y: 0}
    }).start()
  }

  cardStyle() {
    const { position } = this.state;
    const rotate = position.x.interpolate({
      inputRange: [-SCREEN_WIDTH * 1.8, 0, SCREEN_WIDTH * 1.8],
      outputRange: ['-120deg', '0deg', '120deg']
    });

    return {
      ...position.getLayout(), 
      transform: [{rotate}]
    };
  }

  renderCards() {
    const { index, panResponder } = this.state;

    if(index >= this.props.data.length) {
      return this.props.renderNoMoreCards();
    }

    return this.props.data.map((item, i) => {
      if(i < index) return null;

      if(i === index) {
        return (
          <Animated.View
            key={item.id}
            {...panResponder.panHandlers}
            style={[this.cardStyle(), styles.cardStyle]}>
            {this.props.renderCard(item)}
          </Animated.View>
        )
      }
      return (
        <Animated.View style={[styles.cardStyle]} key={item.id}>
          {this.props.renderCard(item)}
        </Animated.View>
      );
    }).reverse();
  }
  
  render() {
    return (
      <View>
        {this.renderCards()}
      </View>
    );
  } 
}

const styles = {
  cardStyle: {
    position: 'absolute',
    width: SCREEN_WIDTH
  }
};

export default Deck;