import About from '../components/About'
import React from 'react'
import { Container, Content } from 'native-base'
import { withNavigation } from 'react-navigation'
class AboutScreen extends React.Component {
  constructor(props){
    super(props);
  }
  render () {
    return (
      <Container>
        <Content>
          <About />
        </Content>
      </Container>
    )
  }
}

export default withNavigation(AboutScreen);