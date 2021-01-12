import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from '../../Style/AfterLog/HomeStyle';

export default class Home extends Component {
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
          <TouchableOpacity style={styles.headPicBack}>
            <Image
              style={styles.headPic}
              source={require('../../Pic/main/chat.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mainHeader}>
          <Text style={styles.mainHeaderText}>Saldo</Text>
          <Text style={styles.mainHeaderText}>Rp. 20.000</Text>
        </View>
        <View style={styles.main}>
          <View style={styles.mainitem}>
            <TouchableOpacity style={styles.itemMainitem}>
              <Image
                style={styles.mainPic}
                source={require('../../Pic/main/atm.png')}
              />
              <Text style={styles.mainText}>Tarik Sis</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemMainitem}>
              <Image
                style={styles.mainPic}
                source={require('../../Pic/main/badge.png')}
              />
              <Text style={styles.mainText}>70 Point</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.itemMainitem}>
              <Image
                style={styles.mainPic}
                source={require('../../Pic/main/scale.png')}
              />
              <Text style={styles.mainText}>49 kg</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mainBottom}>
          <TouchableOpacity style={styles.bottomItem}>
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
      </View>
    );
  }
}
