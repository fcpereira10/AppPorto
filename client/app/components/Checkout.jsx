import React, {Component} from 'react'
import {StyleSheet, Image} from 'react-native'
import {withNavigation} from 'react-navigation'
import {
  Container,
  Content,
  Card,
  CardItem,
  Text,
  H1,
  Button,
  Icon,
  Body,
  Form,
  Picker,
} from 'native-base'
import EventService from '../services/EventService'
import Spinner from 'react-native-loading-spinner-overlay'
import Moment from 'moment'
class Checkout extends Component {
  static navigationOptions = {
    title: 'Checkout',
  }
  constructor (props) {
    super(props)
    this.EventService = new EventService()
    this.state = {
      selected: '1',
      spinner: true,
      event: {
        title: '',
        date: '',
        location: '',
        eventId: '',
        description: '',
        price: '',
        categoryName: '',
      },
      total:"",
    }
  }
  async componentDidMount () {
    const {params} = this.props.navigation.state
    const eventId = params ? params.eventId : null
    await this.EventService.getEvent({eventId}, async res => {
      
      if (res.status == 200) {
        const {data} = res
      
        this.setState({
          spinner: false,
          event: data,
          total: (parseFloat(this.state.selected) * parseFloat(data.price)).toFixed(2),
        })
      }
    })
  }
  onValueChange (value) {
    const {price} = this.state.event;
    this.setState({
      selected: value,
      total: value *price,
    })
  }

  render () {
    const {spinner, event, total} = this.state;
    Moment.locale('en')
    var dt = this.state.event.date
    return (
      <Container>
        <Spinner
          visible={this.state.spinner}
          textContent={'Loading...'}
          textStyle={styles.spinnerTextStyle}
        />
        {!spinner && (
          <Content style={styles.card}>
            <Card>
              <CardItem header>
                <Text>Event Selected</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Image
                    source={require('../assets/WalkingTour.jpg')}
                    style={styles.img}
                  />
                  <H1 style={styles.title}>{event.title}</H1>
                  <Text>{Moment(dt).format('dd MM yyyy HH:mm')}</Text>
                </Body>
              </CardItem>
              <CardItem footer>
                <Text>Price per participant: €{event.price}</Text>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Text>Participants</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Form>
                    <Picker
                      mode='dialog'
                      iosHeader='Select the number of participants'
                      iosIcon={<Icon name='chevron-down-outline' />}
                      style={{width: undefined}}
                      selectedValue={this.state.selected}
                      onValueChange={this.onValueChange.bind(this)}>
                      <Picker.Item label='1 Participant' value='1' />
                      <Picker.Item label='2 Participants' value='2' />
                      <Picker.Item label='3 Participants' value='3' />
                      <Picker.Item label='4 Participants' value='4' />
                      <Picker.Item label='5 Participants' value='5' />
                    </Picker>
                  </Form>
                </Body>
              </CardItem>
            </Card>
            <Card>
              <CardItem header>
                <Text>Total €{total}</Text>
              </CardItem>
              <CardItem>
                <Body>
                  <Button primary>
                    <Text>Paypal</Text>
                  </Button>
                </Body>
              </CardItem>
            </Card>
          </Content>
        )}
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  img: {
    resizeMode: 'cover',
    height: 150,
    width: '100%',
  },
  card: {
    width: '95%',
    alignSelf: 'center',
  },
  title: {
    fontWeight: 'bold',
  },
  price: {
    alignSelf: 'flex-end',
  },
})
export default withNavigation(Checkout)
