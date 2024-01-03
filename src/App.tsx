/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {SafeAreaProvider} from 'react-native-safe-area-context';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {pColor60} from './styles/Colors';
import {NavigationContainer} from '@react-navigation/native';
import AppNav from './navigation/AppNav';
import AsyncStorage from '@react-native-async-storage/async-storage';

function App(): React.JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
    // (async function () {
    //   await AsyncStorage.clear();
    // })();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle={'dark-content'}
          backgroundColor={styles.statusBar.backgroundColor}
        />
        <NavigationContainer>
          <AppNav />
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: pColor60,
  },
  statusBar: {
    backgroundColor: pColor60,
  },
});

export default App;
