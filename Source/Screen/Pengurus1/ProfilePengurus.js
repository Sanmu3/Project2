import React, {Component} from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {styles} from '../../Style/Pengurus1/ProfilePengurusStyle';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

export class ProfilePengurus extends Component {
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

  render() {
    console.log('token dari redux', this.props.userToken);
    return (
      <View style={styles.screen}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refresh}
              onRefresh={() => this.handleRefresh()}
            />
          }>
          <View style={styles.headGroup}>
            <View style={styles.header}>
              <Text style={styles.headerText}>My Profile</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.logOut()}
              style={styles.headPicBack}>
              <Image
                style={styles.headPic}
                source={require('../../Pic/main/log-out.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.profile}>
            <View style={styles.biodata}>
              <View style={styles.bio}>
                <Text style={styles.name}>{this.state.dataSource.name}</Text>
                <Text style={styles.nomor}>
                  {this.state.dataSource.nomor_telepon == null ? (
                    <Text> nomor anda belum di isi</Text>
                  ) : (
                    this.state.dataSource.nomor_telepon
                  )}
                </Text>
                <Text style={styles.address}>
                  {this.state.dataSource.alamat == null ? (
                    <Text>Anda Belum mengisi alamat</Text>
                  ) : (
                    this.state.dataSource.alamat
                  )}
                </Text>
              </View>
            </View>
            <>
              {this.state.dataSource.image == null ? (
                <Image
                  style={styles.foto}
                  source={require('../../Pic/main/default.jpg')}
                />
              ) : (
                <Image
                  style={styles.foto}
                  source={{uri: this.state.dataSource.image}}
                />
              )}
            </>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userToken: state.userReducer,
  };
};

export default connect(mapStateToProps, null)(ProfilePengurus);
