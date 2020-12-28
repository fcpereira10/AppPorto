import React from 'react';
import  AppLoading  from 'expo-app-loading';
import { Container, Text } from 'native-base';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import EventScreen from './app/screens/EventScreen';
import EventListScreen from './app/screens/EventListScreen';
import LoginScreen from './app/screens/LoginScreen';
import RegisterScreen from './app/screens/RegisterScreen';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

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
      Event: {
        screen: EventScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
        EventList: {
          screen: EventListScreen,
          navigationOptions: {
            headerShown: false,
          },
      }
   
    },
    {
      initialRouteName: "EventList",
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
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Container>
    
      <RootStackLogin/>
      </Container>
    );
  }
}

