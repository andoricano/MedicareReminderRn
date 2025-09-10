import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View, Text, Button, StyleSheet } from 'react-native';
import text from '../../locales/ko.json'
import uuid from "react-native-uuid";

import BaseScreen from '../BaseScreen';
import { Potion, Eating } from "../../models/Manager";
import { EatingList } from './PotionList';
import { AddAlarmInput } from './BaseTextInput';

const exampleName = [
  text.add_screen_recovery,
  text.add_screen_nourishment,
  text.add_screen_fatigue,
  text.add_screen_hair_loss,
]
type AddingEatting = {
  name: string;
  type: Eating;
  bundleNum: string;
  todo: string;
  description: string;
};

export default function AddPotionScreen({ navigation }: any) {
  const randomExample = getRandomExample();
  const bundleNum = Math.floor(Math.random() * 100)
  const [eatingValues, setEatingValues] = useState<AddingEatting>({
    name: randomExample,
    type: Eating.None,
    bundleNum: `${bundleNum}`,
    todo: `${bundleNum - 1}`,
    description: ""
  });

  const makePotion = (): Potion => ({
    id: String(uuid.v4()),
    name: eatingValues.name,
    eatingType: eatingValues.type,
    time: new Date().toISOString(),
    bundleNum: parseInt(eatingValues.bundleNum, 10),
    Todo: parseInt(eatingValues.bundleNum, 10),
    ate: 0,
    totalNum: 0,
    eatingNum: 0,
    restNum: 0,
    description: eatingValues.description,
  });

  return (
    <BaseScreen style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', padding: 20 }}>
          <Text style={styles.title}>{text.add_screen_title}</Text>

          <AddAlarmInput
            label={text.add_screen_description_txt}
            placeholder={text.add_screen_name_txt_place_holder}
            value={eatingValues.name}
            onChangeText={(text) => setEatingValues((prev) => ({ ...prev, name: text }))}
          />
          
          <EatingList
            onSelect={(selectedType) => {
              console.log("선택된 타입:", selectedType);
              setEatingValues((prev) => ({ ...prev, type: selectedType }));
            }}
          />

          <AddAlarmInput
            label={text.add_screen_description_txt}
            placeholder={text.add_screen_description_place_holder}
            value={eatingValues.description}
            onChangeText={(text) => setEatingValues((prev) => ({ ...prev, description: text }))}
          />

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Button title={text.add_screen_out_btn} onPress={() => navigation.goBack()} />
            <Button title={text.add_screen_save_btn} onPress={() => {
              const potion = makePotion();
              console.log(potion);
              navigation.navigate('AddAlarm', { potion: makePotion() })
            }} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </BaseScreen>
  );
}


const getRandomExample = () => {
  const index = Math.floor(Math.random() * exampleName.length);
  return exampleName[index];
};

const styles = StyleSheet.create({
  title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
  label: { fontSize: 25, fontWeight: 'bold', marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 18,
    marginBottom: 12,
  },
  row: {
    flex: 1,
    margin: 4,
    padding: 12,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: "#ddd",
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: {
    backgroundColor: "#a43838ff",
  },
  cell: {
    flex: 1,
    marginRight: 10,
  },
  column: {
    flexDirection: "column",
    marginRight: 8,
  },
});