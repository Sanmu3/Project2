import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../../Style/Nasabah/JemputStyle';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';

export default class Jemput extends Component {
  constructor() {
    super();
    this.state = {
      selectedValue: '',
      isLoading: false,
      dataSource: [],
      token: '',
      refresh: false,
    };
  }
  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
        this.getProfile();
      } else {
        this.logOut();
      }
    });
    //setelah token muncul maka ambil data Profile
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

  componentDidMount() {
    this.getToken();
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
  imageDefault =
    'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.main}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}>
            <Image
              style={styles.back}
              source={require('../../Pic/main/arrow-left.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.foto}
            source={{
              uri:
                this.state.dataSource.image == null
                  ? this.imageDefault
                  : this.state.dataSource.image,
            }}
          />
          <Text style={styles.Name}>{this.state.dataSource.name}</Text>
          <Text style={styles.nomor}>
            {this.state.dataSource.nomor_telepon}
          </Text>
          <Text style={styles.alamat}>{this.state.dataSource.alamat}</Text>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Kontak')}
            style={styles.button}>
            <Text style={styles.buttonText}>Minta Jemput</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
