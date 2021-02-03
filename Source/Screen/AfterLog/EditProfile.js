import React, {Component} from 'react';
import {Image, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {styles} from '../../Style/AfterLog/EditProfileStyle';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-community/async-storage';

export default class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      image: '',
      imagePicker: {
        fileName: 'default.jpeg',
        type: 'image/jpeg',
        uri:
          'https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg',
      },
      token: '',
      name: '',
      nomor_telepon: '',
      alamat: '',
      isLoading: false,
    };
  }
  getToken() {
    AsyncStorage.getItem('token')
      .then((token) => {
        if (token !== null) {
          //Pakai callback, untuk memastikan state sudah berubah
          this.setState({token: token}, function () {
            this.getProfile();
          });
        } else {
          this.logOut();
        }
      })

      .catch((error) => {
        console.log(error);
      });
  }
  setLoading(loading) {
    this.setState({loading: loading});
  }
  updateProfile() {
    const {name, nomor_telepon, alamat, imagePicker} = this.state;

    var dataToSend = {
      _method: 'patch',
      image: imagePicker,
      name: name,
      nomor_telepon: nomor_telepon,
      alamat: alamat,
    };
    this.setState({isLoading: true});
    fetch('https://qualcoom.herokuapp.com/api/update/profile', {
      method: 'POST',
      body: this.createFormData(imagePicker, dataToSend),
      headers: {
        Authorization: `Bearer ${this.state.token}`,
        //Header Defination
        // 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const {status} = responseJson;
        if (status === 'success') {
          this.setState({isLoading: false});
          ToastAndroid.show('Update sukses', ToastAndroid.LONG);
          this.props.navigation.goBack();
        } else {
          this.setState({isLoading: false});
          ToastAndroid.show(
            'Pastikan Form Sudah Terisi dengan benar',
            ToastAndroid.LONG,
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
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
        console.log(responseJson.data);
        let {name, nomor_telepon, alamat, image} = responseJson.data;
        this.setState({
          isLoading: false,
          name: name,
          nomor_telepon: nomor_telepon,
          alamat: alamat,
          imagePicker: {
            name: 'default.jpeg',
            type: 'image/jpeg',
            uri: image,
          },
        });
      })

      .catch((error) => {
        console.log(error);
      });
  }
  componentDidMount() {
    this.getToken();
  }
  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    launchImageLibrary(options, (response) => {
      if (response.uri) {
        this.setState({imagePicker: response});
        console.log(response);
      }
    });
  };

  createFormData = (image, body) => {
    const data = new FormData();

    data.append('image', {
      name: image.fileName,
      type: image.type,
      uri: image.uri,
    });

    Object.keys(body).forEach((key) => {
      data.append(key, body[key]);
    });

    console.log(data);
    return data;
  };
  render() {
    console.log(this.state.alamat);
    return (
      <View style={styles.screen}>
        <View style={styles.headGroup}>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={styles.backButton}>
            <Image
              style={styles.back}
              source={require('../../Pic/main/arrow-left.png')}
            />
          </TouchableOpacity>
          <View style={styles.header}>
            <Text style={styles.headerText}>Edit Profile</Text>
          </View>
        </View>
        <ScrollView>
          <View style={styles.profile}>
            <View style={styles.biodata}>
              <View style={styles.bio}>
                <TextInput
                  style={styles.name}
                  onChangeText={(name) => this.setState({name})}
                  value={this.state.name}
                  placeholder="Masukan nama anda"
                />

                <TextInput
                  style={styles.nomor}
                  value={this.state.nomor_telepon}
                  placeholder="Masukan nomor telepon anda"
                  onChangeText={(nomor_telepon) =>
                    this.setState({nomor_telepon})
                  }
                />

                <TextInput
                  style={styles.alamat}
                  onChangeText={(alamat) => this.setState({alamat})}
                  value={this.state.alamat}
                  placeholder="Masukan alamat anda"
                />
              </View>

              <TouchableOpacity
                onPress={() => this.updateProfile()}
                style={styles.button}>
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() => this.handleChoosePhoto()}
              style={styles.touchfoto}>
              {this.state.imagePicker.uri ? (
                <Image
                  source={{uri: this.state.imagePicker.uri}}
                  style={styles.foto}
                />
              ) : (
                <Image
                  source={require('../../Pic/main/default.jpg')}
                  style={styles.foto}
                />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    );
  }
}
