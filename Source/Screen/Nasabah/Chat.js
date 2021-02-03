import React, {Component} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ScrollView,
  RefreshControl,
  Touchable,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from '../../Style/Nasabah/ChatStyle';
import Pusher from 'pusher-js/react-native';

export default class Chat extends Component {
  constructor() {
    super();

    this.state = {
      isLoading: false,
      dataSource: [],
      dataview: {},
      token: '',
      refresh: false,
      message: '',
      receiver_id: '',
      dataMessage: [],
    };
  }
  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.getChat();
        this.getProfile();
      } else {
        this.logOut();
      }
    });

    //setelah token muncul maka ambil data
  }
  logOut() {
    fetch('https://qualcoom.herokuapp.com/api/auth/logout', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        console.log(responseJson);
        const {status} = responseJson;
        if (status == 'success') {
          AsyncStorage.clear();
          this.props.navigation.navigate('Login');
          this.userLogin(null);
        } else {
          console.log('error');
          AsyncStorage.clear();
          this.props.navigation.navigate('Login');
          this.userLogin(null);
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        console.log('token', error);
      });
  }

  componentDidMount() {
    this.getToken();
    // Enable pusher logging - don't include this in production
    Pusher.logToConsole = true;

    var pusher = new Pusher('3498a888774f5b64ebc4', {
      cluster: 'ap1',
    });

    var channel = pusher.subscribe('my-channel');
    channel.bind('my-event', (data) => {
      console.log(JSON.stringify(data));
      this.setState({massage: ''});
      this.getChat();
    });
  }

  getChat() {
    // this.setState({isLoading: true});
    fetch(
      'https://qualcoom.herokuapp.com/api/message/' +
        this.props.route.params.getVal.id,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          // Accept: 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log('ini respon', responseJson);
        this.setState({
          isLoading: false,
          dataMessage: responseJson.message,
          refresh: false,
        });
      });
  }

  sendMessage() {
    const {message, receiver_id} = this.state;

    var dataToSend = {
      message: message,
      receiver_id: this.props.route.params.getVal.id,
    };

    console.log('ini', dataToSend);
    //POST requestu
    // this.setState({isLoading: true});
    fetch('https://qualcoom.herokuapp.com/api/message', {
      method: 'POST', //Request Typeu
      body: JSON.stringify(dataToSend), //post body
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        //Header Defination
        'Content-Type': 'application/json',
        // Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      //If response is in json then in success
      .then((responseJson) => {
        console.log(responseJson);
        const {status} = responseJson;
        if (status == 'success') {
          this.getChat();
          this.setState({
            message: '',
          });
        } else {
          this.setState({isLoading: false});
        }
      })
      //If response is not in json then in error
      .catch((error) => {
        console.log(error);
      });
  }

  getProfile() {
    this.setState({isLoading: true});
    fetch('https://qualcoom.herokuapp.com/api/profile', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${this.state.token}`,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        this.setState({
          isLoading: false,
          dataSource: responseJson.data,
          refresh: false,
        });
      })

      .catch((error) => {
        console.log('error', error);
      });
  }

  handleRefresh() {
    this.setState({refresh: true});
    this.getToken();
  }
  imageDefault =
    'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';

  render() {
    console.log('ini data message', this.props.route.params.getVal);
    return (
      <View style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backHeaderPic}>
            <Image
              style={styles.headerPic}
              source={require('../../Pic/main/arrow-left.png')}
            />
          </TouchableOpacity>

          <Image
            style={styles.profile}
            source={{
              uri:
                this.props.route.params.getVal.image == null
                  ? this.imageDefault
                  : this.props.route.params.getVal.image,
            }}
          />
          <Text style={styles.headerName}>
            {this.props.route.params.getVal.name}
          </Text>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => this.handleRefresh()}
            />
          }>
          <View style={styles.body}>
            {this.state.dataMessage.map((val) => {
              return (
                <View
                  style={
                    val.to == this.props.route.params.getVal.id
                      ? styles.postChat
                      : styles.getChat
                  }>
                  <Text style={styles.message}>{val.message}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
        <TouchableOpacity
          onPress={() =>
            this.setState({
              message:
                'Hallo, bisa tolong jemput sampah ku di daerah ' +
                this.state.dataSource.alamat,
            })
          }
          style={styles.shortClik}>
          <Text style={styles.short}>Alamat</Text>
        </TouchableOpacity>
        <View style={styles.foot}>
          <View style={styles.inputMessage}>
            <TouchableOpacity />
            <View style={styles.rawMessage}>
              <TextInput
                onChangeText={(input) => this.setState({message: input})}
                value={this.state.message}
                placeholder="Tulis Pesan ..."
                multiline={true}
                style={{marginLeft: 10, marginRight: 10}}
              />
            </View>
            <TouchableOpacity onPress={() => this.sendMessage()}>
              <Image
                style={styles.footPic}
                source={require('../../Pic/main/send.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}
