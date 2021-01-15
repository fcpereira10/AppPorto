import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
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
import UserService from '../services/UserService'
import Spinner from 'react-native-loading-spinner-overlay'
import DropdownAlert from 'react-native-dropdownalert'
import ProfileEdition from './illustrations/ProfileEdition'
import HeaderBar from './HeaderBar'

class EditProfile extends Component {
  static navigationOptions = {
    title: 'EditProfile',
  }
  constructor (props) {
    super(props)
    this.state = {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      emailError: '',
      usernameError: '',
      passwordError: '',
      confirmPasswordError: '',
      spinner: true,
    }
    this.UserService = new UserService()
  }
  async componentDidMount () {
    await this.UserService.getUser(async (res) => {
      if (res.status === 200) {
        const {payload} = res.data
        console.log(' payload ' + payload)
        this.setState({
          username: payload.username,
          email: payload.email,
          password: '',
          confirmPassword: '',
          spinner: false,
        })
      } else console.log('ERRRRRO')
    })
  }
  onSubmit (event) {
    console.log("on submit ")
    event.preventDefault()
    this.setState({spinner: true})
    if (this.state.email.trim() === '') {
      this.setState(() => ({emailError: 'email required'}))
    }
    if (this.state.username.trim() === '') {
      this.setState(() => ({usernameError: 'username required'}))
    }
    if (this.state.password.trim() === '') {
      this.setState(() => ({passwordError: 'password required'}))
    }if (this.state.confirmPassword.trim() === '' || this.state.password.trim() !== this.state.confirmPassword.trim()) {
      this.setState(() => ({confirmPasswordError: 'passwords don\'t match'}))
    } 
      if (
      this.state.email.trim() !== '' &&
      this.state.username.trim() !== '' &&
      this.state.password.trim() !== '' && this.state.password.trim() === this.state.confirmPassword.trim()
    )
    
      this.UserService.edit({email: this.state.email, username: this.state.username, password: this.state.password}, async res => {
        if (res.status === 200) {
          const {username, email, password} = this.state
          this.setState({
            username,
            email,
            password,
          })

          this.dropDownAlertRef.alertWithType(
          'success',
            'Success',
            'Changes saved',
          )
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
        <HeaderBar/>
          <Card transparent style={styles.card}>
            <CardItem>
              <ProfileEdition style={styles.avatar}/>
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
                <Input
                  autoCapitalize='none'
                  placeholder='Email'
                  onChangeText={email => this.setState({email, emailError: ''})}
                  value={this.state.email}
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
                  onChangeText={username =>
                    this.setState({username, usernameError: ''})
                  }
                  value={this.state.username}
                />
                {!!this.state.usernameError && (
                  <Text style={{color: 'red'}}>{this.state.usernameError}</Text>
                )}
              </Item>
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
                <Input
                  secureTextEntry={true}
                  placeholder='Password'
                  onChangeText={password =>
                    this.setState(() => ({password, passwordError: ''}))
                  }
                  value={this.state.password}
                />
                {!!this.state.passwordError && (
                  <Text style={{color: 'red'}}>{this.state.passwordError}</Text>
                )}
              </Item>
            </CardItem>
            <CardItem style={styles.input}>
              <Item>
                <Input
                  secureTextEntry={true}
                  placeholder='Confirm Password'
                  onChangeText={confirmPassword =>
                    this.setState(() => ({
                      confirmPassword,
                      confirmPasswordError: '',
                    }))
                  }
                  value={this.state.confirmPassword}
                />
                {!!this.state.confirmPasswordError && (
                  <Text style={{color: 'red'}}>
                    {this.state.confirmPasswordError}
                  </Text>
                )}
              </Item>
            </CardItem>
            <CardItem>
              <Button
                block
                style={styles.input}
                onPress={event => this.onSubmit(event)}>
                <Text>Save Changes</Text>
              </Button>
            </CardItem>
          </Card>
        </Content>
        <DropdownAlert ref={(ref) => (this.dropDownAlertRef = ref)} />
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
export default withNavigation(EditProfile)
