import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Right, Item, Input, Form, Picker, H1} from 'native-base';
import UserService from "../services/UserService";
class Profile extends Component {

  static navigationOptions = {
    title: "Profile",
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: "",
        photo: "",
      },
    };
    this.UserService = new UserService();
  }
  async load() {
    await this.UserService.getUser((res) => {
      if (res.status === 200) {
        const { payload } = res.data;
        console.log(" payload "+payload)
        this.setState({
          user: {
            username: payload.username,
            email: payload.email,
          },
      
        });

      } else console.log("ERRRRRO")
    });
  }

  async componentDidMount() {
    await this.load();
  }

  render() {
    return (
        <Container>
          <Content padder>
          <Card transparent style={styles.card}>
            <CardItem> 
              <Thumbnail large source={require('../assets/Avatar.png')} style={styles.avatar}/>   
            </CardItem>
            <CardItem>
            <H1>@{this.state.user.username}</H1>
            </CardItem>
            <CardItem>
              <Button block style={styles.input} onPress={() => this.props.navigation.navigate("About")}>
                <Text>About</Text>
              </Button>
            </CardItem>
            <CardItem>
              <Button block style={styles.input} onPress={() => this.props.navigation.navigate("UserBookings")}>
                <Text>Bookings</Text>
              </Button>
            </CardItem>
            <CardItem>
              <Button block style={styles.input} onPress={() => this.props.navigation.navigate("EditProfile")}>
                <Text>Edit Profile</Text>
              </Button>
            </CardItem>
            <CardItem>
              <Button block style={styles.input} onPress={() => this.props.navigation.navigate("Login")}>
                <Text>Sign Out</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
        </Container>

    );
  }
}
const styles = StyleSheet.create({
  card: {
    justifyContent: 'center', 
    alignItems: 'center', 
    alignSelf: 'center'
  },
  input: {
    width: '80%'
  },
  avatar: {
    marginBottom: 20,
    height: 150,
    width: 150,
    borderRadius:100,
  },
  notregistered: {
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row'
  },
  register: {
    paddingLeft: 5,
  }
  
  
})
export default withNavigation(Profile);