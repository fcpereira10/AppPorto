import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body,Right, Item, Input, Form, Picker, H2} from 'native-base';
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
          <Content >
          <View style={styles.topview}>
            <Thumbnail large source={require('../assets/icon.png')} style={styles.logo}/>

                <H2>Welcome back!</H2>
            </View>
            <Form style={styles.form}>
              <Item rounded>
                <Input placeholder='Username' />
              </Item>
              <Item rounded>
                <Input secureTextEntry={true} placeholder='Password' onChangeText={this.handlePasswordTextChange} />
              </Item>
              <Button rounded onPress={this.handleLogin}>
                <Text>Sign In</Text>
              </Button>
              <View style={styles.viewdont}>
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
  logo: {
    marginBottom: 20,
    height: 150,
    width: 150,
    borderRadius:100
  },
  form: {
    alignItems: 'center',
    
  },
  topview: {
    paddingTop: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingBottom: 20 
  },
  viewdont: {
    paddingTop: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    flexDirection: 'row', 
    marginTop: 4
  },
})
export default withNavigation(Login);