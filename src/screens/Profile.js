import React from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import {
    Thumbnail,
} from 'native-base';
import Text from '../AppText';
import axis from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import { Navigation } from 'react-native-navigation';
import Axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Placeholder, { Line, Media } from "rn-placeholder";
import ImagePicker from 'react-native-image-crop-picker';

const API = 'https://agentscove.com/parser/api';
class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            credentials: {}
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('credentials', (err, result) => {
            let credentials = JSON.parse(result);
            console.log(credentials)
            Axios.put(`https://agentscove.com/parser/api?log_id=${credentials.log_id}&log_username=${credentials.log_username}
            &log_password=${credentials.log_password}&profile_username=${credentials.log_username}&profile=true`)
                .then(result => {
                    this.setState({ credentials: result.data.data[0] })
                })
                .catch(err => {
                    console.log(err)
                })
        });
    }

    _selectPhoto = async () => {
        // const cameraPemissions = await Permissions.getAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL);
        // if (cameraPemissions.status === 'denied') {
        //     console.log('Please allow AgentCove to access your Camera and Photos from your device settings');
        //     return false;
        // }
        ImagePicker.openPicker({
            cropping: true,
            includeBase64: true
        }).then(image => {
            console.log(image);
            this.setState({
                avatarSource: image.filename,
                base64: image.data,
                type: image.mime
            }, () => {
                this._updateImage();
            });
        });
    }

    _updateImage = async () => {
        this.setState({ loading: true }, async () => {
            try {
                const { avatarSource, type } = this.state;
                if (!avatarSource) {
                    throw new Error("Please select an avatar or upload a photo of you");
                }

                //Process Image string
                const name = last(split(avatarSource, '/'));
                const ext = last(split(name, '.'));
                const file = {
                    uri: avatarSource,
                    name,
                    type: `${type}/${ext}`
                };

                const data = new FormData();

                data.append("file", file);
                data.append("name", `${this.props.userName}.${ext}`);

                const res = await Axios({
                    method: "POST",
                    data: JSON.stringify({
                        propertyUpload: true,
                        formData: data
                    }),
                    url: API,
                });
                console.log('success')
            } catch (e) {
                console.log(e.message)
            }

            this.setState({ loading: false })
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Placeholder
                    isReady={this.state.credentials && this.state.credentials.log_name ? true : false}
                    animation="fade"
                    whenReadyRender={() => <View style={{ padding: 10, marginTop: 50 }}>
                        <View style={{ alignItems: "center" }}>
                            <View>
                                <Thumbnail
                                    style={{ width: 150, height: 150, borderRadius: 150 / 2, borderWidth: 2, borderColor: "#ccc" }}
                                    source={{ uri: `${this.state.credentials.log_avatar}` }}
                                />
                            </View>
                            <View style={{ marginTop: 20 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 18, color: "#bbb" }}>Name: </Text>
                                    <Text style={{ fontSize: 18 }}>{this.state.credentials.log_name}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontSize: 18, color: "#bbb" }}>Tagline: </Text>
                                    <Text style={{ fontSize: 18 }}>{this.state.credentials.tagline}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ marginTop: 20, padding: 10 }}>
                            <TouchableOpacity
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
                                    <Text style={{ color: "white" }}>Send Kin</Text>
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

export default Profile;