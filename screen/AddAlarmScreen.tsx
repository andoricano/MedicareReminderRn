import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import text from '../locales/ko.json'

import BaseScreen from './BaseScreen';

export default function AddAlarmScreen({ navigation }: any) {
  return (
    <BaseScreen>
      <Text style={styles.title}>{text.add_screen_title}</Text>

      <View style={[styles.container, { }]}>
          <Text style={styles.scheme}>{text.add_screen_name_txt}</Text>
          <Text style={styles.scheme}>{text.add_screen_type_txt}</Text>
          <Text style={styles.scheme}>{text.add_screen_bundle_num_txt}</Text>
          <Text style={styles.scheme}>{text.add_screen_todo_num_txt}</Text>
          <Text style={styles.scheme}>{text.add_screen_description_txt}</Text>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
          <Button
            title={text.add_screen_out_btn}
            onPress={() => navigation.goBack()}
          />
          <Button
            title={text.add_screen_save_btn}
            onPress={() => console.log('저장 클릭')}
          />
        </View>
      </View>
    </BaseScreen>
  );
}
const styles = StyleSheet.create({
  container: { marginTop:20,flex: 1, justifyContent: 'space-between',},
  title: { fontSize: 30, fontWeight: 'bold' },
  scheme: { fontSize: 23, fontWeight: 'bold' },
});