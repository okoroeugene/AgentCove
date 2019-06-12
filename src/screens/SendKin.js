import React, { Component } from 'react';
import { View, TouchableOpacity, ScrollView, NativeModules, Clipboard } from "react-native";
import { Form, Item, Input, Label, Toast, Icon, Thumbnail, Spinner, Card, CardItem, Content } from 'native-base';
import styles from '../styles';
import Text from '../AppText';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import Axios from 'axios';
import Placeholder, { Line, Media } from "rn-placeholder";

const CoveNative = NativeModules.CoveNativeModule;
class SendKin extends Component {
    state = {
        kinCredentials: {},
        balance: undefined,
        loading: false,
        loadingText: undefined,
        isProcessing: false
    };

    showLoader(loadingText) {
        this.setState({ loading: true, loadingText })
    }

    hideLoader() {
        this.setState({ loading: false, loadingText: null })
    }

    componentDidMount() {

    }

    sendKin() {
        AsyncStorage.getItem('credentials', (err, result) => {
            let credentials = JSON.parse(result);
            Axios.put(`https://agentscove.com/parser/api?username=${credentials.log_username}&id=${credentials.log_password}&hash_passwd=${credentials.log_password}&recv_address=${this.publicAddress}
            &amount=${this.amount}&memo=Send transactions&send_kin=true`)
                .then(result => {
                    console.log(result);
                })
                .catch(err => {
                    console.log(err)
                })
        });
    }

    copyToClipboard() {
        Clipboard.setString(this.state.kinCredentials.public_key);
        CoveNative.showToast("Copied to clipboard");
    }

    transferKin = (accountNumber, amount) => {

    }

    getKinAccountBalance = accountNumber => {

    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <LinearGradient
                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                    locations={[0, 0.5, 0.6]}
                    colors={['#0587FA', '#08B9F3', '#0587FA']}
                    style={[{
                        flex: 1,
                        padding: 15
                    }]}>

                    <View style={{ flex: 1, marginTop: 10 }}>
                        <View style={{ alignItems: "center" }}>
                            <Thumbnail source={require('../imgs/5c9b2dd5cce07f21b5f08089_KIN.png')} />
                        </View>
                        <View style={{ flex: 1, justifyContent: "center" }}>
                            <View style={{ alignItems: "center" }}>
                                <Text style={{ color: "white", fontSize: 20 }}>Send KIN</Text>
                            </View>
                            <Form style={{ marginTop: 20 }}>
                                <Item inlineLabel>
                                    <Input placeholder="Amount to transfer" placeholderTextColor={"#ccc"} style={[styles.inputFormStyle, { color: "white" }]} onChangeText={e => this.amount = e} />
                                </Item>
                                <Item inlineLabel>
                                    <Input placeholder="Public Address to fund" placeholderTextColor={"#ccc"} style={[styles.inputFormStyle, { color: "white" }]} onChangeText={e => this.publicAddress = e} />
                                </Item>
                            </Form>
                            <TouchableOpacity
                                style={{ marginTop: 20 }}
                                onPress={() => this.sendKin()}
                            >
                                <LinearGradient
                                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                    locations={[0, 0.5, 0.6]}
                                    colors={['#7049E4', '#7049E4', '#7049E4']}
                                    style={[{
                                        height: 50,
                                        width: "100%",
                                        alignItems: "center",
                                        borderRadius: 50,
                                        justifyContent: "center"
                                    }]}>
                                    <Text style={{ color: "white" }}>Send KIN</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient >
            </ScrollView >
        );
    }
}

export default SendKin;