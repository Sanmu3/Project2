import React, {Component} from 'react';
import {Text, View} from 'react-native';
import Login from './Source/Screen/auth/Login';
import Daftar from './Source/Screen/auth/Daftar';
import LupaPassword from './Source/Screen/auth/LupaPassword';
import Home from './Source/Screen/AfterLog/Home';
import Navigation from './Source/Screen/Navigation/Navigation';
import Profile from './Source/Screen/AfterLog/Profile';
import Jemput from './Source/Screen/Nasabah/Jemput';
import EditProfile from './Source/Screen/AfterLog/EditProfile';
import Splash from './Source/Screen/SplashScreen/Splash';
import Chat from './Source/Screen/Nasabah/Chat';
import KontakPengurus from './Source/Screen/Nasabah/KontakPengurus';
import Pengurus1 from './Source/Screen/Pengurus1/Pengurus1';
import Pengurus2 from './Source/Screen/Pengurus2/Pengurus2';
import Penjualan from './Source/Screen/Pengurus2/Penjualan';

class App extends Component {
  render() {
    return (
      <>
        <Splash />
      </>
    );
  }
}

export default App;
