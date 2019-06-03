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
    Picker
} from 'native-base';
import Text from '../AppText';
import axis from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import Axios from 'axios';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key1",
            selectedProp: 1
        };
    }
    componentDidMount() {

    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    onCategoryChange(value, category) {
        this.setState({ selectedProp: value })
        Navigation.push(this.props.componentId, {
            component: {
                name: 'cove.ListProperty',
                options: {
                    topBar: {
                        title: {
                            text: 'List Property'
                        }
                    }
                },
                passProps: {
                    category: category
                }
            }
        })
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={{ height: "70%", width: "100%", justifyContent: "center", alignItems: "center", backgroundColor: "#4064D7" }}>
                    <View>
                        <Text style={{ fontSize: 45, color: "white", textAlign: "center", padding: 20 }}>Find your next home</Text>
                    </View>
                    <View>
                        <Text style={{ color: "white" }}>Search properties for sale and for rent in Nigeria</Text>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Segment style={{ backgroundColor: "transparent" }}>
                            <Button
                                onPress={() => this.onCategoryChange(1, "hostel")}
                                style={[{ padding: 20, height: 40 },
                                this.state.selectedProp == 1 ? { backgroundColor: "white" } : { backgroundColor: "#000547" }]} first>
                                <Text style={[this.state.selectedProp == 1 ? { color: "#000547" } : { color: "white" }]}>Hostel</Text>
                            </Button>
                            <Button
                                onPress={() => this.onCategoryChange(2, "appartment")}
                                style={[{ padding: 20, height: 40 },
                                this.state.selectedProp == 2 ? { backgroundColor: "white" } : { backgroundColor: "#000547" }]}>
                                <Text style={[this.state.selectedProp == 2 ? { color: "#000547" } : { color: "white" }]}>Apartment</Text>
                            </Button>
                            <Button
                                onPress={() => this.onCategoryChange(3, "land")}
                                style={[{ padding: 20, height: 40 },
                                this.state.selectedProp == 3 ? { backgroundColor: "white" } : { backgroundColor: "#000547" }]}>
                                <Text style={[this.state.selectedProp == 3 ? { color: "#000547" } : { color: "white" }]}>Land</Text>
                            </Button>

                        </Segment>
                        <Segment style={{ backgroundColor: "transparent" }}>
                            <Button
                                onPress={() => this.onCategoryChange(4, "office")}
                                style={[{ padding: 20, height: 40 },
                                this.state.selectedProp == 4 ? { backgroundColor: "white" } : { backgroundColor: "#000547" }]} last>
                                <Text style={[this.state.selectedProp == 4 ? { color: "#000547" } : { color: "white" }]}>Office</Text>
                            </Button>
                            <Button
                                onPress={() => this.onCategoryChange(4, "house")}
                                style={[{ padding: 20, height: 40 },
                                this.state.selectedProp == 4 ? { backgroundColor: "white" } : { backgroundColor: "#000547" }]} last>
                                <Text style={[this.state.selectedProp == 4 ? { color: "#000547" } : { color: "white" }]}>House</Text>
                            </Button>
                        </Segment>
                    </View>
                    <View style={{ width: "90%", margin: 20 }}>
                        <Card>
                            <View header button onPress={() => alert("This is Card Header")}>
                                <Item bordered={false}>
                                    <Input placeholder='Where do you want to live?' style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14 }} />
                                </Item>
                            </View>
                            <View style={{ flexDirection: "row", justifyContent: "center" }}>
                                <View style={{ width: "30%" }}>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="Type"
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected}
                                    // onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Wallet" value="key0" />
                                    </Picker>
                                </View>
                                <View style={{ width: "30%" }}>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="Bed"
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected}
                                    // onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Wallet" value="key0" />
                                    </Picker>
                                </View>
                                <View style={{ width: "30%" }}>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="Max price"
                                        style={{ width: undefined }}
                                        selectedValue={this.state.selected}
                                    // onValueChange={this.onValueChange.bind(this)}
                                    >
                                        <Picker.Item label="Wallet" value="key0" />
                                    </Picker>
                                </View>
                            </View>
                            <View footer button onPress={() => alert("This is Card Footer")}>
                                <TouchableOpacity
                                    disabled={this.state.isProcessing ? true : false}
                                    onPress={() => Navigation.push(this.props.componentId, {
                                        component: {
                                            name: 'cove.ListProperty',
                                            options: {
                                                topBar: {
                                                    title: {
                                                        text: 'List Property'
                                                    }
                                                }
                                            }
                                        }
                                    })}
                                >
                                    <LinearGradient
                                        start={{ x: 0.0, y: 0.25 }} end={{ x: 0.5, y: 1.0 }}
                                        locations={[0, 0.5, 0.6]}
                                        colors={['#000547', '#4064D7', '#000547']}
                                        style={[{
                                            height: 50,
                                            width: "100%",
                                            alignItems: "center",
                                            // borderRadius: 3,
                                            justifyContent: "center"
                                        }, this.state.isProcessing ? { opacity: 0.5 } : { opacity: 1 }]}>
                                        {
                                            this.state.isProcessing ? <View style={{ justifyContent: "center" }}>
                                                <Spinner size="large" color="#00A86B" />
                                            </View> : <Text style={{ color: "white" }}>Search</Text>
                                        }
                                        {/* <Icon style={styles.iconAlign} name='arrow-forward' /> */}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </View>
                </View>
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

export default Home;