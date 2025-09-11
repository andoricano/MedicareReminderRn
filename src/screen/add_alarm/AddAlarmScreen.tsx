import React, { useState } from 'react';
import { Pressable, Text, View, Button, StyleSheet } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';

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

        <NumberStepper
          Label={() =>
            <Text style={styles.scheme}>
              {text.add_alarm_cycle_label}
            </Text>
          }
          min = {0}
          max = {24}
          onClick={(num) =>
            setAlarmValues(prev => ({ ...prev, cycle: num }))
          }
          stepperStyle={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 10,
            padding: 10,
            borderRadius: 8,
          }}
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