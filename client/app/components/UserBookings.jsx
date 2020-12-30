import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { withNavigation } from 'react-navigation'
import { Container, Header, Content, Card, CardItem, Thumbnail, Text,ListItem, H1, H3, Button, Icon, Left, Body,Right, Item, Input, Form, Picker, Separator, H2} from 'native-base';
class UserBookings extends Component {

  static navigationOptions = {
    title: "UserBookings",
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
              <Text>December 2020</Text>
              <Card>
              <CardItem header>
                <Text>Booked in December 24th 2020</Text>
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
              <Text>Price paid: 30€</Text>
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
  title: {
    fontWeight: 'bold'
  },
  card: {
    width: '95%',
    alignSelf: 'center'
  },
  price: {
    alignSelf: 'flex-end',
  }
  
})
export default withNavigation(UserBookings);