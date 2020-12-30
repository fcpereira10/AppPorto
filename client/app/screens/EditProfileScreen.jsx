import EditProfile from '../components/EditProfile'
import React from 'react'
import { Container, Content } from 'native-base'
import { withNavigation } from 'react-navigation'
class EditProfileScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container>
        <Content>
          <EditProfile />
        </Content>
      </Container>
    )
  }
}

export default withNavigation(EditProfileScreen);