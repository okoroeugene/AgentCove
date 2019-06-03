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
import ImagePicker from 'react-native-image-crop-picker';
import Text from '../AppText';
import styles from '../styles';

// export class Images extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             selectedImages: []
//         }
//     }
//     pickImages() {
//         ImagePicker.openPicker({
//             multiple: true,
//             includeBase64: true
//         }).then(images => {
//             images.forEach(element => {
//                 this.state.selectedImages.push({
//                     base64: element.data,
//                     mime: element.mime,
//                     path: element.path
//                 });
//             });
//             this.setState({
//                 selectedImages: this.state.selectedImages.reverse()
//             })
//         });
//     }
//     removeFile(index) {
//         const _temp = this.state.selectedImages;
//         _temp.splice(index, 1);
//         this.setState({ selectedImages: _temp });
//     }
//     render() {
//         return (
//             <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
//                 <TouchableOpacity style={{ alignItems: "center", justifyContent: "center" }} onPress={() => this.pickImages()}>
//                     <Icon type="Ionicons" name="ios-cloud-upload" style={{ fontSize: 80, color: "#bbb" }} />
//                     <Text>Add multiple Images</Text>
//                 </TouchableOpacity>
//                 <View>
//                     <View style={{ flexDirection: "row", marginTop: 30 }}>
//                         <ScrollView
//                             contentContainerStyle={{ paddingVertical: 10 }}
//                             horizontal={true}
//                             showsHorizontalScrollIndicator={false}
//                             showsVerticalScrollIndicator={false}>
//                             {
//                                 this.state.selectedImages.map((items, i) =>
//                                     <View key={i} style={{ justifyContent: "center", paddingRight: 10 }}>
//                                         <View style={{ width: 150, height: 150 }}>
//                                             <Thumbnail style={{ width: 150, height: 150 }} square large source={{ uri: items.path }} />
//                                             <Icon
//                                                 type="Ionicons"
//                                                 style={styles.imgOverlay}
//                                                 name={"ios-close-circle"}
//                                                 onPress={() => this.removeFile(i)}
//                                             />
//                                         </View>
//                                     </View>
//                                 )
//                             }
//                         </ScrollView>
//                     </View>
//                 </View>
//             </View >
//         )
//     }
// }

export function Category() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            {/* <Text>Category</Text> */}
            <Content style={{ marginTop: 150 }}>
                <Form>
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

export function Contact() {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>Contact</Text>
        </View>
    )
}