import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, Button, StyleSheet, TextInput } from 'react-native';
import text from '../locales/ko.json'

import BaseScreen from './BaseScreen';
import { Manager, Potion, Eating } from "../models/Manager";

const fields = [
  { key: 'name', type: 'input', label: text.add_screen_name_txt, placeholder: '이름 입력' },
  { key: 'type', type: 'button', label: text.add_screen_type_txt, onPress: () => console.log('type') },
  { key: 'bundleNum', type: 'button', label: text.add_screen_bundle_num_txt, onPress: () => console.log('key') },
  { key: 'todo', type: 'button', label: text.add_screen_todo_num_txt, onPress: () => console.log('todo') },
  { key: 'description', type: 'input', label: text.add_screen_description_txt, placeholder: '설명 입력' },
];

export default function AddPotionScreen({ navigation }: any) {
  const randomString = () => Math.random().toString(36).substring(2, 7);
    const [values, setValues] = useState<Record<string, string>>({
    name: `name_${randomString()}`,
    type: 'Capsule',
    bundleNum: `${Math.floor(Math.random() * 100)}`, // 0~99
    todo: `todo_${randomString()}`,
    description: `desc_${randomString()}`,
  });

  const handleSave = () => {
    const potion: Potion = {
      name: values.name,
      type: values.type as unknown as Eating,
      description: values.description,
      bundleNum: parseInt(values.bundleNum) || 0,
      Todo: parseInt(values.todo) || 0,
    };
    console.log('저장:', potion);
  };

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

                {field.type === 'input' && (
                  <TextInput
                    style={styles.input}
                    placeholder={field.placeholder}
                    value={values[field.key]}
                    onChangeText={(text) =>
                      setValues((prev) => ({ ...prev, [field.key]: text }))
                    }
                  />
                )}

                {field.type === 'button' && (
                  <Button
                    title={field.label}
                    onPress={() => {
                      if (field.key === 'type') setValues(prev => ({ ...prev, type: 'Capsule' }));
                      if (field.key === 'bundleNum') setValues(prev => ({ ...prev, bundleNum: (prev.todo || '') + '1' }));
                      if (field.key === 'todo') setValues(prev => ({ ...prev, todo: (prev.todo || '') + '1' }));
                    }}
                  />
                )}
              </View>
            ))}
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Button title={text.add_screen_out_btn} onPress={() => navigation.goBack()} />
            <Button title={text.add_screen_save_btn} onPress={() => {
              handleSave()
              navigation.navigate('AddAlarm')
            }} />
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