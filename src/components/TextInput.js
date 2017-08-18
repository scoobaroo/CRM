import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity, Linking } from 'react-native';

export default class TextInput extends Component {
    constructor(props) {
      super(props);
      this.state = { text: 'Rejection Reason' };
    }
  
    render() {
      return (
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
      );
    }
}