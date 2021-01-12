import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../../Style/AfterLog/ProfileStyle';

export default class Profile extends Component {
  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.headGroup}>
          <View style={styles.header}>
            <Text style={styles.headerText}>My Profile</Text>
          </View>
          <TouchableOpacity style={styles.headPicBack}>
            <Image
              style={styles.headPic}
              source={require('../../Pic/main/menu.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.profile}>
          <View style={styles.biodata}>
            <View style={styles.bio}>
              <Text style={styles.name}>SanMu</Text>
              <Text style={styles.nomor}>083873463780</Text>
              <Text style={styles.address}>Wind Valley, Moonstad</Text>
            </View>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={styles.foto}
            source={require('../../Pic/logo/Background.png')}
          />
        </View>
      </View>
    );
  }
}
