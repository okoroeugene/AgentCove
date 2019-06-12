import React from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Image,
    StyleSheet,
    TouchableHighlight,
    Text
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
    Fab
} from 'native-base';
import DefaultText from '../AppText';
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
        this.navigationEventListener = Navigation.events().bindComponent(this);
    }

    componentWillUnmount() {
        // Not mandatory
        if (this.navigationEventListener) {
            this.navigationEventListener.remove();
        }
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    navigationButtonPressed({ buttonId }) {
        if (buttonId == "drawer") {
            Navigation.mergeOptions('Drawer', {
                sideMenu: {
                    left: {
                        visible: !this.state.isDrawerVisible
                    }
                }
            });
            this.setState({ isDrawerVisible: !this.state.isDrawerVisible })
        }
        if (buttonId == "logout") {
            alert("logout")
        }
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
                        <DefaultText style={{ fontSize: 45, color: "white", textAlign: "center", padding: 20 }}>Find your next home</DefaultText>
                    </View>
                    <View>
                        <DefaultText style={{ color: "white" }}>Search properties for sale and for rent in Nigeria</DefaultText>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Segment style={{ backgroundColor: "transparent" }}>
                            <Button
                                onPress={() => this.onCategoryChange(1, "hostel")}
                                style={[{ padding: 20, height: 40 },
                                this.state.selectedProp == 1 ? { backgroundColor: "white" } : { backgroundColor: "#000547" }]} first>
                                <Text style={{ color: this.state.selectedProp == 1 ? "#000547" : "white", fontFamily: "Kastelov - Axiforma Regular" }}>Hostel</Text>
                            </Button>
                            <Button
                                onPress={() => this.onCategoryChange(2, "apartment")}
                                style={[{ padding: 20, height: 40 },
                                this.state.selectedProp == 2 ? { backgroundColor: "white" } : { backgroundColor: "#000547" }]}>
                                <Text style={{ color: this.state.selectedProp == 2 ? "#000547" : "white", fontFamily: "Kastelov - Axiforma Regular" }}>Apartment</Text>
                            </Button>
                            <Button
                                onPress={() => this.onCategoryChange(3, "land")}
                                style={[{ padding: 20, height: 40 },
                                this.state.selectedProp == 3 ? { backgroundColor: "white" } : { backgroundColor: "#000547" }]}>
                                <Text style={{ color: this.state.selectedProp == 3 ? "#000547" : "white", fontFamily: "Kastelov - Axiforma Regular" }}>Land</Text>
                            </Button>

                        </Segment>
                        <Segment style={{ backgroundColor: "transparent" }}>
                            <Button
                                onPress={() => this.onCategoryChange(4, "office")}
                                style={[{ padding: 20, height: 40 },
                                this.state.selectedProp == 4 ? { backgroundColor: "white" } : { backgroundColor: "#000547" }]} last>
                                <Text style={{ color: this.state.selectedProp == 4 ? "#000547" : "white", fontFamily: "Kastelov - Axiforma Regular" }}>Office</Text>
                            </Button>
                            <Button
                                onPress={() => this.onCategoryChange(5, "house")}
                                style={[{ padding: 20, height: 40 },
                                this.state.selectedProp == 5 ? { backgroundColor: "white" } : { backgroundColor: "#000547" }]} last>
                                <Text style={{ color: this.state.selectedProp == 5 ? "#000547" : "white", fontFamily: "Kastelov - Axiforma Regular" }}>House</Text>
                            </Button>
                        </Segment>
                    </View>
                    <View style={{ width: "90%", margin: 20 }}>
                        <Card>
                            <View header button onPress={() => alert("This is Card Header")}>
                                <Item bordered={false}>
                                    <Icon style={{ marginLeft: 10, color: "#bbb" }} type="Ionicons" name="ios-search" />
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
                                            </View> : <DefaultText style={{ color: "white" }}>Search</DefaultText>
                                        }
                                        {/* <Icon style={styles.iconAlign} name='arrow-forward' /> */}
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </Card>
                    </View>
                </View>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{}}
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => Navigation.push(this.props.componentId, {
                        component: {
                            name: 'cove.NewProperty',
                            options: {
                                topBar: {
                                    title: {
                                        text: 'New Property'
                                    }
                                }
                            }
                        }
                    })}>
                    <Icon name="add" />
                    {/* <Button style={{ backgroundColor: '#34A34F' }}>
                        <Icon name="add" />
                    </Button>
                    <Button style={{ backgroundColor: '#3B5998' }}>
                        <Icon name="logo-facebook" />
                    </Button>
                    <Button disabled style={{ backgroundColor: '#DD5144' }}>
                        <Icon type="Ionicons" name="add" />
                    </Button> */}
                </Fab>
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