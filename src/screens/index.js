import React from 'react';
import { Navigation } from 'react-native-navigation';
import App from '../../App';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Splash from './Splash';
import Drawer from './Drawer';
import { Root } from 'native-base';
import NewProperty from './NewProperty';
import ListProperty from './ListProperty';
import Profile from './Profile';
import KinMarketPlace from './KinMarketPlace';
import SendKin from './SendKin';
import PropertyDetails from './PropertyDetails';
// import { iconsMap } from './src/helpers/IconsLoader';

const wrapWithToastProvider = Screen => props => (
    <Root>
        <Screen {...props} />
    </Root>
);

export function registerScreens() {
    Navigation.registerComponent('cove.PropertyDetails', () => PropertyDetails);
    Navigation.registerComponent('cove.SendKin', () => SendKin);
    Navigation.registerComponent('cove.KinMarketPlace', () => KinMarketPlace);
    Navigation.registerComponent('cove.Drawer', () => Drawer);
    Navigation.registerComponent('cove.App', () => App);
    Navigation.registerComponent('cove.Profile', () => wrapWithToastProvider(Profile));
    Navigation.registerComponent('cove.Home', () => wrapWithToastProvider(Home));
    Navigation.registerComponent('cove.Login', () => wrapWithToastProvider(Login));
    Navigation.registerComponent('cove.Register', () => wrapWithToastProvider(Register));
    Navigation.registerComponent('cove.NewProperty', () => wrapWithToastProvider(NewProperty));
    Navigation.registerComponent('cove.ListProperty', () => wrapWithToastProvider(ListProperty));
    Navigation.registerComponent('cove.Splash', () => Splash);
}