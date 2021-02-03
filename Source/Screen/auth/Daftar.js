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
import {styles} from '../../Style/auth/DaftarStyle';

export default class Daftar extends Component {
  constructor() {
    super();
    this.state = {
      secureTextEntry: true,
      name: '',
      email: '',
      password: '',
      isLoading: false,
    };
  }
  register = () => {
    const {name, email, password} = this.state;

    //POST json
    var dataToSend = {
      name: name,
      email: email,
      password: password,
    };
    //making data to send on server
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    this.setState({isLoading: true}),
      fetch('https://qualcoom.herokuapp.com/api/auth/register', {
        method: 'POST',
        body: formBody,
        headers: {
          //Header Defination
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Accept: 'application/json',
        },
      })
        .then((response) => response.json())
        //If response is in json then in success
        .then((responseJson) => {
          console.log(responseJson);
          const {status} = responseJson;
          if (status == 'success') {
            this.setState({isLoading: false}),
              ToastAndroid.show('sukses mendaftar', ToastAndroid.LONG);
            this.props.navigation.navigate('Login');
            console.log('daftar sukses');
          } else {
            this.setState({isLoading: false}),
              ToastAndroid.show(
                'Pastikan Form terisi dengan benar',
                ToastAndroid.LONG,
              );
          }
        })
        //If response is not in json then in error
        .catch((error) => {
          console.log(error);
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
            <Text style={styles.text}>Nama</Text>
            <View style={styles.input}>
              <TextInput
                keyboardType="email-address"
                placeholder="Masukan Nama"
                onChangeText={(name) => this.setState({name})}
                style={{letterSpacing: 0.7}}
              />
            </View>
            <Text style={styles.text}>Email</Text>
            <View style={styles.input}>
              <TextInput
                keyboardType="email-address"
                placeholder="Masukan Email"
                onChangeText={(email) => this.setState({email})}
                style={{letterSpacing: 0.7}}
              />
            </View>
            <Text style={styles.text}>Password</Text>
            <View style={styles.direct}>
              <TextInput
                secureTextEntry={this.state.secureTextEntry}
                placeholder="Masukan Password"
                onChangeText={(password) => this.setState({password})}
                style={{flex: 1, letterSpacing: 0.7}}
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
            <TouchableOpacity
              onPress={() => this.register()}
              style={styles.button}>
              <Text style={styles.textButton}>Daftar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text2}>
            Sudah Punya akun ?
            <Text
              onPress={() => this.props.navigation.goBack()}
              style={{fontWeight: 'bold'}}>
              {' '}
              Masuk{' '}
            </Text>
            sekarang
          </Text>
        </View>
      </View>
    );
  }
}
