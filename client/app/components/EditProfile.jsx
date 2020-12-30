import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Right, Item, Input, Form, Picker, H2} from 'native-base';
class EditProfile extends Component {

  static navigationOptions = {
    title: "EditProfile",
  };
  constructor(props) {
    super(props);
    this.state = {email: "",username: "",password: "",confirmPassword:"", emailError: "", usernameError: "", passwordError: ""};
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
                <Input placeholder="Email" onChangeText={email => this.setState({ email })}
                value={"fcpereira12@hotmail.com"}/>
          {!!this.state.emailError && (
        
          <Text style={{ color: "red" }}>{this.state.emailError}</Text>
        )}
              </Item>
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
                <Input placeholder="Username" onChangeText={username=> this.setState({ username })}
                value={"fcpereira10"}/>
          {!!this.state.usernameError && (
          <Text style={{ color: "red" }}>{this.state.usernameError}</Text>
        )}
              </Item>
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
                <Input secureTextEntry={true} placeholder="Password" onChangeText={password =>  this.setState(() => ({ password }))}
                value={"password"}/>
          {!!this.state.passwordError && (
          <Text style={{ color: "red" }}>{this.state.passwordError}</Text>
        )}
              </Item>
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
              <Input secureTextEntry={true} placeholder="Confirm Password" onChangeText={confirmPassword =>  this.setState(() => ({ confirmPassword }))}
               value={"password"}/>
          {!!this.state.passwordError && (
          <Text style={{ color: "red" }}>{this.state.passwordError}</Text>
        )}
              </Item>
            </CardItem>
            <CardItem>
              <Button block style={styles.input} onPress={() => {
            if (this.state.email.trim() === "") {
              this.setState(() => ({ emailError: "email required." }));
            }if (this.state.username.trim() === "") {
                this.setState(() => ({ usernameError: "username required." }));
            }if (this.state.password.trim() === "") {
                this.setState(() => ({ passwordError: "password required." }));
            }
          }}>
                <Text>Save Changes</Text>
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
export default withNavigation(EditProfile);