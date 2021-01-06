import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text,ListItem, H1, H3, Button, Icon, Left, Body,Right, Item, Input, Form, Picker, Separator, H2} from 'native-base';
class Checkout extends Component {

  static navigationOptions = {
    title: "Checkout",
  };
  constructor(props) {
    super(props);
    this.state = {
        selected: "key0"
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
            <Content style={styles.card}>
              <Card>
              <CardItem header>
                <Text>Event Selected</Text>
              </CardItem>
              <CardItem>
                <Body>
                <Image source={require('../assets/WalkingTour.jpg')} style={styles.img}/>
                        <H1 style={styles.title}>
                        Porto Walking Tour
                        </H1>
                        <Text>
                            March 11th 2021 - 14h00
                        </Text>
                        
                </Body>
              </CardItem>
              <CardItem footer>
              <Text>Price per participant: 15€</Text>
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
                        mode="dialog"
                        iosHeader="Select the number of participants"
                        iosIcon={<Icon name="chevron-down-outline" />}
                        style={{ width: undefined }}
                        selectedValue={this.state.selected}
                        onValueChange={this.onValueChange.bind(this)}
                        >
                        <Picker.Item label="1 Participant" value="key0" />
                        <Picker.Item label="2 Participants" value="key1" />
                        <Picker.Item label="3 Participants" value="key2" />
                        <Picker.Item label="4 Participants" value="key3" />
                        <Picker.Item label="5 Participants" value="key4" />
                        </Picker>
                    </Form>
                        
                </Body>
              </CardItem>
          
            </Card>
            <Card>
              <CardItem header>
                <Text>Total</Text>
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
        </Container>

    );
  }
}
const styles = StyleSheet.create({

  img: {
    resizeMode: "cover",
    height: 150,
    width: '100%'
    
  },
  card: {
    width: '95%',
    alignSelf: 'center'
  },
  title: {
    fontWeight: 'bold'
  },
  price: {
    alignSelf: 'flex-end',
  }
  
})
export default withNavigation(Checkout);