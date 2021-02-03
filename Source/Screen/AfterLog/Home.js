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
import {connect} from 'react-redux';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      dataSource: [],
      token: '',
      refresh: false,
      saldo: '',
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
          saldo: responseJson.tabungan.saldo,
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
    console.log(this.state.saldo);
    return (
      <View style={styles.screen}>
        <View style={styles.headGroup}>
          <View style={styles.header}>
            <Image
              style={styles.logo}
              source={require('../../Pic/logo/logo.png')}
            />
          </View>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('Kontak')}
            style={styles.headPicBack}>
            <Image
              style={styles.headPic}
              source={require('../../Pic/main/chat.png')}
            />
          </TouchableOpacity>
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
            <Text style={styles.mainText}>Saldo anda</Text>
            <Text style={styles.mainText}>Rp. {this.state.saldo}</Text>
          </View>

          <View style={styles.mainBottom}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Jemput')}
              style={styles.bottomItem}>
              <View style={styles.itemBottomItem}>
                <Image
                  style={styles.bottomPic}
                  source={require('../../Pic/main/pick-up-car.png')}
                />
              </View>
              <Text style={styles.bottomText}>Jemput Sampah</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomItem}>
              <View style={styles.itemBottomItem}>
                <Image
                  style={styles.bottomPic}
                  source={require('../../Pic/main/walk.png')}
                />
              </View>
              <Text style={styles.bottomText}>Setor Langsung</Text>
            </TouchableOpacity>
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

export default connect(mapStateToProps)(Home);
