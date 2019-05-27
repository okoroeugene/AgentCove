import React from 'react';
import { Navigation } from 'react-native-navigation';
import App from '../../App';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Splash from './Splash';
import Drawer from './Drawer';
import { Root } from 'native-base';
// import { iconsMap } from './src/helpers/IconsLoader';

const wrapWithToastProvider = Screen => props => (
    <Root>
        <Screen {...props} />
    </Root>
);

export function registerScreens() {
    Navigation.registerComponent('cove.Drawer', () => Drawer);
    Navigation.registerComponent('cove.App', () => App);
    Navigation.registerComponent('cove.Home', () => wrapWithToastProvider(Home));
    Navigation.registerComponent('cove.Login', () => wrapWithToastProvider(Login));
    Navigation.registerComponent('cove.Register', () => wrapWithToastProvider(Register));
    Navigation.registerComponent('cove.Splash', () => Splash);
}