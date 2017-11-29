import React from "react";
import { StatusBar } from "react-native";
import { Container, Header, Title, Left, Icon, Right, Button, Body, Content,Text, Card, CardItem } from "native-base";
export default class HomeScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}>
              <Icon name="menu" />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title>StairsClimb Challenge</Title>
          </Body>
          <Right />
        </Header>
        <Content padder>
          <Button full rounded primary
            style={{ marginTop: 10 }}
            onPress={() => this.props.navigation.navigate("BeaconsScreen")}>
            <Text>Goto Beacons</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}