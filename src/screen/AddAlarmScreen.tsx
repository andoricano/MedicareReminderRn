import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, Button, StyleSheet, TextInput } from 'react-native';
import text from '../locales/ko.json'

import BaseScreen from './BaseScreen';
import { Potion, Eating } from '../ManagerContext'


export default function AddAlarmScreen({ navigation }: any) {
  const [values, setValues] = useState<Record<string, string>>({
    name: '',
    type: '',
    bundleNum: '',
    todo: '',
    description: '',
  });

  return (
    <BaseScreen style={{ flex: 1 }}>
      <Button title={text.add_screen_out_btn} onPress={() => navigation.goBack()} />
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