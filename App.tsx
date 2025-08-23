/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import { enableScreens } from 'react-native-screens';
enableScreens();
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screen/HomeScreen';
import DetailScreen from './screen/DetailScreen';
import {NaviStackList} from './screen/NaviStack';

const Stack = createNativeStackNavigator<NaviStackList>();
function App() {
console.log('App Rendered')

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator 
    initialRouteName="Home"
    screenOptions={{ contentStyle: { backgroundColor: '#fafafa' } }}
  >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
