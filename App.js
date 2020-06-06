/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';

import React, {Component, useState,useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Button,
  View,
  Linking,
  Text,
  Dimensions,
  StatusBar
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';



const Stack = createStackNavigator();

/*
const linking =  {
  prefixes: [ 'https://ajm.re',
              'hilux://'],
  config: {
    AuthPass: 'auth',    
  },
};
*/

function HomeScr({ navigation }) {
  
  return (
    <HomeScreen/>
  );

  /*
  return (
          <View style={{ flex:1, backgroundColor:"yellow"}}>

            <View style={{ flex:1,  backgroundColor:"red", borderWidth:1, marginTop:10, justifyContent:"center" ,alignItems:"center"}}>
              <Text>test1</Text>            
            </View>
            <View style={{ flex:8, backgroundColor:"green", borderWidth:1, marginTop:10, justifyContent:"center" ,alignItems:"center"}}>
              <Button
                title="Go to Profile"
                onPress={() => navigation.navigate('Profile')}
              />                    
            </View>                        
          </View>        
  );
  */
}

function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Notifications"
        onPress={() => navigation.navigate('Notifications')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        title="Go to Settings"
        onPress={() => navigation.navigate('Settings')}
      />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

function SettingsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}

const AuthPass = props => {
  console.log("Auth pass props are : ", props)
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>AuthPass</Text>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}


function AuthFail({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}



function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScr} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Settings" component={SettingsScreen} />
      <Stack.Screen name="AuthPass" component={AuthPass} />
      <Stack.Screen name="AuthFail" component={AuthFail} />
    </Stack.Navigator>
  );
}


const App= () => {






  return (
    <>

      <NavigationContainer fallback={<Text>Loading...</Text>} >
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex:1}}>
          <MyStack/>
        </SafeAreaView>
      </NavigationContainer>
    
    </>
  );
};


export default App;
