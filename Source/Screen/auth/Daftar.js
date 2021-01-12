import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../../Style/auth/DaftarStyle';

export default class Daftar extends Component {
  constructor() {
    super();
    this.state = {
      secureTextEntry: true,
    };
  }
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
            <Text style={styles.text}>Nama</Text>
            <View style={styles.input}>
              <TextInput
                keyboardType="email-address"
                placeholder="Masukan Nama"
              />
            </View>
            <Text style={styles.text}>Email</Text>
            <View style={styles.input}>
              <TextInput
                keyboardType="email-address"
                placeholder="Masukan Email"
              />
            </View>
            <Text style={styles.text}>Password</Text>
            <View style={styles.direct}>
              <TextInput
                secureTextEntry={this.state.secureTextEntry}
                placeholder="Masukan Password"
                style={{flex: 1}}
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
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>Daftar</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text2}>
            Sudah Punya akun ?<Text style={{fontWeight: 'bold'}}> Masuk </Text>
            sekarang
          </Text>
        </View>
      </View>
    );
  }
}
