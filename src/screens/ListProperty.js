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
import LinearGradient from 'react-native-linear-gradient';
import Axios from 'axios';

class ListProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key1",
            data: []
        };
    }
    componentDidMount() {
        Axios.put(`https://agentscove.com/parser/api?propertyList=true&category=${this.props.category}&log_id=3`).then(response => {
            this.state.data.push(response.data.data[0].body);
            console.log(this.state.data[0])
            console.log("----------------DATA-----------------------")
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
                <View>
                    {
                        this.state.data.map((items, i) => <Card>
                            <View style={{ flexDirection: "row" }}>
                                <View>
                                    <Image style={{ width: 120, height: 120 }} source={require('../imgs/maxresdefault.jpg')} />
                                </View>
                                <View style={{ flex: 1, paddingRight: 10, paddingLeft: 10, paddingTop: 5 }}>
                                    <Text style={{ fontSize: 12 }}>{items.name}</Text>
                                    <View style={{ marginTop: 10 }}>
                                        <Text>N200,000</Text>
                                    </View>
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon type="Ionicons" name="ios-pin" style={{ fontSize: 15, marginTop: 1 }} />
                                        <Text style={{ fontSize: 10, paddingLeft: 8 }}>EKO Atlantic city, Ahmadu Bello way, Victoria Island, Lagos</Text>
                                    </View>
                                </View>
                            </View>
                        </Card>
                        )
                    }
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

export default ListProperty;