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
    DeckSwiper,
    Form,
    Label
} from 'native-base';
import Text from '../AppText';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles';
import ImagePicker from 'react-native-image-crop-picker';
import { Images, Category, Contact } from './UploadComponents';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-material-dropdown';
import Axios from 'axios';

class NewProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: "key1",
            selectedImages: [],
            isProcessing: false,
            selected: 1,
            data: []
            // data: [
            //     {
            //         text: 'Card One',
            //         name: 'One',
            //         image: require('./img/swiper-1.png'),
            //     }
            // ]
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('credentials', (err, result) => {
            let credentials = JSON.parse(result);
            Axios.put(`https://agentscove.com/parser/api?uploadNav=true&pos=1&log_id=${credentials.log_id}&log_username=${credentials.log_username}&log_password=${credentials.log_password}`)
                .then(response => {
                    this.setState({ data: response.data.data });
                    console.log(this.state.data)
                })
                .catch(err => {
                    console.log(err)
                })
        });
    }

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    pickImages() {
        const files = this.state.selectedImages;
        ImagePicker.openPicker({
            multiple: true,
            includeBase64: true
        }).then(images => {
            images.forEach(element => {
                files.push({
                    base64: element.data,
                    mime: element.mime,
                    path: element.path
                });
            });
            this.setState({
                selectedImages: files.reverse()
            })
        });
    }

    getSelectedImage = () => {
        return this.state.selectedImages.map((items, i) =>
            <Content key={i} style={{ paddingHorizontal: 5 }}>
                <View style={styles.thumbnailShadowSmall}>
                    <Thumbnail style={{
                        marginLeft: 2.1,
                        marginTop: 2.1
                    }} source={{ uri: `${items.path}` }} />
                </View>
            </Content>
        )
    };

    showCategory() {
        if (this.state.data && this.state.data[0] && this.state.data[0].category) {
            const arrayOfObj = Object.entries(this.state.data[0].category).map((e) => ( { [e[0]]: e[1] } ));
            console.log(arrayOfObj)
            return (
                <Dropdown
                    label='-- select category --'
                    data={arrayOfObj}
                />
                // Object.keys(this.state.data[0].category).forEach(e => {
                //     <Dropdown
                //         label='Favorite Fruit'
                //         data={data}
                //     />
                // })
            )
        }
    }

    removeFile(index) {
        const _temp = this.state.selectedImages;
        _temp.splice(index, 1);
        this.setState({ selectedImages: _temp });
    }

    propertyData() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Content style={{ marginTop: 150 }}>
                    <Form>
                        <View style={{ width: "90%" }}>
                            <Picker
                                mode="dropdown"
                                placeholder="Type"
                                style={{ width: undefined }}
                                selectedValue={this.state.selected}
                            // onValueChange={this.onValueChange.bind(this)}
                            >
                                {/* <Picker.Item label="-- select category --" value="key0" /> */}
                                {
                                    this.showCategory()
                                }
                            </Picker>
                        </View>
                        <Item stackedLabel>
                            <Label style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14, color: "#bbb" }}>Description</Label>
                            <Input style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14 }} />
                        </Item>
                        <Item stackedLabel last>
                            <Label style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14, color: "#bbb" }}>Address</Label>
                            <Input style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14 }} />
                        </Item>
                    </Form>
                </Content>
            </View>
        )
    }

    imageSelector() {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }} onPress={() => this.pickImages()}>
                    <Icon type="Ionicons" name="ios-cloud-upload" style={{ fontSize: 80, color: "#bbb" }} />
                    <Text>Add multiple Images</Text>
                </TouchableOpacity>
                <View>
                    <View style={{ flexDirection: "row", marginTop: 30 }}>
                        <ScrollView
                            contentContainerStyle={{ paddingVertical: 10 }}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            showsVerticalScrollIndicator={false}>
                            {
                                this.state.selectedImages.map((items, i) =>
                                    <View key={i} style={{ justifyContent: "center", paddingRight: 10 }}>
                                        <View style={{ width: 150, height: 150 }}>
                                            <Thumbnail style={{ width: 150, height: 150 }} square large source={{ uri: items.path }} />
                                            <Icon
                                                type="Ionicons"
                                                style={styles.imgOverlay}
                                                name={"ios-close-circle"}
                                                onPress={() => this.removeFile(i)}
                                            />
                                        </View>
                                    </View>
                                )
                            }
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
    }

    handleUpload() {

    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center" }}>
                <View style={{ flexDirection: "row", position: "relative", top: 50 }}>
                    <TouchableOpacity
                        onPress={() => this.setState({ selected: 1 })}
                        style={[styles.step, this.state.selected == 1 ? { backgroundColor: "green" } : { backgroundColor: "#bbb" }]}>
                        <View>
                            <Text style={[this.state.selected == 1 ? { color: "white" } : { color: "black" }]}>1</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({ selected: 2 })}
                        style={[styles.step, this.state.selected == 2 ? { backgroundColor: "green" } : { backgroundColor: "#bbb" }]}>
                        <View>
                            <Text style={[this.state.selected == 2 ? { color: "white" } : { color: "black" }]}>2</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => this.setState({ selected: 3 })}
                        style={[styles.step, this.state.selected == 3 ? { backgroundColor: "green" } : { backgroundColor: "#bbb" }]}>
                        <View>
                            <Text style={[this.state.selected == 3 ? { color: "white" } : { color: "black" }]}>3</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {
                    this.state.selected == 1 ? this.propertyData() : null
                }
                {
                    this.state.selected == 2 ? <Category /> : null
                }
                {
                    this.state.selected == 3 ? <Contact /> : null
                }


                <View style={{ width: "100%" }}>
                    <TouchableOpacity
                        onPress={() => this.state.selected < 3 ? this.setState({ selected: this.state.selected + 1 }) : this.handleUpload()}
                        disabled={this.state.isProcessing ? true : false}
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
                                </View> : <Text style={{ color: "white" }}>Continue</Text>
                            }
                            {/* <Icon style={styles.iconAlign} name='arrow-forward' /> */}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

export default NewProperty;