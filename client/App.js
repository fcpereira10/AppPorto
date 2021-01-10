import React from 'react';
import {Image} from 'react-native'
import  AppLoading  from 'expo-app-loading';
import { Container, StyleProvider } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import ProfileScreen from './app/screens/ProfileScreen';
import AboutScreen from './app/screens/AboutScreen';
import EditProfileScreen from './app/screens/EditProfileScreen';
import UserBookingsScreen from './app/screens/UserBookingsScreen';
import EventScreen from './app/screens/EventScreen';
import CheckoutScreen from './app/screens/CheckoutScreen';
import EventListScreen from './app/screens/EventListScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import commonColor from './native-base-theme/variables/commonColor';
import getTheme from './native-base-theme/components'; 

const RootStackLogin = createAppContainer(
  createStackNavigator(
    {
      Login: {
        screen: LoginScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      Register: {
        screen: RegisterScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      Profile: {
        screen: ProfileScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      About: {
        screen: AboutScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      UserBookings: {
        screen: UserBookingsScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      EditProfile: {
        screen: EditProfileScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      Event: {
        screen: EventScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      Checkout: {
        screen: CheckoutScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
        Events: {
          screen: EventListScreen,
          navigationOptions: {
            headerShown: false,
        
          },
      }
   
    },
    {

      initialRouteName: "Events",

    }))

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.Font,
    });
    this.setState({ isReady: true });
  }
  

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <StyleProvider style={getTheme(commonColor)}>
      <Container>
        <RootStackLogin/>
      </Container>
      </StyleProvider>
    );
  }
}

