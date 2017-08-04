import React, { Component } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { MKTextField, MKColor, MKButton } from 'react-native-material-kit';
import Loader from './Loader';
import axios from 'axios';
import Xrm from '../xrm/Xrm.CRMAuth';

const LoginButton = MKButton.coloredButton()
    .withText('LOGIN')
    .build();

const styles = StyleSheet.create({
    form: {
        paddingBottom: 10,
        width: 200,
    },
    fieldStyles: {
        height: 40,
        color: MKColor.Orange,
        width: 200,
    },
    loginButtonArea: {
        marginTop: 20,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    errorMessage: {
        marginTop: 15,
        fontSize: 15,
        color: 'red',
        alignSelf: 'center'
    },
    labelText :{
        fontSize : 24,
        paddingBottom: 20
    }
});

export default class Login extends Component {
    constructor(props){
        super(props);
    }
    state = {
        username: '',
        password: '',
        error: '',
        loading: false,
        loggedIn: null
    };

    onButtonPress() {
        const { username, password } = this.state;
        this.setState({
            error: '',
            loading: true,
            loggedIn: false
        });
        var domain = 'issi';
        var url = "https://crmsbx.issi.com/";
        var formUsername = {username};
        var formPassword = {password};
        var CRMSoapAuthentication = Xrm.CRMAuth.GetHeaderOnPremise(url, domain, formUsername, formPassword);

        var body = [];
        body.push('<s:Body>');
        body.push('<Execute xmlns="http://schemas.microsoft.com/xrm/2011/Contracts/Services">');
        body.push('    <request i:type="c:WhoAmIRequest" xmlns:b="http://schemas.microsoft.com/xrm/2011/Contracts" xmlns:i="http://www.w3.org/2001/XMLSchema-instance" xmlns:c="http://schemas.microsoft.com/crm/2011/Contracts">');
        body.push('        <b:Parameters xmlns:d="http://schemas.datacontract.org/2004/07/System.Collections.Generic"/>');
        body.push('        <b:RequestId i:nil="true"/>');
        body.push('        <b:RequestName>WhoAmI</b:RequestName>');
        body.push('    </request>');
        body.push('</Execute>');
        body.push('</s:Body>');
        var xml = [];
        xml.push('<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://www.w3.org/2005/08/addressing">');
        xml.push(CRMSoapAuthentication.Header);
        xml.push(body.join(""));
        xml.push('</s:Envelope>');
        var request = xml.join("");
        var req = new XMLHttpRequest();
        req.open("POST", url + "XRMServices/2011/Organization.svc", true);
        req.setRequestHeader("Content-Type", "application/soap+xml; charset=utf-8");
        req.onreadystatechange = function () {
            if (req.readyState === 4) {
                console.log('req:')
                console.log(req)
                if (req.status === 200) {
                    //Handle the response
                    this.onAuthSuccess();
                }
            } else {
                //Error
                this.onAuthFailed();
            }
        };
        let config = {
            headers: {
                "Content-Type":  "application/soap+xml; charset=utf-8"
            }
        }
        req.send(request);
        // axios.post(url + "XRMServices/2011/Organization.svc",request,config)
        // .then(function(response){
        //     console.log(response);
        // })
        // .catch(function(err){
        //     console.log(err);
        // })
    }

    onAuthSuccess() {
        const { navigate } = this.props.navigation;
        this.setState({
            loading: false,
            loggedIn: true
        });
        this.props.updateAppState({loggedIn: true});
        console.log(this.props.navigation);
        navigate('SalesOrderList', {updateAppState: this.props.updateAppState});
    }

    onAuthFailed() {
        this.setState({
            error: 'Authentication Failed',
            loading: false,
            loggedIn: false
        });
        this.props.updateAppState({loggedIn: false});
        this.props.navigation.navigate('App');
    }

    render() {
        const { navigate } = this.props.navigation;
        const { form, fieldStyles, loginButtonArea, errorMessage, welcome, container } = styles;
        return (
        <View style={styles.container}>
            <View style = {{paddingBottom: 15}}>
                <Image
                    style={{width: 100, height: 70}}
                    source={require('../images/logo.png')}
                />
            </View>
            <Text style = {styles.labelText} >Login to ISSI CRM</Text>
            <MKTextField
                text={this.state.username}
                onTextChange={username => this.setState({ username })}
                textInputStyle={fieldStyles}
                placeholder={'Username...'}
                tintColor={MKColor.Teal}
            />
            <MKTextField
                text={this.state.password}
                onTextChange={password => this.setState({ password })}
                textInputStyle={fieldStyles}
                placeholder={'Password...'}
                tintColor={MKColor.Teal}
                password={true}
            />
            <Text style={errorMessage}>
                {this.state.error}
            </Text>
            <View style={loginButtonArea}>
                <LoginButton onPress={this.onButtonPress.bind(this)} />
            </View>
        </View>
        );
    }
}
