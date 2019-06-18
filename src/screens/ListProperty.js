import React from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    TouchableWithoutFeedback
} from 'react-native';
import {
    Icon,
    Card,
    Spinner
} from 'native-base';
import Text from '../AppText';
import LinearGradient from 'react-native-linear-gradient';
import Axios from 'axios';
import { Navigation } from 'react-native-navigation';
var base64 = require('base-64');

class ListProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key1",
            data: [],
            isFetching: true
        };
    }
    componentDidMount() {
        Axios.get(`https://agentscove.com/parser/api?propertyList=true&category=${this.props.category}&log_id=3`).then(response => {
            this.setState({ data: Object.values(response.data.data[0].body), isFetching: false });
            console.log(this.state.data)
        })
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {
                    this.state.isFetching ? <View style={{ flex: 1, justifyContent: "center" }}>
                        <Spinner size="large" color="#000547" /></View> : this.state.data.map((items, i) =>
                            <TouchableWithoutFeedback key={i} onPress={() => Navigation.push(this.props.componentId, {
                                component: {
                                    name: 'cove.PropertyDetails',
                                    options: {
                                        topBar: {
                                            title: {
                                                text: 'Property Details'
                                            }
                                        }
                                    },
                                    passProps: {
                                        url: items.link
                                    }
                                }
                            })}>
                                <Card>
                                    <View style={{ flexDirection: "row" }}>
                                        <View>
                                            <Image style={{ width: 120, height: 120 }} source={{ uri: `${items.image}` }} />
                                        </View>
                                        <View style={{ flex: 1, paddingRight: 10, paddingLeft: 10, paddingTop: 5 }}>
                                            <Text style={{ fontSize: 12 }}>{base64.decode(items.name)}</Text>
                                            <View style={{ marginTop: 10 }}>
                                                <Text>{`\u20A6${items.price}`}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Icon type="Ionicons" name="ios-pin" style={{ fontSize: 15, marginTop: 1 }} />
                                                <Text style={{ fontSize: 10, paddingLeft: 8 }}>{items.city}</Text>
                                            </View>
                                            <View style={{ flexDirection: "row" }}>
                                                <Icon type="Ionicons" name="ios-call" style={{ fontSize: 15, marginTop: 1 }} />
                                                <Text style={{ fontSize: 10, paddingLeft: 8 }}>{items.contact}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </Card>
                            </TouchableWithoutFeedback>
                        )
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    shareText: {
        fontSize: 20,
        margin: 10,
    },
});

export default ListProperty;