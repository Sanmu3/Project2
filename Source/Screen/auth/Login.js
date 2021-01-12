import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../../Style/auth/LoginStyle';
import AsyncStorage from '@react-native-community/async-storage';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      secureTextEntry: true,
      token: '',
    };
    console.log('ini token', this.state.token);
    AsyncStorage.getItem('token').then((value) => {
      console.log(value);
      if (value !== null) {
        this.props.navigation.navigate('Nasabah', {screen: 'Home'});
      } else {
        this.props.navigation.navigate('Login');
      }
    });
  }

  mengambilUser = () => {
    this.setState({isLoading: true}),
      fetch('https://qualcoom.herokuapp.com/api/profile', {
        method: 'GET',
        Authorization: `Bearer ${this.state.token}`,
      })
        .then((response) => response.json())
        .then((responseJson) => {
          console.log(responseJson);
          this.setState({isLoading: false});
        })
        .catch((error) => {
          console.error('errornya' + error);
        });
  };

  componentDidMount() {
    this.mengambilUser();
  }

  Login = () => {
    const {email, password} = this.state;

    var dataToSend = {email: email, password: password};
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');

    //POST request
    this.setState({isLoading: true}),
      fetch('https://qualcoom.herokuapp.com/api/auth/login', {
        method: 'POST', //Request Type
        body: formBody, //post body
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
          console.log(responseJson);
          const {token} = responseJson;
          if (token) {
            this.setState({isLoading: false}),
              AsyncStorage.setItem('token', token);
            this.props.navigation.navigate('Nasabah', {screen: 'Home'});
          } else {
            this.setState({isLoading: false}),
              ToastAndroid('Email dan Password anda Salah', ToastAndroid.LONG);
          }
        })
        //If response is not in json then in error
        .catch((error) => {
          alert('Email dan Password anda Salah');
        });
  };
  render() {
    return (
      <View style={styles.screen}>
        <ImageBackground
          style={styles.background}
          source={require('../../Pic/logo/Background.png')}
        />
        <View style={styles.form}>
          <Image source={require('../../Pic/logo/Logopic.png')} />
          <View style={styles.box}>
            <Text style={styles.text}>Email</Text>
            <View style={styles.input}>
              <TextInput
                keyboardType="email-address"
                placeholder="Masukan Email"
                onChangeText={(email) => this.setState({email})}
              />
            </View>
            <Text style={styles.text}>Password</Text>
            <View style={styles.direct}>
              <TextInput
                secureTextEntry={this.state.secureTextEntry}
                placeholder="Masukan Password"
                style={{flex: 1}}
                onChangeText={(password) => this.setState({password})}
              />
              <TouchableOpacity
                onPress={() =>
                  this.setState({secureTextEntry: !this.state.secureTextEntry})
                }>
                {this.state.secureTextEntry == true ? (
                  <Image
                    style={styles.logo}
                    source={require('../../Pic/auth/invisibility.png')}
                  />
                ) : (
                  <Image
                    style={styles.logo}
                    source={require('../../Pic/auth/visibility.png')}
                  />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.forgotpass}>Lupa Password?</Text>
            <TouchableOpacity
              onPress={() => this.Login()}
              style={styles.button}>
              <Text style={styles.textButton}>Masuk</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text2}>
            Belum Punya akun ?<Text style={{fontWeight: 'bold'}}> Daftar </Text>
            sekarang
          </Text>
        </View>
      </View>
    );
  }
}
