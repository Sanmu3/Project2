import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from '../auth/Login';
import Daftar from '../auth/Daftar';
import LupaPassword from '../auth/LupaPassword';
import Home from '../AfterLog/Home';
import Profile from '../AfterLog/Profile';
import Jemput from '../Nasabah/Jemput';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

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
        <Stack.Screen name="Jemput" component={Jemput} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default Navigation;
