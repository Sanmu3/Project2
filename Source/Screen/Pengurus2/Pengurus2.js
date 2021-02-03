import React, {Component} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {styles} from '../../Style/AfterLog/HomeStyle';
import AsyncStorage from '@react-native-community/async-storage';

export default class Pengurus2 extends Component {
  constructor(props) {
    super(props);
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
          <View style={styles.mainHeader}>
            <Image
              style={styles.fotoProfile}
              source={{
                uri:
                  this.state.dataSource.image == null
                    ? this.imageDefault
                    : this.state.dataSource.image,
              }}
            />
            <View>
              <Text style={styles.mainHeaderText}>Hi,</Text>
              <Text style={styles.mainHeaderText}>
                {this.state.dataSource.name}
              </Text>
            </View>
          </View>
          <View style={styles.main}>
            <Text style={styles.mainText}>
              Mari Kita Budayakan Bersih Bersih
            </Text>
          </View>

          <View style={styles.mainBottom}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Penjualan')}
              style={styles.bottomItem}>
              <View style={styles.itemBottomItem}>
                <Image
                  style={styles.bottomPic}
                  source={require('../../Pic/main/pick-up-car.png')}
                />
              </View>
              <Text style={styles.bottomText}>Jual Sampah</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
