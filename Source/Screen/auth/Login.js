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
import {connect} from 'react-redux';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      password: '',
      secureTextEntry: true,
      token: '',
    };
  }
  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token != null) {
        AsyncStorage.getItem('role').then((role) => {
          if (role == 'nasabah') {
            console.log('nasabah', role, token);
            this.props.navigation.navigate('Nasabah', {screen: 'Home'});
          } else if (role == 'pengurus1') {
            console.log(role);
            this.props.navigation.navigate('PengurusSatu', {
              screen: 'HomePengurus1',
            });
          } else {
            console.log(role);
            this.props.navigation.navigate('PengurusDua', {
              screen: 'HomePengurus2',
            });
          }
        });
      } else {
        console.log('no token');
        this.props.navigation.navigate('Splash');
      }
    });
  }
  componentDidMount() {
    this.getToken();
  }
  mengambilUser = () => {
    this.setState({isLoading: true}),
      fetch('https://qualcoom.herokuapp.com/api/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          Accept: 'application/json',
        },
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

  Masuk = () => {
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
          const {role} = responseJson.user;
          if (token && role == 'nasabah') {
            this.setState({isLoading: false, token: token}),
              AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('role', role.toString());
            this.props.navigation.navigate('Nasabah', {screen: 'Home'});
            this.props.userLogin(token);
            this.props.userRole(role);
          }
          if (token && role == 'pengurus1') {
            this.setState({isLoading: false, token: token}),
              AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('role', role.toString());
            this.props.navigation.navigate('PengurusSatu', {
              screen: 'HomePengurus1',
            });
            this.props.userLogin(token);
            this.props.userRole(role);
          }
          if (token && role == 'pengurus2') {
            this.setState({isLoading: false, token: token}),
              AsyncStorage.setItem('token', token);
            AsyncStorage.setItem('role', role.toString());
            this.props.navigation.navigate('PengurusDua', {
              screen: 'HomePengurus2',
            });
            this.props.userLogin(token);
            this.props.userRole(role);
          } else {
            this.setState({isLoading: false}),
              ToastAndroid.show(
                'Email dan Password anda Salah',
                ToastAndroid.LONG,
              );
          }
        })
        //If response is not in json then in error
        .catch((error) => {
          ToastAndroid.show('Email dan Password anda Salah', ToastAndroid.LONG);
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
            <Text style={styles.text}>Email</Text>
            <View style={styles.input}>
              <TextInput
                keyboardType="email-address"
                style={{letterSpacing: 0.7}}
                placeholder="Masukan Email"
                onChangeText={(email) => this.setState({email})}
              />
            </View>
            <Text style={styles.text}>Password</Text>
            <View style={styles.direct}>
              <TextInput
                secureTextEntry={this.state.secureTextEntry}
                placeholder="Masukan Password"
                style={{flex: 1, letterSpacing: 0.7}}
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
            <Text
              onPress={() => this.props.navigation.navigate('LupaPassword')}
              style={styles.forgotpass}>
              Lupa Password?
            </Text>
            <TouchableOpacity
              onPress={() => this.Masuk()}
              style={styles.button}>
              <Text style={styles.textButton}>Masuk</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text2}>
            Belum Punya akun ?
            <Text
              onPress={() => this.props.navigation.navigate('Daftar')}
              style={{fontWeight: 'bold'}}>
              {''} Daftar {''}
            </Text>
            sekarang
          </Text>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.userReducer,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (token) => dispatch({type: 'SET_USER', payload: token}),
    userRole: (role) => dispatch({type: 'SET_ROLE', payload: role}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
