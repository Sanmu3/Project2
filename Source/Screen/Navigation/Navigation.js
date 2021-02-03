import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../auth/Login';
import Daftar from '../auth/Daftar';
import LupaPassword from '../auth/LupaPassword';
import Home from '../AfterLog/Home';
import Profile from '../AfterLog/Profile';
import Jemput from '../Nasabah/Jemput';
import EditProfile from '../AfterLog/EditProfile';
import Chat from '../Nasabah/Chat';
import KontakPengurus from '../Nasabah/KontakPengurus';
import Pengurus1 from '../Pengurus1/Pengurus1';
import DataNasabah from '../Pengurus1/DataNasabah';
import {connect} from 'react-redux';
import Setoran from '../Pengurus1/Setoran';
import {ProfilePengurus} from '../Pengurus1/ProfilePengurus';
import Pengurus2 from '../Pengurus2/Pengurus2';
import Penjualan from '../Pengurus2/Penjualan';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const PengurusDua = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePengurus2" component={Pengurus2} />
      <Tab.Screen name="Profile" component={ProfilePengurus} />
    </Tab.Navigator>
  );
};

const PengurusSatu = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="HomePengurus1" component={Pengurus1} />
      <Tab.Screen name="DataNasabah" component={DataNasabah} />
      <Tab.Screen name="Profile" component={ProfilePengurus} />
    </Tab.Navigator>
  );
};

const Nasabah = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Daftar"
          component={Daftar}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LupaPassword"
          component={LupaPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Nasabah"
          component={Nasabah}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PengurusSatu"
          component={PengurusSatu}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PengurusDua"
          component={PengurusDua}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Edit"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Jemput"
          component={Jemput}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Chat"
          component={Chat}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Kontak"
          component={KontakPengurus}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Setoran"
          component={Setoran}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Penjualan"
          component={Penjualan}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => {
  return {
    userToken: state.userReducer,
  };
};

export default connect(mapStateToProps)(Navigation);
