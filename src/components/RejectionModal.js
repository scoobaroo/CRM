import React, { Component } from 'react';
import { TextInput, Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';
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

export default class RejectionModal extends Component {
    state = {
        isModalVisible: false
    }
    _showModal = () => this.setState({ isModalVisible: true })
 
    _hideModal = () => this.setState({ isModalVisible: false })

    updateParentState(data) {
        this.props.updateParentState(data);
    }

    render () {
        return (
            <View>
                <RejectButton style = {styles.button} onPress={this._showModal}>
                    <Text>Show Modal</Text>
                </RejectButton>
                <Modal isVisible={this.state.isModalVisible}>
                    <View style={{ flex: 1, justifyContent:"center", alignItems: "center" }}>
                        <Text style={{fontSize: 14, fontWeight: 'bold', color: 'white'}}>
                            Please Provide Rejection Reason</Text>
                            <TextInput
                                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                                onChangeText={(rejectionreason) => this.setState({rejectionreason})}
                                placeholder="Rejection Reason"
                            />
                        <Text> Rejection Reason: {this.state.rejectionreason} </Text>
                        <View style={styles.buttonContainer}>
                            <RejectButton style = {styles.button} onPress = {this.updateParentState(this.state.rejectionreason)}/>
                            <CancelButton style = {styles.button} onPress = {this._hideModal()}/>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
}