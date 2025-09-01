import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BaseScreen from './BaseScreen';
import text from '../locales/ko.json'

export default function HistoryScreen({ navigation }: any) {

  return (
    <BaseScreen>
      <Text style={styles.title}>{text.history_screen_title}</Text>
      <Button
        title="Detail"
        onPress={() => navigation.navigate('Detail')}
      />
    </BaseScreen>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});