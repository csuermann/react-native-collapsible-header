import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Platform,
  StatusBar,
  Text,
  View
} from 'react-native';

import Collapsible from './collapsible';

const Header = () => (
  <View
    style={{
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center'
    }}>
    <Image
      source={require('./1.jpg')}
      style={{ flex: 1, width: Dimensions.get('window').width }}
    />
    <Text
      style={{
        backgroundColor: 'transparent',
        bottom: 40,
        color: '#fff',
        fontFamily: 'e',
        fontSize: 24,
        left: 40,
        position: 'absolute'
      }}>
      Lorem Ipsum
    </Text>
  </View>
);

const Content = ({ gray }) => (
  <View
    style={{
      alignItems: 'center',
      backgroundColor: gray ? '#f7f7f7' : null,
      justifyContent: 'center'
    }}>
    <Text
      style={{
        color: '#222',
        fontFamily: 'e',
        padding: 40,
        textAlign: 'justify'
      }}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </Text>
  </View>
);

export default class Example extends Component {
  componentWillMount() {
    StatusBar.setHidden(false, 'fade');
    StatusBar.setBarStyle('light-content', true);

    if (Platform.OS === 'android') StatusBar.setBackgroundColor('#222', true);
  }

  render() {
    return (
      <Collapsible
        backgroundColor="#222"
        max={300}
        renderHeader={<Header />}
        renderContent={
          <View>
            <Content />
            <Content gray />
            <Content />
            <Content gray />
            <Content />
            <Content gray />
            <Content />
            <Content gray />
            <Content />
            <Content gray />
          </View>
        }
      />
    );
  }
}
