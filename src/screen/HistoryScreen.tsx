import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BaseScreen from './BaseScreen';
import text from '../locales/ko.json';
import AlarmCalendar from '../components/AlarmCalendar';

export default function HistoryScreen({ navigation }: any) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  return (
    <BaseScreen>
      <Text style={styles.title}>{text.history_screen_title}</Text>

      <AlarmCalendar
        selectedDate={selectedDate}
        onDateSelect={(date) =>{
          setSelectedDate(date)
        }}
      />

      <Button
        title="Detail"
        onPress={() => navigation.navigate('Detail')}
      />
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: 'bold' },
});
