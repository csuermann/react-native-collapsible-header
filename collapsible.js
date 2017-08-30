import React, { Component } from 'react'
import { Animated, Platform, KeyboardAwareScrollView, View } from 'react-native'

const AnimatedScrollView = Animated.createAnimatedComponent(
  KeyboardAwareScrollView
)

export default class Collapsible extends Component {
  scroll = new Animated.Value(0)
  offset = new Animated.Value(0)

  min = this.props.min === false ? 0 : Platform.select({ ios: 20, android: 0 })
  max = (this.props.max || 44) + this.min

  position = Animated.add(this.scroll, this.offset).interpolate({
    inputRange: [0, this.max],
    outputRange: [0, this.min - this.max],
    extrapolate: 'clamp'
  })

  opacity = this.scroll.interpolate({
    inputRange: [0, this.max],
    outputRange: [1, 0]
  })

  height = this.scroll.interpolate({
    inputRange: [-this.max, 0, this.max],
    outputRange: [this.max * 2, this.max, this.max]
  })

  render () {
    const { backgroundColor, ...props } = this.props

    return (
      <View style={{ flex: 1, overflow: 'hidden' }}>
        <AnimatedScrollView
          {...props}
          contentContainerStyle={{ paddingTop: this.max }}
          onScroll={Animated.event([
            { nativeEvent: { contentOffset: { y: this.scroll } } }
          ])}
          scrollEventThrottle={16}
        >
          {this.props.renderContent}
        </AnimatedScrollView>
        <Animated.View
          style={{
            backgroundColor,
            height: this.props.bounce === false ? this.max : this.height,
            left: 0,
            paddingTop: this.min,
            position: 'absolute',
            right: 0,
            top: 0,
            transform: [{ translateY: this.position }]
          }}
        >
          <Animated.View style={{ flex: 1, opacity: this.opacity }}>
            {this.props.renderHeader}
          </Animated.View>
        </Animated.View>
      </View>
    )
  }
}
