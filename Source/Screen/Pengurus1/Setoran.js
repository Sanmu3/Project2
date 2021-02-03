import React, {Component} from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
  Alert,
} from 'react-native';
import {styles} from '../../Style/Pengurus1/SetoranStyle';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-community/async-storage';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

export default class Setoran extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      dataSource: [],
      token: '',
      refresh: false,
      jenis_sampah_id: '',
      keterangan: '',
      berat: '',
    };
  }
  getToken() {
    AsyncStorage.getItem('token').then((token) => {
      if (token !== null) {
        this.setState({token: token});
      } else {
        this.logOut();
      }
    });
    //setelah token muncul maka ambil data Profile
  }
  Setor() {
    const {jenis_sampah_id, keterangan, berat} = this.state;

    var dataToSend = {
      jenis_sampah_id: jenis_sampah_id,
      keterangan: keterangan,
      berat: berat,
    };
    var formBody = [];
    for (var key in dataToSend) {
      var encodedKey = encodeURIComponent(key);
      var encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    formBody = formBody.join('&');
    this.setState({isLoading: true});
    fetch(
      'https://qualcoom.herokuapp.com/api/pengurus1/setoran/' +
        this.props.route.params.getPro.id,
      {
        method: 'POST',
        body: formBody,
        headers: {
          Authorization: `Bearer ${this.state.token}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          Accept: 'application/json',
        },
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson);
        const {status} = responseJson;
        if (status === 'success') {
          this.setState({isLoading: false});
          // Alert.alert(responseJson);
          ToastAndroid.show(
            'Sukses Disetorkan Kepada ' + this.props.route.params.getPro.name,
            ToastAndroid.LONG,
          );
          this.props.navigation.goBack();
        } else {
          this.setState({isLoading: false});
          ToastAndroid.show(
            'Gagal Disetorkan Silahkan ulangi',
            ToastAndroid.LONG,
          );
        }
      })
      .catch((error) => {
        console.log(error);
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

  GambarSampah() {
    if (this.state.jenis_sampah_id == '1') {
      return (
        <Image
          style={styles.image}
          source={require('../../Pic/JenisSampah/Plastik.jpeg')}
        />
      );
    }
    if (this.state.jenis_sampah_id == '2') {
      return (
        <Image
          style={styles.image}
          source={require('../../Pic/JenisSampah/alumunium.jpeg')}
        />
      );
    }
    if (this.state.jenis_sampah_id == '3') {
      return (
        <Image
          style={styles.image}
          source={require('../../Pic/JenisSampah/besi.jpeg')}
        />
      );
    }
    if (this.state.jenis_sampah_id == '4') {
      return (
        <Image
          style={styles.image}
          source={require('../../Pic/JenisSampah/Kertas.jpeg')}
        />
      );
    } else {
      return (
        <Image
          style={styles.image}
          source={require('../../Pic/JenisSampah/default.png')}
        />
      );
    }
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
                this.props.route.params.getPro.image == null
                  ? this.imageDefault
                  : this.props.route.params.getPro.image,
            }}
          />
          <Text style={styles.nama}>{this.props.route.params.getPro.name}</Text>
          <ScrollView>
            <View style={styles.jenisSampah}>
              <View style={[styles.pickerArea]}>
                <Picker
                  selectedValue={this.state.jenis_sampah_id}
                  onValueChange={(itemValue) =>
                    itemValue === '0'
                      ? null
                      : this.setState({jenis_sampah_id: itemValue})
                  }>
                  <Picker.Item value="0" label="Jenis Sampah" color="grey" />
                  <Picker.Item label="Plastik" value="1" />
                  <Picker.Item label="Alumunium" value="2" />
                  <Picker.Item label="Besi" value="3" />
                  <Picker.Item label="Kertas" value="4" />
                </Picker>
              </View>
              {this.GambarSampah()}
            </View>

            <View style={styles.pickerArea}>
              <Picker
                selectedValue={this.state.keterangan}
                onValueChange={(itemValue) =>
                  itemValue === '0'
                    ? null
                    : this.setState({keterangan: itemValue})
                }>
                <Picker.Item value="0" label="Keterangan" color="grey" />
                <Picker.Item label="diantar" value="diantar" />
                <Picker.Item label="dijemput" value="dijemput" />
              </Picker>
            </View>
            <View style={styles.Berat}>
              <TextInput
                style={styles.beratInput}
                placeholder="Berat"
                onChangeText={(berat) => this.setState({berat})}
                keyboardType="number-pad"
              />
              <Text style={styles.kilo}>Kg</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.Setor()}
              style={styles.button}>
              <Text style={styles.buttonText}>Setor</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    );
  }
}
