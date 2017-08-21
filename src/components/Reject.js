import React, { Component } from 'react';
import { TextInput, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { MKTextField, MKColor, MKButton, getTheme } from 'react-native-material-kit';

const RejectButton = MKButton.coloredButton()
    .withText('REJECT')
    .withBackgroundColor(MKColor.Red)
    .build();
const CancelButton = MKButton.coloredButton()
    .withText('CANCEL')
    .withBackgroundColor(MKColor.Grey)
    .build();

const styles = StyleSheet.create({
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'row'
      },
    button:{
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        height: 35,
        width: 160
    }
});

export default class Reject extends Component {
    constructor(props) {
        super(props);
        this.state = { rejectionreason: "" };
    }
    reject(){
        const { goBack } = this.props.navigation;
        const { rejectionreason } = this.state;
        console.log('rejected');
        this.props.navigation.state.params.updateParentState({rejectionreason});
        this.props.navigation.state.params.reject();
        goBack();
    }
    cancel(){
        const { goBack } = this.props.navigation;
        console.log('canceled');
        goBack();
    }
    render () {
        return (
            <View style={{justifyContent:"center", alignItems: "center" }}>
                <Text style={{fontSize: 14, fontWeight: 'bold', color: 'black'}}>
                    Please Provide Rejection Reason</Text>
                    <TextInput
                        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                        onChangeText={(rejectionreason) => this.setState({rejectionreason})}
                        placeholder="Rejection Reason"
                    />
                <Text> Rejection Reason: {this.state.rejectionreason} </Text>
                <View style={styles.buttonContainer}>
                    <RejectButton style = {styles.button} onPress = {this.reject.bind(this)}/>
                    <CancelButton style = {styles.button} onPress = {this.cancel.bind(this)}/>
                </View>
            </View>
        )
    }
}