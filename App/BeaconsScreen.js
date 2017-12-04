'use strict';

 import React, {
   Component
 }                     from 'react';
 import {
   AppRegistry,
   StyleSheet,
   Text,
   ListView,
   View,
   DeviceEventEmitter
 }                     from 'react-native';
 import { Container, Header, Title, Left, Right, Icon, Button, Body, Content, } from "native-base";
 import Beacons        from 'react-native-beacons-manager';
//  import moment   from 'moment';

 /**
  * uuid of YOUR BEACON (change to yours)
  * @type {String} uuid
  */
  //const UUID = 'baae3e10-504e-11e4-916c-0800200c9a66';
 const UUID = 'f7826da6-4fa2-4e98-8024-bc5b71e0893e';
 const REGION1 = "REGION1";
 const TIME_FORMAT = 'MM/DD/YYYY HH:mm:ss';
 const region = {
  identifier: REGION1,
  uuid: UUID,
  major: 1,
  minor: 2
};

 export default class BeaconsScreen extends Component {
     // will be set as a reference to "beaconsDidRange" event:
  beaconsDidRangeEvent = null;
  // will be set as a reference to "regionDidEnter" event:
  regionDidEnterEvent = null;
  regionDidExitEvent = null;

   constructor(props) {
     super(props);
     // Create our dataSource which will be displayed in the ListView
     var ds = new ListView.DataSource({
       rowHasChanged: (r1, r2) => r1 !== r2 }
     );
     this.state = {
       // region information
       uuidRef: UUID,
       // React Native ListView datasource initialization
       dataSource: ds.cloneWithRows([]),
       regionEnterDatasource: ds.cloneWithRows([]),
       regionExitDatasource: ds.cloneWithRows([])
     };
   }

   componentWillMount() {
     //
     // ONLY non component state aware here in componentWillMount
     //
     Beacons.detectIBeacons();

     const uuid = this.state.uuidRef;


     // Monitor beacons inside the region
    //  Beacons
    //  .startMonitoringForRegion(region) // or like  < v1.0.7: .startRangingBeaconsInRegion(identifier, uuid)
    //  .then(() => console.log('Beacons monitoring started succesfully'))
    //  .catch(error => console.log(`Beacons monitoring not started, error: ${error}`));

     Beacons
       .startRangingBeaconsInRegion(
        REGION1,
         null
       )
       .then(
         () => console.log('Beacons ranging started succesfully')
       )
       .catch(
         error => console.log(`Beacons ranging not started, error: ${error}`)
       );
   }

   componentWillUnmount() {

    Beacons
    .stopRangingBeaconsInRegion(REGION1) 
    .then(() => console.log('Beacons ranging stopped succesfully'))
    .catch(error => console.log(`Beacons ranging not stopped, error: ${error}`));

 
    // stop monitoring beacons:
    // Beacons
    // .stopMonitoringForRegion(region) // or like  < v1.0.7: .stopMonitoringForRegion(identifier, uuid)
    // .then(() => console.log('Beacons monitoring stopped succesfully'))
    // .catch(error => console.log(`Beacons monitoring not stopped, error: ${error}`));
 
    // // remove beacons events we registered at componentDidMount
    // this.regionDidEnterEvent.remove();
    // this.regionDidExitEvent.remove();
  }

   componentDidMount() {
     //
     // component state aware here - attach events
     //
     // Ranging:
     this.beaconsDidRange = DeviceEventEmitter.addListener(
       'beaconsDidRange',
       (data) => {
         console.log(data);
         this.setState({
           dataSource: this.state.dataSource.cloneWithRows(data.beacons)
         });
       }
     );

    // this.regionDidEnterEvent =  DeviceEventEmitter.addListener(
    //   'regionDidEnter',
    //   ({ identifier, uuid, minor, major }) => {
    //     console.log('monitoring - regionDidEnter data: ', { identifier, uuid, minor, major });
    //     const time = moment().format(TIME_FORMAT);
    //     this.setState({ regionEnterDatasource: this.state.regionEnterDatasource.cloneWithRows([{ identifier, uuid, minor, major, time }]) });
    //   }
    // );
 
    // this.regionDidExitEvent =  DeviceEventEmitter.addListener(
    //   'regionDidExit',
    //   ({ identifier, uuid, minor, major }) => {
    //     console.log('monitoring - regionDidExit data: ', { identifier, uuid, minor, major });
    //     const time = moment().format(TIME_FORMAT);
    //    this.setState({ regionExitDatasource: this.state.regionExitDatasource.cloneWithRows([{ identifier, uuid, minor, major, time }]) });
    //   }
    // );
   }


   render() {
     const { dataSource, regionEnterDatasource, regionExitDatasource } =  this.state;

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
        <Right/>
      </Header>
      <Content padder>
       <View style={styles.container}>
       {
        dataSource.getRowCount() > 0 && (         <Text style={styles.headline}>
           All beacons in the area
         </Text>)

       }
       {
        dataSource.getRowCount() > 0 && (<ListView
          dataSource={ dataSource }
          enableEmptySections={ true }
          renderRow={(rowData) => this.renderRow(rowData)}
        />)

       }


       {
        regionEnterDatasource.getRowCount() > 0 && (         <Text style={styles.headline}>
           All beacons entered
         </Text>)

       }
       {
        regionEnterDatasource.getRowCount() > 0 && (<ListView
          dataSource={ regionEnterDatasource }
          enableEmptySections={ true }
          renderRow={(rowData) => this.renderRow(rowData)}
        />)

       }
              {
        regionExitDatasource.getRowCount() > 0 && (         <Text style={styles.headline}>
           All beacons exited
         </Text>)

       }
       {
        regionExitDatasource.getRowCount() > 0 && (<ListView
          dataSource={ regionExitDatasource }
          enableEmptySections={ true }
          renderRow={(rowData) => this.renderRow(rowData)}
        />)

       }
       </View>
       </Content>
      </Container>
     );
   }

   renderRow(rowData) {
     return (
       <View style={styles.row}>
         <Text style={styles.smallText}>
           UUID: {rowData.uuid ? rowData.uuid  : 'NA'}
         </Text>
         <Text style={styles.smallText}>
           Major: {rowData.major ? rowData.major : 'NA'}
         </Text>
         <Text style={styles.smallText}>
           Minor: {rowData.minor ? rowData.minor : 'NA'}
         </Text>
         <Text>
           RSSI: {rowData.rssi ? rowData.rssi : 'NA'}
         </Text>
         <Text>
           Proximity: {rowData.proximity ? rowData.proximity : 'NA'}
         </Text>
         <Text>
           Distance: {rowData.distance ? rowData.distance.toFixed(2) : 'NA'}m
         </Text>
         <Text>
           Time: {rowData.time ? rowData.time : 'NA'}m
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