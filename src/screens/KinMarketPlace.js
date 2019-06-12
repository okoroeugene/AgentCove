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
class KinMarketPlace extends Component {
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
        AsyncStorage.getItem('credentials', (err, result) => {
            let credentials = JSON.parse(result);
            let data = {
                "kin_info": true,
                "id": credentials.log_id,
                "username": credentials.log_username,
                "hash_passwd": credentials.log_password
            }
            Axios.post(`https://api.agentscove.com`, data)
                .then(result => {
                    this.setState({ kinCredentials: result.data });
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

                    <Placeholder
                        isReady={this.state.kinCredentials && this.state.kinCredentials.public_key ? true : false}
                        animation="fade"
                        whenReadyRender={() => <View style={{ flex: 1, marginTop: 10 }}>
                            <View style={{ alignItems: "center" }}>
                                <Thumbnail source={require('../imgs/5c9b2dd5cce07f21b5f08089_KIN.png')} />
                            </View>
                            {/* <View style={{ alignItems: "center", marginTop: 20 }}>
                                <Text style={{ fontSize: 20, color: "white" }}>KIN MarketPlace</Text>
                            </View> */}
                            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                                <View>
                                    <Text style={{ color: "#bbb", fontSize: 20 }}>Public Address</Text>
                                </View>
                                <View style={{ alignItems: "center" }}>
                                    <Text style={{ textAlign: "center", fontSize: 15, color: "white" }}>{this.state.kinCredentials.public_key}</Text>
                                    <TouchableOpacity onPress={() => this.copyToClipboard()}>
                                        <Icon type="Ionicons" name="copy" style={{ color: "#ccc" }} />
                                    </TouchableOpacity>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <View>
                                        <Text style={{ color: "#bbb", fontSize: 20 }}>Balance</Text>
                                    </View>
                                    <View>
                                        <Text style={{ textAlign: "center", fontSize: 15, color: "white" }}>{this.state.kinCredentials.balance} KIN</Text>
                                    </View>
                                </View>
                            </View>
                        </View>}
                    >
                        <Line width="70%" />
                        <Line />
                        <Line />
                        <Line width="30%" />
                        <View style={{ height: 100 }}></View>
                        <Line width="70%" />
                        <Line />
                        <Line />
                        <Line width="30%" />
                        <View style={{ height: 100 }}></View>
                        <Line width="70%" />
                        <Line />
                        <Line />
                        <Line width="30%" />
                    </Placeholder>
                </LinearGradient >
            </ScrollView >
        );
    }
}

export default KinMarketPlace;