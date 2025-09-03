import React, { useRef } from 'react';
import { RouteProp } from '@react-navigation/native';
import { NaviStackList } from './NaviStack';
import { View, Button, StyleSheet } from 'react-native';

import BaseScreen from './BaseScreen';
import AlarmCalendar, { AlarmCalendarHandle } from '../components/AlarmCalendar';
import { Potion } from '../models/Manager';

type AddAlarmRouteProp = RouteProp<NaviStackList, 'AddAlarm'>;

export default function AddAlarmScreen({ navigation, route }: any) {
  const { potion } = route.params; 
  console.log(potion)
  const calendarRef = useRef<AlarmCalendarHandle>(null);
  return (
    <BaseScreen style={{ flex: 1 }}>
        <Button
          title="back"
          onPress={() => navigation.pop()}
        />
      <AlarmCalendar ref={calendarRef} />
      <View style={{ width: 250, margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="allcheck" onPress={() => calendarRef.current?.selectAll()} />
        <Button title="2day check" onPress={() => calendarRef.current?.select2Days()} />
        <Button
          title="Done"
          onPress={() => navigation.pop(2)}
        />
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
  scheme: { fontSize: 23, fontWeight: 'bold', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 18,
    marginBottom: 12,
  },
});