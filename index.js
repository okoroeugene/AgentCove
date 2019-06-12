import { Navigation } from "react-native-navigation";
import { registerScreens } from './src/screens';
registerScreens();

Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setRoot({
        root: {
            component: {
                name: "cove.Splash"
            }
        }
    });
});

Navigation.setDefaultOptions({
    topBar: {
        title: {
            // text: 'Title',
            fontSize: 18,
            // color: 'red',
            fontFamily: 'Kastelov - Axiforma Regular',
        },
        // subtitle: {
        //     text: 'Title',
        //     fontSize: 14,
        //     color: 'red',
        //     fontFamily: 'Helvetica',
        //     alignment: 'center'
        // },

    },
    bottomTab: {
        iconColor: "black",
        selectedIconColor: "#ccc",
        backgroundColor: "white",
        fontFamily: "Kastelov - Axiforma Regular",
        fontSize: 14
    },
    bottomTabs: {
        titleDisplayMode: "alwaysShow"
    }
});