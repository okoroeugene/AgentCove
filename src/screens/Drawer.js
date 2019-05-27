import React, { Component, Fragment } from 'react';
import { StyleSheet, View, Modal, ActivityIndicator } from 'react-native';
import {
    Button
} from 'native-base';
import Loader from './Loader';
import { Thumbnail } from 'native-base';
import Text from '../AppText';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
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
                    <View style={{ marginTop: -20 }}>
                        <Thumbnail style={{
                            width: 100,
                            height: 100
                        }} source={require('../imgs/test2.jpg')} />
                    </View>
                    <View>
                        <Text style={{ fontSize: 25 }}>Welcome User</Text>
                    </View>
                </View>
                {loading && <Loader loading={loading} text={loadingText} />}
            </Fragment>
        );
    }
}