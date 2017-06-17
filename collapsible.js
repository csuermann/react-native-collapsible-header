import React, { Component } from 'react';
import { Animated, Platform, ScrollView, View } from 'react-native';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

const statusBarHeight = Platform.select({ ios: 20, android: 0 });

export default class Collapsible extends Component {
  scroll = new Animated.Value(0);
  offset = new Animated.Value(0);

  headerHeight = (this.props.headerHeight || 44) + statusBarHeight;

  position = Animated.add(this.scroll, this.offset).interpolate({
    inputRange: [0, this.headerHeight],
    outputRange: [
      0,
      -this.headerHeight + (this.props.noStatusBar ? 0 : statusBarHeight)
    ],
    extrapolate: 'clamp'
  });

  opacity = this.scroll.interpolate({
    inputRange: [
      0,
      this.props.noStatusBar
        ? (this.headerHeight + statusBarHeight) / 2
        : this.headerHeight / 2,
      this.props.noStatusBar
        ? this.headerHeight + statusBarHeight
        : this.headerHeight
    ],
    outputRange: [1, 1, 0]
  });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AnimatedScrollView
          {...this.props}
          contentContainerStyle={{ paddingTop: this.headerHeight }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.scroll } } }
          ])}
          scrollEventThrottle={16}>
          {this.props.renderContent}
        </AnimatedScrollView>
        <Animated.View
          style={{
            backgroundColor: this.props.headerBackgroundColor,
            height: this.headerHeight,
            left: 0,
            paddingTop: this.props.noStatusBar ? null : statusBarHeight,
            position: 'absolute',
            right: 0,
            top: 0,
            transform: [{ translateY: this.position }]
          }}>
          <Animated.View style={{ flex: 1, opacity: this.opacity }}>
            {this.props.renderHeader}
          </Animated.View>
        </Animated.View>
      </View>
    );
  }
}
