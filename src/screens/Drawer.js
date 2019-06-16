import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import {
    Button, Icon
} from 'native-base';
import Loader from './Loader';
import { Thumbnail } from 'native-base';
import Text from '../AppText';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { goToAuth } from '../Navigation';
import { Navigation } from 'react-native-navigation';
import Placeholder, { Line } from 'rn-placeholder';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 55,
        backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});

export default class Drawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loadingText: undefined,
            balance: 0,
            credentials: {}
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('credentials', (err, result) => {
            let credentials = JSON.parse(result);
            this.setState({ credentials: credentials })
        });
    }

    showLoader(loadingText) {
        this.setState({ loading: true, loadingText })
    }

    hideLoader() {
        this.setState({ loading: false, loadingText: null })
    }

    componentWillMount() {

    }

    logout() {
        AsyncStorage.clear(function (err) {
            if (err) {
                console.log(err);
            }
            goToAuth();
        })
    }

    render() {
        const { loading, loadingText } = this.state;

        return (
            <Fragment>
                <View style={styles.container}>
                    <LinearGradient
                        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                        locations={[0, 0.5, 0.6]}
                        colors={['#000547', '#4064D7', '#000547']}
                        style={[{
                            height: 230,
                            width: "100%",
                            alignItems: "center",
                            justifyContent: "center"
                        }, this.state.isProcessing ? { opacity: 0.5 } : { opacity: 1 }]}>
                        <View style={!this.state.credentials && !this.state.credentials.log_name ? { marginTop: 50, padding: 10 } : null}>
                            <Placeholder
                                isReady={this.state.credentials && this.state.credentials.log_name ? true : false}
                                animation="fade"
                                whenReadyRender={() => <View style={{ alignItems: "center" }}>
                                    <View>
                                        <Thumbnail style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 100 / 2,
                                            borderWidth: 2,
                                            borderColor: "#ccc"
                                        }}
                                            source={{ uri: `${this.state.credentials.log_avatar}` }}
                                        />
                                    </View>
                                    <View style={{ marginTop: 15 }}>
                                        <Text style={{ fontSize: 15, color: "white" }}>Hi {this.state.credentials.log_name}</Text>
                                    </View>
                                    <View>
                                        <Text style={{ color: "#bbb", fontSize: 18 }}>Welcome to AgentsCove</Text>
                                    </View>
                                </View>}
                            >
                                <Line width="70%" />
                                <Line />
                                <Line />
                                <Line width="30%" />
                            </Placeholder>
                        </View>
                    </LinearGradient>
                    <View>
                        <View style={{ marginTop: 40, marginLeft: 6 }}>
                            <View style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-home" />
                                <Text style={{ marginTop: 6, paddingHorizontal: 10 }}>Home</Text>
                            </View>
                            <TouchableOpacity onPress={() => Navigation.push(this.props.componentId, {
                                component: {
                                    name: 'cove.Profile',
                                    options: {
                                        topBar: {
                                            title: {
                                                text: 'Profile'
                                            }
                                        }
                                    }
                                }
                            })} style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-contacts" />
                                <Text style={{ marginTop: 6, paddingHorizontal: 10 }}>Profile</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Navigation.push(this.props.componentId, {
                                component: {
                                    name: 'cove.KinMarketPlace',
                                    options: {
                                        topBar: {
                                            title: {
                                                text: 'Kin Market Place'
                                            },
                                            visible: false,
                                            drawBehind: true,
                                            animate: false
                                        }
                                    }
                                }
                            })} style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-cash" />
                                <Text style={{ marginTop: 4, paddingHorizontal: 10 }}>KIN Market Place</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-list" />
                                <Text style={{ marginTop: 6, paddingHorizontal: 10 }}>Properties</Text>
                            </TouchableOpacity>
                            {/* <View style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-search" />
                                <Text style={{ marginTop: 6, paddingHorizontal: 10 }}>Search</Text>
                            </View> */}
                            <TouchableOpacity onPress={() => this.logout()} style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-log-out" />
                                <Text style={{ marginTop: 6, paddingHorizontal: 10 }}>Logout</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {loading && <Loader loading={loading} text={loadingText} />}
            </Fragment>
        );
    }
}