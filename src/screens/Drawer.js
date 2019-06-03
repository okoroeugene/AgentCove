import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import {
    Button, Icon
} from 'native-base';
import Loader from './Loader';
import { Thumbnail } from 'native-base';
import Text from '../AppText';
import LinearGradient from 'react-native-linear-gradient';

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
        };
    }

    componentDidMount() {

    }

    showLoader(loadingText) {
        this.setState({ loading: true, loadingText })
    }

    hideLoader() {
        this.setState({ loading: false, loadingText: null })
    }

    componentWillMount() {

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
                        <View>
                            <Thumbnail style={{
                                width: 100,
                                height: 100,
                                borderRadius: 100 / 2
                            }} source={require('../imgs/test2.jpg')} />
                        </View>
                        <Text style={{ fontSize: 15, color: "white" }}>Welcome User</Text>
                    </LinearGradient>
                    <View>
                        <View style={{ marginTop: 40, marginLeft: 6 }}>
                            <View style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-home" />
                                <Text style={{ marginTop: 7, paddingHorizontal: 10 }}>Home</Text>
                            </View>
                            <View style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-contacts" />
                                <Text style={{ marginTop: 7, paddingHorizontal: 10 }}>Profile</Text>
                            </View>
                            <View style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-list" />
                                <Text style={{ marginTop: 7, paddingHorizontal: 10 }}>Properties</Text>
                            </View>
                            <View style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-search" />
                                <Text style={{ marginTop: 7, paddingHorizontal: 10 }}>Search</Text>
                            </View>
                            <View style={{ flexDirection: "row", padding: 10 }}>
                                <Icon type="Ionicons" name="ios-log-out" />
                                <Text style={{ marginTop: 7, paddingHorizontal: 10 }}>Logout</Text>
                            </View>
                        </View>
                    </View>
                </View>
                {loading && <Loader loading={loading} text={loadingText} />}
            </Fragment>
        );
    }
}