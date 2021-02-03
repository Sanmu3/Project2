import React, {Component} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from '../../Style/Pengurus1/Pengurus1Style';

export default class Pengurus1 extends Component {
  constructor() {
    super();
    this.state = {
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
        this.getnasabah();
      } else {
        this.logOut();
      }
    });
    //setelah token muncul maka ambil data Profile
  }
  getnasabah() {
    this.setState({isLoading: true});
    fetch('https://qualcoom.herokuapp.com/api/message/getnasabah', {
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
  handleRefresh() {
    this.setState({refresh: true});
    this.getToken();
  }
  imageDefault =
    'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg';
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.headGroup}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require('../../Pic/logo/logo.png')}
            />
          </View>
        </View>

        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => this.handleRefresh()}
            />
          }>
          {this.state.dataSource.map((val) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate('Chat', {
                    getVal: val,
                  })
                }
                style={styles.kontak}>
                <Image
                  style={styles.profile}
                  source={{
                    uri: val.image == null ? this.imageDefault : val.image,
                  }}
                />
                <Text>{val.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}
