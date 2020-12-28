import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Right, Item, Input, Form, Picker} from 'native-base';
class Login extends Component {

  static navigationOptions = {
    title: "Login",
  };
  constructor(props) {
    super(props);
    this.state = {
      selected: undefined
    };
  }
    onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
        <Container>
          <Content>
            <Thumbnail large source={require('../assets/icon.png')} />

                <Text>Welcome back!</Text>
                
                <Form>
              <Item rounded>
                <Input placeholder='Email' onChangeText={this.handleEmailTextChange} />
              </Item>
              <Item rounded>
                <Input secureTextEntry={true} placeholder='Password' onChangeText={this.handlePasswordTextChange} />
              </Item>
              <Button rounded onPress={this.handleLogin}>
                <Text>Sign In</Text>
              </Button>
              <View style={{ paddingTop: 20, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginTop: 4 }}>
                <Text>Don't have account yet? </Text>
                <TouchableOpacity>
                  <Text onPress={() => this.props.navigation.navigate('Register')}>Register</Text>
                </TouchableOpacity>
              </View>
            </Form>
          </Content>
        </Container>

    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: "#464646",
    paddingBottom: 15,
  },
})
export default withNavigation(Login);