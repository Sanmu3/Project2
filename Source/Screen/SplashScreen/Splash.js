import React, {Component} from 'react';
import {View, Image, ImageBackground, ActivityIndicator} from 'react-native';
import Navigation from '../Navigation/Navigation';
import {styles} from '../../Style/SplashScreen/SplashStyle';
import {Provider} from 'react-redux';
import {store} from '../Store/Store';
import AsyncStorage from '@react-native-community/async-storage';

class Splash extends Component {
  constructor() {
    super();
    this.state = {
      role: true,
    };
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
    setTimeout(() => {
      this.setState({
        role: false,
      });
    }, 2000);
  }
  role = AsyncStorage.getItem('role');
  splashScreen = () => {
    console.log('ini role', this.role);
    return (
      <View style={styles.screen}>
        <ImageBackground
          style={styles.background}
          source={require('../../Pic/logo/Background.png')}
        />
        <View style={styles.full}>
          <Image
            style={styles.logo}
            source={require('../../Pic/logo/logo.png')}
          />
          <ActivityIndicator
            color="#fff"
            size="large"
            style={styles.indicator}
          />
        </View>
      </View>
    );
  };

  render() {
    if (this.state.role) {
      return <>{this.splashScreen()}</>;
    } else {
      return (
        <Provider store={store}>
          <Navigation />
        </Provider>
      );
    }
  }
}
export default Splash;
