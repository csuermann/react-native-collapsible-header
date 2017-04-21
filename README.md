# react-native-collapsible-header
<img src="https://raw.githubusercontent.com/sonaye/react-native-collapsible-header/master/demo.gif" width="400">

[Inspiration](https://medium.com/appandflow/react-native-collapsible-navbar-e51a049b560a).

# Installation
`yarn add react-native-collapsible-header`

# Usage
```javascript
<Collapsible
  data={[{ key: 'value' }]}              // based on FlatList (minimal usage)
  headerColor="#fff"                     // default = '#fff'
  renderHeader={<Component />}
  renderItem={({ item, index }) => null} // based on FlatList (minimal usage)
  {...}                                  // FlatList and ScrollView props can be passed
 />
```

## Example
```javascript
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Collapsible from 'react-native-collapsible-header';

const Example = () => (
  <Collapsible
    data={[...Array(24).keys()].slice(1)}
    headerColor="#0f9d58"
    renderHeader={
      <View style={[styles.landing, { flex: 1 }]}>
        <Text style={{ color: '#fff' }}>Header</Text>
      </View>
    }
    renderItem={({ index }) => (
      <View
        style={[
          styles.landing,
          { backgroundColor: index % 2 !== 0 ? '#f7f7f7' : null }
        ]}>
        <Text style={{ color: '#444', padding: 40 }}>Content</Text>
      </View>
    )}
    ItemSeparatorComponent={() => <View style={styles.line} />}
  />
);

const styles = {
  landing: { alignItems: 'center', justifyContent: 'center' },
  line: { backgroundColor: '#ccc', height: StyleSheet.hairlineWidth }
};

export default Example;
```
