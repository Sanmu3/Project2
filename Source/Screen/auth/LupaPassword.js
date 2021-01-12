import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from '../../Style/auth/LupaPasswordStyle';

export default class LupaPassword extends Component {
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
            <Text style={styles.text}>Email</Text>
            <View style={styles.input}>
              <TextInput
                keyboardType="email-address"
                placeholder="Masukan Email"
              />
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>kirim</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text2}>Kembali</Text>
        </View>
      </View>
    );
  }
}
