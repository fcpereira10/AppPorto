import React, {Component} from 'react'
import { StyleSheet} from 'react-native'
import {withNavigation} from 'react-navigation'
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Item,
  Input,
} from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay'
import DropdownAlert from 'react-native-dropdownalert'
import UserService from '../services/UserService'

class Register extends Component {
  static navigationOptions = {
    title: 'Register',
  }
  constructor (props) {
    super(props)
    this.state = {
      spinner: false,
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      emailError: '',
      usernameError: '',
      passwordError: '',
    }
    this.UserService = new UserService();
  }
  onSubmit (event) {
    console.log("on submit")
    event.preventDefault()
    this.setState({spinner: true})
    if (this.state.email.trim() === "") {
      this.setState(() => ({ emailError: "email required" }));
    }if (this.state.username.trim() === "") {
        this.setState(() => ({ usernameError: "username required" }));
    }if (this.state.password.trim() === "") {
        this.setState(() => ({ passwordError: "password required" }));
    } else if (this.state.email.trim() !== "" && this.state.username.trim() !== "" && this.state.password.trim() !== "" )
    this.UserService.add(this.state, async res => {
      if (res.status === 200) {
        const {username, password} = this.state
        await this.UserService.login({username: username, password}, response => {
          if (res.status === 200) {
            this.props.navigation.navigate('Profile')
          }
        })
      } else {
        if (res.response != undefined && res.response.status == 406) {
          this.dropDownAlertRef.alertWithType(
            'error',
            'Error',
            res.response.data.error,
          )
        } else {
          if (res.response != undefined && res.response.status == 422) {
            this.dropDownAlertRef.alertWithType(
              'error',
              'Error',
              res.response.data.errors[0].msg,
            )
          }
        }
      }
      this.setState({spinner: false})
    })
  }

  render () {
    return (
      <Container>
        <Content padder>
          <Card transparent style={styles.card}>
            <CardItem>
              <Thumbnail
                large
                source={require('../assets/Avatar.png')}
                style={styles.avatar}
              />
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
                <Input
                  autoCapitalize='none'
                  placeholder='Email'
                  onChangeText={email => this.setState({email})}
                />
                {!!this.state.emailError && (
                  <Text style={{color: 'red'}}>{this.state.emailError}</Text>
                )}
              </Item>
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
                <Input
                  autoCapitalize='none'
                  placeholder='Username'
                  onChangeText={username => this.setState({username})}
                />
                {!!this.state.usernameError && (
                  <Text style={{color: 'red'}}>{this.state.usernameError}</Text>
                )}
              </Item>
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
                <Input
                  autoCapitalize = "none"
                  secureTextEntry={true}
                  placeholder='Password'
                  onChangeText={password => this.setState(() => ({password}))}
                />
                {!!this.state.passwordError && (
                  <Text style={{color: 'red'}}>{this.state.passwordError}</Text>
                )}
              </Item>
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
                <Input
                  autoCapitalize = "none"
                  secureTextEntry={true}
                  placeholder='Confirm Password'
                  onChangeText={confirmPassword =>
                    this.setState(() => ({confirmPassword}))
                  }
                />
                {!!this.state.passwordError && (
                  <Text style={{color: 'red'}}>{this.state.passwordError}</Text>
                )}
              </Item>
            </CardItem>
            <CardItem>
              <Button
                block
                style={styles.input}
                onPress={event => this.onSubmit(event)}>
                <Text>Sign up</Text>
              </Button>
            </CardItem>
            <CardItem style={styles.notregistered}>
              <Text>Already Have an Account?</Text>
              <Button
                transparent
                onPress={() => this.props.navigation.navigate('Login')}>
                <Text style={styles.register}>Login</Text>
              </Button>
            </CardItem>
          </Card>
          <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
        </Content>
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  input: {
    width: '80%',
  },
  avatar: {
    marginBottom: 20,
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  notregistered: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  register: {
    paddingLeft: 5,
  },
})
export default withNavigation(Register)
