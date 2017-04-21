import React, { Component } from 'react';
import { Animated, FlatList, Platform, View } from 'react-native';

const headerHeight = Platform.select({ ios: 64, android: 56 });
const statusBarHeight = Platform.select({ ios: 20, android: 0 });

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export default class Collapsible extends Component {
  scrollAnim = new Animated.Value(0);
  offsetAnim = new Animated.Value(0);

  state = {
    scrollAnim: this.scrollAnim,
    offsetAnim: this.offsetAnim,
    clampedScroll: Animated.diffClamp(
      Animated.add(
        this.scrollAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp'
        }),
        this.offsetAnim
      ),
      0,
      headerHeight - statusBarHeight
    )
  };

  componentDidMount() {
    this.state.scrollAnim.addListener(({ value }) => {
      const diff = value - this.scrollValue;
      this.scrollValue = value;
      this.clampedScrollValue = Math.min(
        Math.max(this.clampedScrollValue + diff, 0),
        headerHeight - statusBarHeight
      );
    });

    this.state.offsetAnim.addListener(({ value }) => {
      this.offsetValue = value;
    });
  }

  componentWillUnmount() {
    this.state.scrollAnim.removeAllListeners();
    this.state.offsetAnim.removeAllListeners();
  }

  onScrollEndDrag = () => {
    this.scrollEndTimer = setTimeout(this.onMomentumScrollEnd, 250);
  };

  onMomentumScrollBegin = () => {
    clearTimeout(this.scrollEndTimer);
  };

  onMomentumScrollEnd = () => {
    const toValue = this.scrollValue > headerHeight &&
      this.clampedScrollValue > (headerHeight - statusBarHeight) / 2
      ? this.offsetValue + headerHeight
      : this.offsetValue - headerHeight;

    Animated.timing(this.state.offsetAnim, {
      toValue,
      duration: 350,
      useNativeDriver: true
    }).start();
  };

  clampedScrollValue = 0;
  offsetValue = 0;
  scrollValue = 0;

  render() {
    const { clampedScroll } = this.state;

    const navbarTranslate = clampedScroll.interpolate({
      inputRange: [0, headerHeight - statusBarHeight],
      outputRange: [0, -(headerHeight - statusBarHeight)],
      extrapolate: 'clamp'
    });

    const navbarOpacity = clampedScroll.interpolate({
      inputRange: [0, headerHeight - statusBarHeight],
      outputRange: [1, 0],
      extrapolate: 'clamp'
    });

    return (
      <View style={{ flex: 1 }}>
        <AnimatedFlatList
          contentContainerStyle={{ paddingTop: headerHeight }}
          data={this.props.data}
          keyExtractor={(item, i) => `collapsible-item-${i}`}
          onMomentumScrollBegin={this.onMomentumScrollBegin}
          onMomentumScrollEnd={this.onMomentumScrollEnd}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollAnim } } }],
            { useNativeDriver: true }
          )}
          onScrollEndDrag={this.onScrollEndDrag}
          renderItem={this.props.renderItem}
          scrollEventThrottle={1}
          {...this.props}
        />
        <Animated.View
          style={[
            {
              backgroundColor: this.props.headerColor || '#fff',
              height: headerHeight,
              left: 0,
              paddingTop: statusBarHeight,
              position: 'absolute',
              right: 0,
              top: 0,
              transform: [{ translateY: navbarTranslate }]
            }
          ]}>
          <Animated.View style={{ flex: 1, opacity: navbarOpacity }}>
            {this.props.renderHeader}
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}
