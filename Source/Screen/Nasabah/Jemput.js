import React, {Component} from 'react';
import {Image, Text, View, TouchableOpacity} from 'react-native';
import {styles} from '../../Style/Nasabah/JemputStyle';
import {Picker} from '@react-native-picker/picker';

export default class Jemput extends Component {
  constructor() {
    super();
    this.state = {
      selectedValue: '',
    };
  }

  GambarSampah() {
    if (this.state.selectedValue == '1') {
      return (
        <Image
          style={styles.image}
          source={require('../../Pic/JenisSampah/Plastik.jpg')}
        />
      );
    }
    if (this.state.selectedValue == '2') {
      return (
        <Image
          style={styles.image}
          source={require('../../Pic/JenisSampah/elektronik.jpeg')}
        />
      );
    }
    if (this.state.selectedValue == '3') {
      return (
        <Image
          style={styles.image}
          source={require('../../Pic/JenisSampah/alam.jpeg')}
        />
      );
    }
    if (this.state.selectedValue == '4') {
      return (
        <Image
          style={styles.image}
          source={require('../../Pic/JenisSampah/kaleng.jpeg')}
        />
      );
    }
    if (this.state.selectedValue == '5') {
      return (
        <Image
          style={styles.image}
          source={require('../../Pic/JenisSampah/Masyarakat.jpeg')}
        />
      );
    } else {
      return <Image style={styles.image} />;
    }
  }

  render() {
    return (
      <View style={styles.screen}>
        <View style={styles.main}>
          <TouchableOpacity style={styles.backButton}>
            <Image
              style={styles.back}
              source={require('../../Pic/main/arrow-left.png')}
            />
          </TouchableOpacity>
          <Image
            style={styles.foto}
            source={require('../../Pic/logo/Background.png')}
          />
          <View style={styles.jenisSampah}>
            <Picker
              selectedValue={this.state.selectedValue}
              onValueChange={(itemValue) =>
                this.setState({selectedValue: itemValue})
              }>
              <Picker.Item key="unselectable" label="Jenis Sampah" />
              <Picker.Item label="Plastik" value="1" />
              <Picker.Item label="Elektronik" value="2" />
              <Picker.Item label="Alam" value="3" />
              <Picker.Item label="Kaleng" value="4" />
              <Picker.Item label="Masyarakat" value="5" />
            </Picker>
          </View>
          {this.GambarSampah()}
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Minta Jemput</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
