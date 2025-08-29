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
import Colors from './rsc/color'
import HomeScreen from './src/screen/HomeScreen';
import DetailScreen from './src/screen/DetailScreen';
import AlarmListScreen from './src/screen/AlarmListScreen';
import AddAlarmScreen from './src/screen/AddAlarmScreen';
import AddPotionScreen from './src/screen/AddPotionScreen';
import CalendarScreen from './src/screen/HistoryScreen';
import { NaviStackList } from './src/screen/NaviStack';

const Stack = createNativeStackNavigator<NaviStackList>();
function App() {
  console.log('App Rendered')

  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content"/>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Detail" component={DetailScreen} />
          <Stack.Screen name="AlarmList" component={AlarmListScreen} />
          <Stack.Screen name="AddAlarm" component={AddAlarmScreen} />
          <Stack.Screen name="AddPotion" component={AddPotionScreen} />
          <Stack.Screen name="History" component={CalendarScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
export default App;
