import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  ImageBackground,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {styles} from '../../Style/Nasabah/KontakStyle';
import AsyncStorage from '@react-native-community/async-storage';

export default class KontakPengurus extends Component {
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
        this.getPengurus();
      } else {
        this.logOut();
      }
    });
    //setelah token muncul maka ambil data Profile
  }
  getPengurus() {
    this.setState({isLoading: true});
    fetch('https://qualcoom.herokuapp.com/api/message/getpengurus', {
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
    console.log(this.state.dataSource);
    return (
      <View style={styles.screen}>
        <StatusBar backgroundColor="#3b3b3b" />
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backHeaderPic}>
            <Image
              style={styles.headerPic}
              source={require('../../Pic/main/arrow-left.png')}
            />
          </TouchableOpacity>

          <Text style={styles.headerName}>Pilih Kontak Pengurus</Text>
        </View>
        <ImageBackground
          style={{flex: 1}}
          source={require('../../Pic/logo/Background.png')}>
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
        </ImageBackground>
      </View>
    );
  }
}
