import React, { Component } from 'react';
import {
    ScrollView,
    View,
    TouchableOpacity,
    Linking,
    Platform
} from "react-native";
import {
    Form,
    Item,
    Input,
    Label,
    Button,
    Icon,
    Thumbnail,
    Toast,
    Spinner
} from 'native-base';
// import axios from 'axios';
import Text from '../AppText';
import styles from '../styles';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { goHome } from '../Navigation';
import Loader from './Loader';
import { Navigation } from 'react-native-navigation';
import Axios from 'axios';
// import Config from 'react-native-config';

// const BASE_URL = Config.BASE_URL;

class Login extends Component {
    state = {
        isProcessing: false,
        loading: false,
        loadingText: undefined
    };

    componentDidMount() {
        // Navigation.mergeOptions('Login', {
        //     bottomTab: {
        //         badge: '3'
        //     }
        // });
    }

    onLogin = () => {
        if (this.email == null || this.password == null) {
            alert("Invalid credentials");
            return;
        }
        this.doLogin();
    }

    Register = () => {

    }

    doLogin() {
        this.showLoader('Logging In...');
        Axios.put(`https://agentscove.com/parser/api?email=${this.email}&password=${this.password}&signin=${true}`).then((response) => {
            let res = response.data.data[0];
            if (res.error) {
                this.hideLoader();
                alert(res.response)
            } else {
                AsyncStorage.setItem("credentials", JSON.stringify(res));
                goHome();
            }
        }).catch((err) => {
            alert(err)
            if (err) {
                this.hideLoader();
            }
        })
    }

    showLoader(loadingText) {
        this.setState({ loading: true, loadingText })
    }

    hideLoader() {
        this.setState({ loading: false, loadingText: null })
    }

    render() {
        const { loading, loadingText } = this.state;
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <View style={{ marginTop: "10%" }}>
                        <Thumbnail large style={{
                            alignSelf: "center",
                            position: "relative",
                            bottom: 30,
                            width: 80,
                            height: 80,
                            borderRadius: 80 / 2,
                            borderColor: "#F1F1F1",
                            borderWidth: 3
                        }} source={require("../imgs/logo_main.jpeg")}></Thumbnail>
                        <Form>
                            <Item rounded last>
                                <Label style={styles.placeholder}><Icon style={styles.defaultGrayTextColor} name="person" /></Label>
                                <Input
                                    placeholder="email"
                                    placeholderTextColor="#CCC"
                                    onChangeText={u => this.email = u}
                                    autoCapitalize={"none"}
                                    style={styles.inputFormStyle}
                                />
                            </Item>
                            <Item style={{ marginTop: 10 }} rounded last>
                                <Label style={styles.placeholder}><Icon style={styles.defaultGrayTextColor} name="ios-unlock" /></Label>
                                <Input
                                    placeholder="password"
                                    placeholderTextColor="#CCC"
                                    onChangeText={p => this.password = p}
                                    secureTextEntry={true}
                                    style={styles.inputFormStyle}
                                />
                            </Item>
                        </Form>
                        <View style={styles.button}>
                            {/* <Button
                            disabled={login.isProcessing ? true : false}
                            onPress={() => this.onLogin()}
                            style={[styles.btnDefault, login.isProcessing ? { opacity: 0.5 } : { opacity: 1 }]} iconRight block danger>
                            <Text style={styles.textWhite}>Submit</Text>
                            <Icon style={styles.iconAlign} name='arrow-forward' />
                        </Button> */}
                            <TouchableOpacity
                                disabled={this.state.isProcessing ? true : false}
                                onPress={() => this.onLogin()}
                            >
                                <LinearGradient
                                    start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                    locations={[0, 0.5, 0.6]}
                                    colors={['#000547', '#4064D7', '#000547']}
                                    style={[{
                                        height: 50,
                                        width: "100%",
                                        alignItems: "center",
                                        borderRadius: 50,
                                        justifyContent: "center"
                                    }, this.state.isProcessing ? { opacity: 0.5 } : { opacity: 1 }]}>
                                    {
                                        this.state.isProcessing ? <View style={{ justifyContent: "center" }}>
                                            <Spinner size="large" color="#00A86B" />
                                        </View> : <Text style={styles.textWhite}>Submit</Text>
                                    }
                                    {/* <Icon style={styles.iconAlign} name='arrow-forward' /> */}
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        {/* <View style={styles.accountText}>
                            <Text>Don't have an account?</Text>
                            <TouchableOpacity onPress={this.Register}><Text style={{ marginLeft: 5 }}>Sign Up</Text></TouchableOpacity>
                        </View> */}
                    </View>
                    {loading && <Loader loading={loading} text={loadingText} />}
                </View>
            </ScrollView>
        );
    }
}

export default Login;