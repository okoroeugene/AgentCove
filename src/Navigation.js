// navigation.js
import { Navigation } from 'react-native-navigation'

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
                                icon: require('./imgs/signUp.png')
                            }
                        }
                    },
                },
            ],
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
                            }
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
                                                }
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