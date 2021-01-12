import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Login from './Source/Screen/auth/Login';
import Daftar from './Source/Screen/auth/Daftar';
import LupaPassword from './Source/Screen/auth/LupaPassword';
import Home from './Source/Screen/AfterLog/Home';
import Navigation from './Source/Screen/Navigation/Navigation';
import Profile from './Source/Screen/AfterLog/Profile';
import Jemput from './Source/Screen/Nasabah/Jemput';

export default class App extends Component {
  render() {
    return (
      <>
        <Navigation />
      </>
    );
  }
}
