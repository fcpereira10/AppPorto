import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Content, Card, CardItem, Thumbnail, Text, Button, Item, Input} from 'native-base';
import Spinner from "react-native-loading-spinner-overlay";
import DropdownAlert from "react-native-dropdownalert";
import UserService from "../services/UserService";
class Login extends Component {

  static navigationOptions = {
    title: "Login",
  };
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      spinner: false,
      usernameError:"",
      passwordError:"",
    };
    this.UserService = new UserService();
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ spinner: true });
    
    if (this.state.username.trim() === "") {
        this.setState(() => ({ usernameError: "username required" }));
    }if (this.state.password.trim() === "") {
        this.setState(() => ({ passwordError: "password required" }));
    }
    else if(this.state.username.trim() !== "" && this.state.password.trim() !== ""){
    this.UserService.login(this.state, async (res) => {
      console.log("res");
      if (res.status === 200) {
        console.log("res 2");
        this.props.navigation.navigate("Profile");
      } else {

        this.dropDownAlertRef.alertWithType(
          "error",
          "Error",
          res.response.data.message
        );
      }
      this.setState({ spinner: false });
    });
  }
  }


  render() {
    return (
        <Container>
          <Content padder>
          <Card transparent style={styles.card}>
            <CardItem>
              
              <Thumbnail large source={require('../assets/Avatar.png')} style={styles.avatar}/>
              
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
                <Input placeholder="Username" 
                style={styles.input}
                autoCapitalize = "none"
                onChangeText={(val) => this.setState({ username: val.trim() })} />
                {!!this.state.usernameError && (
                <Text style={{ color: "red" }}>{this.state.usernameError}</Text>)}
              </Item>
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
                <Input placeholder="Password" 
                secureTextEntry={true}
                style={styles.input}
                autoCapitalize = "none"
                onChangeText={(val) => this.setState({ password: val.trim() })} />
                 {!!this.state.passwordError && (
                <Text style={{ color: "red" }}>{this.state.passwordError}</Text>)}
              </Item>
            </CardItem>
            <CardItem>
              <Button block 
              style={styles.input}  
              onPress={(event) => this.onSubmit(event)}>
                <Text>Sign In</Text>
              </Button>
            </CardItem>
            <CardItem style={styles.notregistered}>
                <Text>Don't Have an Account yet?</Text>
                <Button transparent onPress={() => this.props.navigation.navigate("Register")}>
                <Text style={styles.register}>Register</Text>
                </Button>
            </CardItem>
          </Card>
        </Content>
        <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
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
export default withNavigation(Login);