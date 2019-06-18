// navigation.js
import { Navigation } from 'react-native-navigation'
import { iconsMap } from './helpers/IconsLoader';

export const goToAuth = () => Navigation.setRoot({
    root: {
        bottomTabs: {
            id: 'BottomTabsId',
            children: [
                {
                    component: {
                        id: "Login",
                        name: 'cove.Login',
                        options: {
                            bottomTab: {
                                fontSize: 12,
                                text: 'Sign In',
                                selectedTextColor:"white",
                                selectedIconColor:"white",
                                icon: require('./imgs/signIn.png')
                            }
                        }
                    },
                },
                {
                    component: {
                        id: "Register",
                        name: 'cove.Register',
                        options: {
                            bottomTab: {
                                text: 'Sign Up',
                                fontSize: 12,
                                selectedTextColor:"white",
                                selectedIconColor:"white",
                                icon: require('./imgs/signUp.png')
                            }
                        }
                    },
                },
            ],
            options: {
                bottomTabs: {
                    backgroundColor: "#9C9E9B",
                },
                bottomTab: {
                    iconColor: "white",
                    textColor: "white"
                }
            }
        }
    }
});

export const goHome = () => Navigation.setRoot({
    root: {
        stack: {
            id: 'App',
            children: [
                {
                    // component: {
                    //     name: 'cove.Home',
                    //     options: {
                    //         title: {
                    //             text: "Home"
                    //         }
                    //     },
                    // },
                    sideMenu: {
                        id: "sideMenu",
                        left: {
                            component: {
                                id: "Drawer",
                                name: "cove.Drawer"
                            },
                            width: 260,
                            height: 270,
                            visible: false,
                            enabled: true
                        },
                        center: {
                            stack: {
                                id: "AppRoot",
                                children: [{
                                    component: {
                                        id: "App",
                                        name: "cove.Home",
                                        options: {
                                            topBar: {
                                                title: {
                                                    text: 'Home'
                                                },
                                                leftButtons: [
                                                    {
                                                        id: 'drawer',
                                                        icon: iconsMap["ios-menu"]
                                                    }
                                                ],
                                            }
                                        }
                                    }
                                }]
                            }
                        },
                        // right: {
                        //     component: {}
                        // }
                    }
                }
            ],
        }
    }
})