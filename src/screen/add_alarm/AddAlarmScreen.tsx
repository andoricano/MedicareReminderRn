import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import BaseScreen from '../BaseScreen';
import { useManager } from '../../ManagerContext';


type AddingAlarm = {
  daily : number,
  todoNum : number,
  alarmList : number[]
};

export default function AddAlarmScreen({ navigation, route }: any) {
  const [alarmValues, setAlarmValues] = useState<AddingAlarm>({
    daily: -1,
    todoNum: -1,
    alarmList : [],
  });
  const { potion } = route.params; console.log("potion:" + JSON.stringify(potion));
  const { addPotionCtx } = useManager();
  return (
    <BaseScreen style={{ flex: 1 }}>
      <Button
        title="back"
        onPress={() => navigation.pop()}
      />
      <View style={{ width: 250, margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button title="allcheck" onPress={() => { }} />
        <Button title="2day check" onPress={() => { }} />

      </View>
        <Button
          title="Done"
          onPress={async () => {
            await addPotionCtx(potion);
            navigation.pop(2);
          }}
        />
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