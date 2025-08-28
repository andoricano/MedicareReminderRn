import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, Button, StyleSheet, TextInput } from 'react-native';
import text from '../locales/ko.json'

import BaseScreen from './BaseScreen';

const fields = [
  { key: 'name',type:'input', label: text.add_screen_name_txt, placeholder: '이름 입력' },
  { key: 'type',type:'button', label: text.add_screen_type_txt, placeholder: '종류 선택',onPress: () => console.log('type') },
  { key: 'bundleNum',type:'button', label: text.add_screen_bundle_num_txt, placeholder: '묶음 수 입력',onPress: () => console.log('key') },
  { key: 'todo',type:'button', label: text.add_screen_todo_num_txt, placeholder: '할 일 개수 입력',onPress: () => console.log('todo') },
  { key: 'description',type:'input', label: text.add_screen_description_txt, placeholder: '설명 입력' },
];

export default function AddAlarmScreen({ navigation }: any) {
  return (
    <BaseScreen style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', padding: 20 }}>
          <Text style={styles.title}>{text.add_screen_title}</Text>

          <View style={{ gap: 16 }}>
            {fields.map((field) => (
              <View key={field.key}>
                <Text style={styles.scheme}>{field.label}</Text>
                
            {field.type === 'input' && <TextInput style={styles.input} placeholder={field.placeholder} />}
            {field.type === 'button' && <Button title={field.label} onPress={field.onPress} />}
              </View>
            ))}
          </View>

          {/* 버튼 */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Button title={text.add_screen_out_btn} onPress={() => navigation.goBack()} />
            <Button title={text.add_screen_save_btn} onPress={() => console.log('저장 클릭')} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
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