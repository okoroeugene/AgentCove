import React from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    TouchableHighlight
} from 'react-native';
import {
    Thumbnail,
    Icon,
    Button,
    Header,
    Right,
    Left,
    Segment,
    Content,
    Body,
    Title,
    Card,
    CardItem,
    Item,
    Input,
    Picker,
    Spinner
} from 'native-base';
import Text from '../AppText';
import LinearGradient from 'react-native-linear-gradient';
import Axios from 'axios';
import Slideshow from 'react-native-image-slider-show';
import AsyncStorage from '@react-native-community/async-storage';
import Placeholder, { Line } from 'rn-placeholder';
import { Navigation } from 'react-native-navigation';

class PropertyDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key1",
            data: {},
            isFetching: true,
            dataSource: [],
        };
    }

    componentDidMount() {
        let e = [];
        AsyncStorage.getItem('credentials', (err, result) => {
            let credentials = JSON.parse(result);
            Axios.get(`https://agentscove.com/parser/api?property=true&url=${this.props.url}&log_id=${credentials.log_id}&log_password=${credentials.log_password}&log_username=${credentials.log_username}`).then(response => {
                this.setState({
                    data: response.data.data[0],
                    isFetching: false,
                });
                response.data.data[0].pptyFiles.large.map(img => {
                    e.push({ url: img })
                });
                this.setState({ dataSource: e });
                console.log(this.state.dataSource)
            })
        });
    }

    //     {uploader: "Abeokuta Agent", uploader_username: "20190115143939apwfn113005", pptyOwner: false, pptyName: "17 Room Self Contained Hostel At UNAAB", pptyDesc: "Investment Property, Abeokuta", …}
    // contact: "+2348028966338"
    // number: "-"
    // pptyDesc: "Investment Property, Abeokuta"
    // pptyFiles:
    // large: (4) ["https://www.agentscove.com/property/SunJan1320040920191981_enlarge.jpg", "https://www.agentscove.com/property/SunJan1320041020198657_enlarge.jpg", "https://www.agentscove.com/property/SunJan1320041320198939_enlarge.jpg", "https://www.agentscove.com/property/SunJan1320041420194425_enlarge.jpg"]
    // small: (4) ["https://www.agentscove.com/property/SunJan1320040920191981.jpg", "https://www.agentscove.com/property/SunJan1320041020198657.jpg", "https://www.agentscove.com/property/SunJan1320041320198939.jpg", "https://www.agentscove.com/property/SunJan1320041420194425.jpg"]
    // __proto__: Object
    // pptyName: "17 Room Self Contained Hostel At UNAAB"
    // pptyOwner: false
    // price: "20,000,000.00"
    // rate: "/ year rent"
    // securities: ""
    // term: "Rooms"
    // uploader: "Abeokuta Agent"
    // uploader_username: "20190115143939apwfn113005"

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Placeholder
                    isReady={this.state.dataSource && this.state.dataSource.length ? true : false}
                    animation="fade"
                    whenReadyRender={() => <View>
                        <Slideshow
                            height={400}
                            dataSource={this.state.dataSource} />
                        <View style={{ marginTop: 10, alignItems: "center" }}>
                            <Text style={{ fontSize: 24, color: "#bbb" }}>Features</Text>
                        </View>
                        <View style={{ alignItems: "center", marginTop: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginRight: 4 }}>Name:</Text>
                                <Text>{this.state.data.pptyName}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginRight: 4 }}>Description:</Text>
                                <Text>{this.state.data.pptyDesc}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginRight: 4 }}>Contact:</Text>
                                <Text>{this.state.data.contact}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginRight: 4, marginTop: 3 }}>Price:</Text>
                                <Text style={{ fontSize: 20, color: "#03AC13" }}>{`${this.state.data.price}/${this.state.data.rate}`}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ marginRight: 4 }}>Uplader:</Text>
                                <Text>{this.state.data.uploader}</Text>
                            </View>
                        </View>
                        <View style={{ padding: 20 }}>
                            <TouchableOpacity
                                style={{ marginTop: 20 }}
                                onPress={() => Navigation.push(this.props.componentId, {
                                    component: {
                                        name: 'cove.SendKin',
                                        options: {
                                            topBar: {
                                                title: {
                                                    text: 'Send Kin'
                                                }
                                            }
                                        }
                                    }
                                })}
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
                                    <Text style={{ color: "white" }}>Pay with KIN</Text>
                                </LinearGradient>
                            </TouchableOpacity>
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

export default PropertyDetails;