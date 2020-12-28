import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Right, Item, Input, Form, Picker, H2} from 'native-base';
class Login extends Component {

  static navigationOptions = {
    title: "Login",
  };

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
                <Input placeholder="Username" />
              </Item>
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
                <Input secureTextEntry={true} placeholder="Password"  onChangeText={this.handlePasswordTextChange}/>
              </Item>
            </CardItem>
            <CardItem>
              <Button block style={styles.input}>
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