'use strict';

 import React, {
   Component
 } from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   ListView,
   View,
   DeviceEventEmitter
 }                     from 'react-native';
 import { Container, Header, Title, Left, Right, Icon, Button, Body, Content, } from "native-base";

 import RNSensors from 'react-native-sensors';
 const { Accelerometer, Gyroscope } = RNSensors;
 const accelerationObservable = new Accelerometer({
   updateInterval: 100, // defaults to 100ms
 });
 
 const gyroscopeObservable = new Gyroscope({
   updateInterval: 2000, // defaults to 100ms
 });
 


 export default class GyroscopeAccelerometerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      acceleration: {
        x: 'unknown',
        y: 'unknown',
        z: 'unknown',
      },
      gyroscope: {
        x: 'unknown',
        y: 'unknown',
        z: 'unknown',
      }
    };
  }

  componentWillMount() {
    accelerationObservable
      .subscribe(acceleration => this.setState({
        acceleration,
      }));

    gyroscopeObservable
      .subscribe(gyroscope => this.setState({
        gyroscope,
      }));
  }

  componentWillUnmount() {
    accelerationObservable.stop();
    gyroscopeObservable.stop();
  }

   render() {
    const {
      // acceleration,
      gyroscope,
    } = this.state;

     return (
       <View style={styles.row}>
         {/* <Text>
         Acceleration:
         </Text>
         <Text>
         {acceleration.x + '/' + acceleration.y + '/' + acceleration.z}
         </Text> */}
         <Text>
         Gyroscope:
         </Text>
         <Text>
         {gyroscope.x + '/' + gyroscope.y + '/' + gyroscope.z}
         </Text>
       </View>
     );
   }
 }

 const styles = StyleSheet.create({
   container: {
     flex: 1,
     paddingTop: 60,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: '#F5FCFF'
   },
   btleConnectionStatus: {
     // fontSize: 20,
     paddingTop: 20
   },
   headline: {
     fontSize: 20,
     paddingTop: 20
   },
   row: {
     padding: 8,
     paddingBottom: 16
   },
   smallText: {
     fontSize: 11
   }
 });