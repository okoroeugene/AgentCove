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
    Label,
    Radio
} from 'native-base';
import Text from '../AppText';
import LinearGradient from 'react-native-linear-gradient';
import styles from '../styles';
import ImagePicker from 'react-native-image-crop-picker';
import { Images, Category, Contact } from './UploadComponents';
import AsyncStorage from '@react-native-community/async-storage';
import { Dropdown } from 'react-native-material-dropdown';
import Axios from 'axios';
import Placeholder, { Line } from 'rn-placeholder';
import Loader from './Loader';
import { goHome } from '../Navigation';

const API = 'https://agentscove.com/parser/api';
class NewProperty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            loadingText: undefined,
            type: "",
            avatarSource: "",
            selectedCity: "",
            selectedCityKey: "",
            selectedInstitute: "",
            selectedInstituteKey: "",
            selectedCategory: "",
            selectSubCategory: "",
            selectedCategoryKey: undefined,
            selectedStep: 1,
            selectedImages: [],
            isProcessing: false,
            data: [],
            cities: {},
            category: {},
            institutes: {},
            propertyName: "",
            address: "",
            price: "",
            position3: {},
            selectedSecurity: undefined,
            catID: 0,
            cityID: 0,
            instID: 0,
            base64: ""
        };
        this.subCategory = {
            land: ["Sales", "Rent"],
            apartment: ["Sales", "Rent", "Sublet"],
            hostel: ["Sales", "Rent", "OffCampus", "OnCampus", "Sublet"],
            office: ["Sales", "Rent", "Sublet"]
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('credentials', (err, result) => {
            let credentials = JSON.parse(result);
            Axios.put(`https://agentscove.com/parser/api?uploadNav=true&pos=1&log_id=${credentials.log_id}&log_username=${credentials.log_username}&log_password=${credentials.log_password}`)
                .then(response => {
                    this.setState({ data: response.data.data });
                    console.log(response.data)
                    if (this.state.data) {
                        this.setState({
                            cities: Object.assign({ 0: "-- select city --" }, this.state.data[0].cities),
                            category: Object.assign({ 0: "-- select category --" }, this.state.data[0].category),
                            institutes: Object.assign({ 0: "-- select institutes --" }, this.state.data[0].institutes)
                        })
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        });
    }

    showLoader(loadingText) {
        this.setState({ loading: true, loadingText })
    }

    hideLoader() {
        this.setState({ loading: false, loadingText: null })
    }

    sendData() {
        this.showLoader("Please wait...");
        const { selectSubCategory } = this.state;
        this.pShare = false;
        this.campus = "";
        this.pType = "";
        selectSubCategory == "Sales" || selectSubCategory == "Rent" ?
            this.pType = selectSubCategory : selectSubCategory == "OffCampus" || selectSubCategory == "OnCampus" ? this.campus = selectSubCategory :
                selectSubCategory == "Sublet" ? this.pShare = true : null;
        AsyncStorage.getItem('credentials', (err, result) => {
            let credentials = JSON.parse(result);
            Axios.put(`https://agentscove.com/parser/api?uploadNav=true&pos=2&log_id=${credentials.log_id}&log_username=${credentials.log_username}&log_password=${credentials.log_password}&catID=${this.state.catID}&name=${this.propertyName}&pNote=true&address=${this.address}&price=${this.price}&rate=week&pShare=${this.pShare}&pptyType=${this.pType}&campus=${this.campus}&cityID=${this.state.cityID}&instID=${this.state.instID}`)
                .then(response => {
                    // this.setState({ data: response.data.data });
                    console.log(response.data)
                    this.setState({ selectedStep: 2, position3: response.data.data[0] })
                    this.hideLoader();
                })
                .catch(err => {
                    console.log(err)
                    this.hideLoader();
                })
            // Axios.put(`https://agentscove.com/parser/api?uploadNav=true&pos=2&log_id=${credentials.log_id}&log_username=${credentials.log_username}&log_password=${credentials.log_password}&catID=${this.state.selectedCategoryKey}&name=${this.state.propertyName}&pNote=true&address=propertyaddress&price=5000&rate=week&pShare=true&pType=rent&campus=offCamp&cityID=51630&instID=219`)
            console.log(`https://agentscove.com/parser/api?uploadNav=true&pos=2&log_id=${credentials.log_id}&log_username=${credentials.log_username}&log_password=${credentials.log_password}&catID=${this.state.catID}&name=${this.propertyName}&pNote=true&address=${this.address}&price=${this.price}&rate=week&pShare=${this.pShare}&pType=${this.pType}&campus=${this.campus}&cityID=${this.state.cityID}&instID=${this.state.instID}`)
        });
    }

    addImage() {
        console.log(this.state.selectedSecurity)
        this.showLoader('Please wait...');
        AsyncStorage.getItem('credentials', (err, result) => {
            let credentials = JSON.parse(result);
            Axios.put(`https://agentscove.com/parser/api?uploadNav=true&pos=3&log_id=${credentials.log_id}&log_username=${credentials.log_username}&log_password=${credentials.log_password}&size=${this.state.selectedImages.length}&sec=${this.state.selectedSecurity}&imgCompile=${this.state.selectedImages.join(", ")}&session_id=${this.state.position3.session_id}`)
                .then(response => {
                    console.log(response.data)
                    if (response.data.ok == true) {
                        this.setState({ selectedStep: 3 })
                    }
                    this.hideLoader();
                })
                .catch(err => {
                    console.log(err)
                    this.hideLoader();
                })
            // console.log(`https://agentscove.com/parser/api?uploadNav=true&pos=3&log_id=${credentials.log_id}&log_username=${credentials.log_username}&log_password=${credentials.log_password}&size=${this.state.selectedImages.length}&sec=${this.state.selectedSecurity}&imgCompile=${this.state.selectedImages.join(", ")}&session_id=${this.state.position3.session_id}`)
        });
    }

    updateInputValue(props, value) {
        this.setState({
            [props]: value
        });
    }

    categoryChange(value, key) {
        this.setState({ selectedCategory: value, selectedCategoryKey: key });
        AsyncStorage.getItem('credentials', (err, result) => {
            let credentials = JSON.parse(result);
            Axios.put(`https://agentscove.com/parser/api?uploadNav=true&pos=1.5&log_id=${credentials.log_id}&log_username=${credentials.log_username}&log_password=${credentials.log_password}&cat=${value}&catID=${key}`)
                .then(response => {
                    // this.setState({ data: response.data.data });
                    this.setState({ catID: response.data.data[0].catID });
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        });
    }

    instituteChange(value, key) {
        this.setState({ selectedInstitute: value, selectedInstituteKey: key });
        AsyncStorage.getItem('credentials', (err, result) => {
            let credentials = JSON.parse(result);
            Axios.put(`https://agentscove.com/parser/api?uploadNav=true&pos=1.5&log_id=${credentials.log_id}&log_username=${credentials.log_username}&log_password=${credentials.log_password}&cat=${value}&catID=${key}`)
                .then(response => {
                    // this.setState({ data: response.data.data });
                    this.setState({ instID: response.data.data[0].catID });
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        });
    }

    cityChange(value, key) {
        this.setState({ selectedCity: value, selectedCityKey: key });
        AsyncStorage.getItem('credentials', (err, result) => {
            let credentials = JSON.parse(result);
            Axios.put(`https://agentscove.com/parser/api?uploadNav=true&pos=1.5&log_id=${credentials.log_id}&log_username=${credentials.log_username}&log_password=${credentials.log_password}&cat=${value}&catID=${key}`)
                .then(response => {
                    // this.setState({ data: response.data.data });
                    this.setState({ cityID: response.data.data[0].catID });
                    console.log(response.data)
                })
                .catch(err => {
                    console.log(err)
                })
        });
    }

    // pickImages() {
    //     const files = this.state.selectedImages;
    //     ImagePicker.openPicker({
    //         multiple: true,
    //         includeBase64: true
    //     }).then(images => {
    //         images.forEach(element => {
    //             files.push(element.path)
    //             // files.push({
    //             //     base64: element.data,
    //             //     mime: element.mime,
    //             //     path: element.path
    //             // });
    //         });
    //         this.setState({
    //             selectedImages: files.reverse()
    //         })
    //     });
    // }

    pickImages = async () => {
        // ImagePicker.openPicker({
        //     cropping: true,
        //     includeBase64: true
        // }).then(image => {
        //     console.log(image);
        //     this.setState({
        //         avatarSource: image.path,
        //         base64: image.data,
        //         type: image.mime
        //     }, () => {
        //         this._updateImage();
        //     });
        // });
        const files = this.state.selectedImages;
        ImagePicker.openPicker({
            multiple: true,
            includeBase64: true
        }).then(images => {
            images.forEach(element => {
                files.push(element.path)
                // files.push({
                //     base64: element.data,
                //     mime: element.mime,
                //     path: element.path
                // });
            });
            this.setState({
                selectedImages: files.reverse()
            })
        });
    }

    _updateImage = async () => {
        this.setState({ loading: true }, async () => {
            try {
                const { avatarSource, type } = this.state;
                if (!avatarSource) {
                    throw new Error("Please select an avatar or upload a photo of you");
                }

                // console.log(avatarSource)
                // console.log(type)
                //Process Image string
                const name = avatarSource.lastIndexOf('/')
                var result = avatarSource.substring(name + 1);
                const ext = result.split('.');
                const file = {
                    uri: avatarSource,
                    result,
                    type: `${type}`
                };

                console.log(file)
                // const data = new FormData();

                // data.append("file", file);
                // data.append("name", `${result}`);
                var data = {
                    pptyUpload: true,
                    file: file,
                    name: result
                }
                Axios.post(`${API}`, JSON.stringify(data))
                    .then((response) => {
                        console.log(response.data)
                    })
                // const res = await Axios({
                //     method: "POST",
                //     data: JSON.stringify({
                //         propertyUpload: true,
                //         formData: data
                //     }),
                //     url: ,
                // });
                // console.log(res.data)
            } catch (e) {
                console.log(e.message)
            }

            this.setState({ loading: false })
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

    selectSubCategory(selectSubCategory) {
        this.setState({ selectSubCategory })
    }

    selectSecurity(e) {
        if (this.state.selectedSecurity && this.state.selectedSecurity.includes(e)) {
            let tempData = this.state.selectedSecurity.replace(`_${e}`, '');
            this.setState({ selectSecurity: tempData })
            console.log(this.state.selectedSecurity)
            return;
        }
        if (!this.state.selectedSecurity) {
            this.setState({ selectedSecurity: e })
            return;
        }
        this.setState({ selectedSecurity: `${this.state.selectedSecurity}_${e}` })
    }

    removeFile(index) {
        const _temp = this.state.selectedImages;
        _temp.splice(index, 1);
        this.setState({ selectedImages: _temp });
    }

    propertyData() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <Content style={{ marginTop: 100 }}>
                    <Form style={{ alignContent: "center" }}>
                        <View style={{ width: "90%", alignSelf: "center" }}>
                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#bbb" }}>
                                <Picker
                                    mode="dropdown"
                                    placeholder="-- select city --"
                                    placeholderStyle={{ color: "#bbb" }}
                                    itemTextStyle={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14 }}
                                    style={{ width: undefined, fontFamily: "Kastelov - Axiforma Regular" }}
                                    selectedValue={this.state.selectedCity}
                                    onValueChange={this.cityChange.bind(this)}
                                >
                                    {this.state.data && this.state.data[0] && this.state.data[0].cities ? Object.keys(this.state.cities).map((key) => {
                                        return (<Picker.Item label={this.state.cities[key]} value={this.state.cities[key]} key={key} />) //if you have a bunch of keys value pair
                                    }) : null}
                                </Picker>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#bbb" }}>
                                <Picker
                                    mode="dropdown"
                                    placeholder="-- select institutes --"
                                    placeholderStyle={{ color: "#bbb" }}
                                    itemTextStyle={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14 }}
                                    textStyle={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14 }}
                                    style={{ width: undefined, fontFamily: "Kastelov - Axiforma Regular" }}
                                    selectedValue={this.state.selectedInstitute}
                                    onValueChange={this.instituteChange.bind(this)}
                                >
                                    {this.state.data && this.state.data[0] && this.state.institutes ? Object.keys(this.state.institutes).map((key) => {
                                        return (<Picker.Item label={this.state.institutes[key]} value={this.state.institutes[key]} key={key} />) //if you have a bunch of keys value pair
                                    }) : null}
                                </Picker>
                            </View>
                            <View style={{ borderBottomWidth: 0.5, borderBottomColor: "#bbb" }}>
                                <Picker
                                    mode="dropdown"
                                    placeholder="-- select category --"
                                    placeholderStyle={{ color: "#bbb" }}
                                    itemTextStyle={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14 }}
                                    style={{ width: undefined, fontFamily: "Kastelov - Axiforma Regular" }}
                                    selectedValue={this.state.selectedCategory}
                                    onValueChange={this.categoryChange.bind(this)}
                                >
                                    {/* <Picker.Item label={"-- select category --"} value={"key0"} key={"0"} /> */}
                                    {this.state.data && this.state.data[0] && this.state.category ? Object.keys(this.state.category).map((key) => {
                                        return (<Picker.Item label={this.state.category[key]} value={this.state.category[key]} key={key} />) //if you have a bunch of keys value pair
                                    }) : null}
                                </Picker>
                            </View>
                            <View style={{ marginTop: 20, flexDirection: "row", justifyContent: "space-evenly" }}>
                                {
                                    this.subCategory[this.state.selectedCategory] && this.subCategory[this.state.selectedCategory].map((items, i) => {
                                        return (
                                            <View key={i}>
                                                <TouchableOpacity
                                                    onPress={() => this.selectSubCategory(items)}
                                                    style={{ flexDirection: "column", alignItems: "center" }}>
                                                    <Radio
                                                        onPress={() => this.selectSubCategory(items)}
                                                        color={"#f0ad4e"}
                                                        selectedColor={"#5cb85c"}
                                                        selected={this.state.selectSubCategory == items ? true : false}
                                                    />
                                                    <Text style={{ fontSize: 12 }}>{items}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        )
                                    })
                                }
                            </View>
                        </View>
                        <View style={{ marginTop: 10 }}>
                            <Item stackedLabel>
                                <Label style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14, color: "#bbb" }}>Property Name</Label>
                                <Input
                                    // value={this.state.propertyName}
                                    onChangeText={(e) => this.propertyName = e}
                                    returnKeyType="next"
                                    style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14 }} />
                            </Item>
                            <Item stackedLabel last>
                                <Label style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14, color: "#bbb" }}>Price</Label>
                                <Input
                                    // value={this.state.price}
                                    onChangeText={e => this.price = e}
                                    returnKeyType="next"
                                    keyboardType="numeric"
                                    style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14 }} />
                            </Item>
                            {/* <Item stackedLabel>
                                <Label style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14, color: "#bbb" }}>Description</Label>
                                <Input style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14 }} />
                            </Item> */}
                            <Item stackedLabel last>
                                <Label style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14, color: "#bbb" }}>Address</Label>
                                <Input
                                    // value={this.state.address}
                                    returnKeyType="send"
                                    onChangeText={e => this.address = e}
                                    style={{ fontFamily: "Kastelov - Axiforma Regular", fontSize: 14 }} />
                            </Item>
                        </View>
                    </Form>
                </Content>
                <View style={{ padding: 20 }}>
                    <TouchableOpacity
                        onPress={() => this.sendData()}
                        // onPress={() => this.state.selectedStep < 3 ? this.setState({ selectedStep: this.state.selectedStep + 1 }) : this.handleUpload()}
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
                                borderRadius: 50,
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
            </View>
        )
    }

    success() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <View style={{ alignItems: "center" }}>
                    <Thumbnail style={{ width: 150, height: 150 }} source={require('../imgs/payment-success.png')} />
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ fontSize: 20, color: "#bbb" }}>Upload Success!</Text>
                    </View>
                    <View style={{ marginTop: 4 }}>
                        <Text style={{ fontSize: 24, color: "red" }}>You have earned 10 KIN</Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={{ padding: 20 }}
                    onPress={() => goHome()}
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
                            </View> : <Text style={{ color: "white" }}>Return Home</Text>
                        }
                    </LinearGradient>
                </TouchableOpacity>
            </View>
        )
    }

    imageSelector() {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <View style={{ alignItems: "center" }}>
                    <View style={{ marginTop: 0, flexDirection: "row" }}>
                        {
                            this.state.position3 && Object.values(this.state.position3.security).map((e, i) => {
                                if (i <= 2) {
                                    return (
                                        <View key={i}>
                                            <TouchableOpacity
                                                onPress={() => this.selectSecurity(e)}
                                                style={{ alignItems: "center" }}>
                                                <Radio
                                                    onPress={() => this.selectSecurity(e)}
                                                    color={"#f0ad4e"}
                                                    selectedColor={"#5cb85c"}
                                                    selected={this.state.selectedSecurity && this.state.selectedSecurity.includes(e) ? true : false}
                                                />
                                                <View style={{ width: 120, alignItems: "center" }}>
                                                    <Text style={{ textAlign: "center", fontSize: 12 }}>{e}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            })
                        }
                    </View>
                    <View style={{ marginTop: 20, flexDirection: "row" }}>
                        {
                            this.state.position3 && Object.values(this.state.position3.security).map((e, i) => {
                                if (i > 2) {
                                    return (
                                        <View key={i}>
                                            <TouchableOpacity
                                                onPress={() => this.selectSecurity(e)}
                                                style={{ alignItems: "center" }}>
                                                <Radio
                                                    onPress={() => this.selectSecurity(e)}
                                                    color={"#f0ad4e"}
                                                    selectedColor={"#5cb85c"}
                                                    selected={this.state.selectedSecurity && this.state.selectedSecurity.includes(e) ? true : false}
                                                />
                                                <View style={{ width: 120, alignItems: "center" }}>
                                                    <Text style={{ textAlign: "center", fontSize: 12 }}>{e}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            })
                        }
                    </View>
                </View>
                <TouchableOpacity style={{ alignItems: "center", justifyContent: "center", marginTop: 20 }} onPress={() => this.pickImages()}>
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
                                            <Thumbnail style={{ width: 150, height: 150 }} square large source={{ uri: items }} />
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
                <View style={{ padding: 20 }}>
                    <TouchableOpacity
                        onPress={() => this.addImage()}
                        // onPress={() => this.state.selectedStep < 3 ? this.setState({ selectedStep: this.state.selectedStep + 1 }) : this.handleUpload()}
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
                                borderRadius: 50,
                                justifyContent: "center"
                            }, this.state.isProcessing ? { opacity: 0.5 } : { opacity: 1 }]}>
                            {
                                this.state.isProcessing ? <View style={{ justifyContent: "center" }}>
                                    <Spinner size="large" color="#00A86B" />
                                </View> : <Text style={{ color: "white" }}>Complete Upload</Text>
                            }
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    handleUpload() {

    }

    render() {
        const { loading, loadingText } = this.state;
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Placeholder
                    isReady={this.state.data && this.state.data.length ? true : false}
                    animation="fade"
                    whenReadyRender={() => <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: "row", justifyContent: "center", position: "relative", top: 50 }}>
                            <TouchableOpacity
                                // onPress={() => this.setState({ selectedStep: 1 })}
                                style={[styles.step, this.state.selectedStep == 1 ? { backgroundColor: "green" } : { backgroundColor: "#bbb" }]}>
                                <View>
                                    <Text style={[this.state.selectedStep == 1 ? { color: "white" } : { color: "black" }]}>1</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => this.setState({ selectedStep: 2 })}
                                style={[styles.step, this.state.selectedStep == 2 ? { backgroundColor: "green" } : { backgroundColor: "#bbb" }]}>
                                <View>
                                    <Text style={[this.state.selectedStep == 2 ? { color: "white" } : { color: "black" }]}>2</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                // onPress={() => this.setState({ selectedStep: 3 })}
                                style={[styles.step, this.state.selectedStep == 3 ? { backgroundColor: "green" } : { backgroundColor: "#bbb" }]}>
                                <View>
                                    <Text style={[this.state.selectedStep == 3 ? { color: "white" } : { color: "black" }]}>3</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        {
                            this.state.selectedStep == 1 ? this.propertyData() : null
                        }
                        {
                            this.state.selectedStep == 2 ? this.imageSelector() : null
                        }
                        {
                            this.state.selectedStep == 3 ? this.success() : null
                        }
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
                {loading && <Loader loading={loading} text={loadingText} />}
            </ScrollView>
        );
    }
}

export default NewProperty;