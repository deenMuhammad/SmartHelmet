import React, { Component } from 'react';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Speedometer from 'react-native-speedometer-chart';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableHighlight,
  NativeAppEventEmitter,
  NativeEventEmitter,
  NativeModules,
  Platform,
  PermissionsAndroid,
  ListView,
  ScrollView,
  AppState,
  Image,
  Dimensions,
  ActivityIndicator
} from 'react-native';
import BleManager from 'react-native-ble-manager';

const window = Dimensions.get('window');
const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

const BleManagerModule = NativeModules.BleManager;
const bleManagerEmitter = new NativeEventEmitter(BleManagerModule);

export default class App extends Component {
  constructor(){
    super()

    this.state = {
      scanning:false,
      peripherals: new Map(),
      appState: '',
      peripheralsDisabled: false,
      connected: false,
      name: '',
      currentSpeed: 0,
      id: '',
      lightOn: false,
    }

    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.handleUpdateValueForCharacteristic = this.handleUpdateValueForCharacteristic.bind(this);
    this.handleDisconnectedPeripheral = this.handleDisconnectedPeripheral.bind(this);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
  }

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
    
    BleManager.start({showAlert: true});
    

    this.handlerDiscover = bleManagerEmitter.addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
    this.handlerStop = bleManagerEmitter.addListener('BleManagerStopScan', this.handleStopScan );
    this.handlerDisconnect = bleManagerEmitter.addListener('BleManagerDisconnectPeripheral', this.handleDisconnectedPeripheral );
    this.handlerUpdate = bleManagerEmitter.addListener('BleManagerDidUpdateValueForCharacteristic', this.handleUpdateValueForCharacteristic );



    if (Platform.OS === 'android' && Platform.Version >= 23) {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
            if (result) {
              console.log("Permission is OK");
            } else {
              PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION).then((result) => {
                if (result) {
                  console.log("User accept");
                } else {
                  console.log("User refuse");
                }
              });
            }
      });
    }
    setInterval(()=>{this.setState({currentSpeed: this.state.currentSpeed+1})},1000);
  }

  handleAppStateChange(nextAppState) {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('App has come to the foreground!')
      BleManager.getConnectedPeripherals([]).then((peripheralsArray) => {
        console.log('Connected peripherals: ' + peripheralsArray.length);
      });
    }
    this.setState({appState: nextAppState});
  }

  componentWillUnmount() {
    this.handlerDiscover.remove();
    this.handlerStop.remove();
    this.handlerDisconnect.remove();
    this.handlerUpdate.remove();
  }

  handleDisconnectedPeripheral(data) {
    let peripherals = this.state.peripherals;
    let peripheral = peripherals.get(data.peripheral);
    if (peripheral) {
      peripheral.connected = false;
      peripherals.set(peripheral.id, peripheral);
      this.setState({peripherals});
    }
    console.log('Disconnected from ' + data.peripheral);
  }

  handleUpdateValueForCharacteristic(data) {
    console.log('Received data from ' + data.peripheral + ' characteristic ' + data.characteristic, data.value);
  }

  handleStopScan() {
    console.log('Scan is stopped');
    this.setState({ scanning: false });
  }

  startScan() {
    if (!this.state.scanning) {
      this.setState({peripherals: new Map()});
      BleManager.scan([], 5, true).then((results) => {
        console.log('Scanning...');
        this.setState({scanning:true});
      });
    }
  }

  retrieveConnected(){
    BleManager.getConnectedPeripherals([]).then((results) => {
      if (results.length == 0) {
        console.log('No connected peripherals')
      }
      console.log(results);
      var peripherals = this.state.peripherals;
      for (var i = 0; i < results.length; i++) {
        var peripheral = results[i];
        peripheral.connected = true;
        peripherals.set(peripheral.id, peripheral);
        this.setState({ peripherals });
      }
    });
  }

  handleDiscoverPeripheral(peripheral){
    var peripherals = this.state.peripherals;
    if (!peripherals.has(peripheral.id)){
      console.log('Got ble peripheral', peripheral);
      peripherals.set(peripheral.id, peripheral);
      this.setState({ peripherals })
    }
  }

  test(peripheral) {
    if (peripheral){
      if (peripheral.connected){
        BleManager.disconnect(peripheral.id);
        this.setState({connected: false, name: '', id: ''});
      }else{
        BleManager.connect(peripheral.id).then(() => {
          let peripherals = this.state.peripherals;
          let p = peripherals.get(peripheral.id);
          if (p) {
            p.connected = true;
            peripherals.set(peripheral.id, p);
            this.setState({peripherals});
          }
          console.log('Connected to ' + peripheral.id);
          this.setState({connected: true, id: peripheral.id});
          if(peripheral.name!=null){
            this.setState({name: peripheral.name});
          }
          else{
            this.setState({name: 'Unknown'});
          }

          // setTimeout(() => {

          //   /* Test read current RSSI value
          //   BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
          //     console.log('Retrieved peripheral services', peripheralData);
          //     BleManager.readRSSI(peripheral.id).then((rssi) => {
          //       console.log('Retrieved actual RSSI value', rssi);
          //     });
          //   });*/

          //   // Test using bleno's pizza example
          //   // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
          //     var service = '13333333-3333-3333-3333-333333333337';
          //     var bakeCharacteristic = '13333333-3333-3333-3333-333333330003';
          //     var crustCharacteristic = '13333333-3333-3333-3333-333333330001';

          //     setTimeout(() => {
          //       BleManager.startNotification(peripheral.id, service, bakeCharacteristic).then(() => {
          //         console.log('Started notification on ' + peripheral.id);
          //         setTimeout(() => {
          //           BleManager.write(peripheral.id, service, crustCharacteristic, [1]).then(() => {
          //             console.log('Writed NORMAL crust');
          //             BleManager.write(peripheral.id, service, bakeCharacteristic, [1,80]).then(() => {
          //               console.log('Writed 351 temperature, the pizza should be BAKED');
          //               /*
          //               var PizzaBakeResult = {
          //                 HALF_BAKED: 0,
          //                 BAKED:      1,
          //                 CRISPY:     2,
          //                 BURNT:      3,
          //                 ON_FIRE:    4
          //               };*/
          //             });
          //           });

          //         }, 500);
          //       }).catch((error) => {
          //         console.log('Notification error', error);
          //       });
          //     }, 200);

          // }, 900);
        }).catch((error) => {
          console.log('Connection error', error);
        });
      }
    }
  }

  LightStop(id){
    var Buffer = require('buffer/').Buffer 
            setTimeout(() => {

            /* Test read current RSSI value
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);
              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
              });
            });*/

            // Test using bleno's pizza example
            // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
              var service = 'ea87e794-ec03-11e8-8eb2-f2801f1b9fd1';
              var stopCharacteristic = 'ea87ecda-ec03-11e8-8eb2-f2801f1b9fd1';

              setTimeout(() => {
                BleManager.read(id, service, stopCharacteristic)
                .then((readData) => {
                  // Success code
                  console.log('Read: ' + readData);
               
                  // const buffer = Buffer.Buffer.from(readData);    //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
                  // const sensorData = buffer.readUInt8(1, true);
                  alert('Stop Button is pressed and return data is ' + readData)
                })
                .catch((error) => {
                  // Failure code
                  console.log(error);
                });
              }, 200);

          }, 900);
  }

  LightRight(id){
    var Buffer = require('buffer/').Buffer 
            setTimeout(() => {

            /* Test read current RSSI value
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);
              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
              });
            });*/

            // Test using bleno's pizza example
            // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
              var service = 'ea87e794-ec03-11e8-8eb2-f2801f1b9fd1';
              var turnRightCharacteristic = 'ea87eba4-ec03-11e8-8eb2-f2801f1b9fd1';

              setTimeout(() => {
                BleManager.read(id, service, turnRightCharacteristic)
                .then((readData) => {
                  // Success code
                  console.log('Read: ' + readData);
               
                  // const buffer = Buffer.Buffer.from(readData);    //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
                  // const sensorData = buffer.readUInt8(1, true);
                  alert('Right Button is pressed and return data is ' + readData)
                })
                .catch((error) => {
                  // Failure code
                  console.log(error);
                });
              }, 200);

          }, 900);
  }
  LightLeft(id){
    var Buffer = require('buffer/').Buffer 
            setTimeout(() => {

            /* Test read current RSSI value
            BleManager.retrieveServices(peripheral.id).then((peripheralData) => {
              console.log('Retrieved peripheral services', peripheralData);
              BleManager.readRSSI(peripheral.id).then((rssi) => {
                console.log('Retrieved actual RSSI value', rssi);
              });
            });*/

            // Test using bleno's pizza example
            // https://github.com/sandeepmistry/bleno/tree/master/examples/pizza
              var service = 'ea87e794-ec03-11e8-8eb2-f2801f1b9fd1';
              var turnLeftCharacteristic = 'ea87ea50-ec03-11e8-8eb2-f2801f1b9fd1';

              setTimeout(() => {
                BleManager.read(id, service, turnLeftCharacteristic)
                .then((readData) => {
                  // Success code
                  console.log('Read: ' + readData);
               
                  // const buffer = Buffer.Buffer.from(readData);    //https://github.com/feross/buffer#convert-arraybuffer-to-buffer
                  // const sensorData = buffer.readUInt8(1, true);
                  alert('Left Button is pressed and return data is ' + readData)
                })
                .catch((error) => {
                  // Failure code
                  console.log(error);
                });
              }, 200);

          }, 900);
  }

  create_Bond(peripheral){
    BleManager.createBond(peripheral.id)
    .then(() => {
      alert('createBond success or there is already an existing one');
    })
    .catch(() => {
      alert('fail to bond');
      this.setState({peripheralsDisabled: false});
    })
  }

  render() {
    const list = Array.from(this.state.peripherals.values());
    const dataSource = ds.cloneWithRows(list);


    return (
        <ImageBackground source = {require('./../../img/background.jpg')} style={{width: '100%', height : '100%'}}>
      <View style={styles.container}>
      <View style={{display: this.state.connected?'none':'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <TouchableHighlight style={[styles.button,{marginTop: 40}]} onPress={() => this.startScan() }>
        {this.state.scanning ? <Image style={[styles.image, {width: '80%', height: '100%'}]} source={require('./../../img/bluetooth_on.gif')} /> :<Image style={styles.image} source={require('./../../img/bluetooth_off.png')} /> }
        </TouchableHighlight>
        <TouchableHighlight style={[styles.button,{marginTop: 40}]} onPress={() => this.retrieveConnected() }>
          <Image source={require('../../img/ble_connected.png')} style={styles.image} />
        </TouchableHighlight>
        </View>
        <View style={{display: this.state.connected?'flex':'none', marginTop: 8, justifyContent: 'center' , alignItems: 'center'}}>
        <TouchableHighlight style={{marginTop: 0,margin: 20, padding:20, backgroundColor:'#ccc'}} onPress={() => {BleManager.disconnect(this.state.id);
        this.setState({connected: false, name: '', id: ''});} }>
          <Text><FontAwesome color='blue'>{Icons.bluetooth}</FontAwesome>The Device Connected to : <Text style={{color:'red'}}>{this.state.name}</Text>.(press to disconnect)</Text>
        </TouchableHighlight>
        <View style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
        <TouchableHighlight style={[styles.button,{marginTop: 0, backgroundColor: 'white'}]} onPress={() => {alert("Under Construction")} }>
          <Image source={require('../../img/heartbeat.gif')} style={styles.image} />
        </TouchableHighlight>
        <TouchableHighlight style={[styles.button,{marginTop: 0}]} disabled={true} >
        <Speedometer
            value={this.state.currentSpeed}
            totalValue={50}
            size={180}
            outerColor="#d3d3d3"
            showText
            text="50.00"
            textStyle={{ color: 'green' }}
            showLabels
            labelStyle={{ color: 'blue' }}
            showPercent
            percentStyle={{ color: 'red' }}
        />
        </TouchableHighlight>
        </View>
        <Text ><FontAwesome color='yellow'>{Icons.lightbulbO}</FontAwesome><Text style={{color:'red', fontSize: 25}}>Light Control</Text></Text>
        <View style={{display: this.state.connected?'flex':'none', marginTop: 10, paddingTop: 10, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
          <TouchableHighlight onPress={()=>{this.LightLeft(this.state.id)}}><TriangleLeft/></TouchableHighlight>
          <TouchableHighlight onPress={()=>{this.LightStop(this.state.id)}}><Square/></TouchableHighlight>
          <TouchableHighlight onPress={()=>{this.LightRight(this.state.id)}}><TriangleRight/></TouchableHighlight>
        </View>
        </View>
        <ImageBackground source = {require('./../../img/background.jpg')} style={{width: '100%', height : '100%'}}>
        <ScrollView style={[styles.scroll,{display: this.state.connected?'none':'flex'}]}>
          {(list.length == 0) &&
            <View style={{flex:1, margin: 20}}>
              <Text style={{textAlign: 'center'}}>No peripherals</Text>
            </View>
          }
          <ImageBackground source = {require('./../../img/background.jpg')} style={{width: '100%', height : '100%'}}>
          <ListView 
            enableEmptySections={true}
            dataSource={dataSource}
            renderRow={(item) => {
              const color = item.connected ? 'green' : '#fff';
              var activity = false;
              return (
                <TouchableHighlight disabled={this.state.peripheralsDisabled} onPress={() => {activity= true; this.test(item)} }>
                  <View style={[styles.row, {backgroundColor: color}]}>
                    <Text style={{fontSize: 12, textAlign: 'center', color: '#333333', padding: 10}}>{item.name}</Text>
                    <Text style={{fontSize: 8, textAlign: 'center', color: '#333333', padding: 10}}><FontAwesome color='blue'>{Icons.bluetooth}</FontAwesome>{item.id}</Text>
                    {activity?<ActivityIndicator size='small' />:null}
                  </View>
                </TouchableHighlight>
              );
            }}
          /></ImageBackground>
        </ScrollView>
        </ImageBackground>
      </View>
      </ImageBackground>
    );
  }
}

class Triangle extends Component{
  render(){
    return (
      <View style={[styles.triangle, this.props.style]} />
    )
  }
};

class TriangleLeft extends Component{
  render() {
    return (
      <Triangle style={styles.triangleLeft}/>
    )
  }
};
class TriangleRight extends Component{
  render(){
    return (
      <Triangle style={styles.triangleRight}/>
    )
  }
};
class Square extends Component{
  render() {
      return (
          <View style={styles.square} />
      )
  }
};
const styles = StyleSheet.create({
  triangle: {
    width: 105,
    height: 105,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 50,
    borderRightWidth: 50,
    borderBottomWidth: 100,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'lightblue'
  },
  triangleLeft: {
    transform: [
      {rotate: '-90deg'}
    ]
  },
  triangleRight: {
    transform: [
      {rotate: '90deg'}
    ]
  },
  square: {
    margin: 10,
    width: 110,
    height: 110,
    backgroundColor: 'red'
},
  container: {
    flex: 1,
    width: window.width,
    height: window.height
  },
  scroll: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 10,
  },
  row: {
    margin: 10
  },
  button: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:'center',
      width: 190,
      backgroundColor: '#000c26',
      height: 150,
      borderRadius: 15,
      margin: 5
  },
  image: {
      width: '60%',
      height: '85%'
  }
});
