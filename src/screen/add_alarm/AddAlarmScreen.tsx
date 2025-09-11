import React, { useState } from 'react';
import { Pressable, Text, View, Button, StyleSheet } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { NumberSelectList } from '../../components/NumberSelectList';
import BaseScreen from '../BaseScreen';
import { useManager } from '../../ManagerContext';
import { NumberStepper } from '../../components/NumberStepper';
import text from '../../locales/ko.json'

type AddingAlarm = {
  cycle: number,
  todoNum: number,
  alarmList: number[]
};

export default function AddAlarmScreen({ navigation, route }: any) {
  const [alarmValues, setAlarmValues] = useState<AddingAlarm>({
    cycle: 0,
    todoNum: -1,
    alarmList: [],
  });
  const { potion } = route.params; console.log("potion:" + JSON.stringify(potion));
  const { addPotionCtx } = useManager();
  return (
    <BaseScreen style={{ flex: 1, justifyContent: 'space-between' }}>

      <View>
        <ScreenHeader
          navigation={navigation}
          title={text.add_alarm_title}
        />
        

      <NumberSelectList
        label={text.add_alarm_cycle_label}
        min={0}
        max={7}
        onSelect={(v) => console.log('선택된 값:', v)}
        descending ={true}
      />
      
      <NumberSelectList
        label={text.add_alarm_daily_amount_label}
        min={1}
        max={10}
        onSelect={(v) => console.log('선택된 값:', v)}
      />


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
  scheme: { fontSize: 23, fontWeight: 'bold', marginTop: 12, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    fontSize: 18,
    marginBottom: 12,
  },
});