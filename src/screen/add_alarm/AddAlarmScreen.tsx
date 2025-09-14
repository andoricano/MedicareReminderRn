import React, { useState } from 'react';
import { Pressable, Text, View, Button, StyleSheet } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SelectListItem } from '../../components/SelectListItem';
import { NumberSelectList } from '../../components/NumberSelectList';
import BaseScreen from '../BaseScreen';
import { useManager } from '../../ManagerContext';
import text from '../../locales/ko.json'

type AddingAlarm = {
  dayOfWeek: string,
  todoNum: number,
  alarmList: string[]
};

export default function AddAlarmScreen({ navigation, route }: any) {
  const [alarmValues, setAlarmValues] = useState<AddingAlarm>({
    dayOfWeek: "",
    todoNum: -1,
    alarmList: [],
  });
  const { potion } = route.params;
  const { addPotionCtx } = useManager();
  return (
    <BaseScreen style={{ flex: 1, justifyContent: 'space-between' }}>

      <View>
        <ScreenHeader
          navigation={navigation}
          title={text.add_alarm_title}
        />

        <SelectListItem
          label={text.add_alarm_cycle_label}
          list={
            [
              text.common_mon,
              text.common_tue,
              text.common_wed,
              text.common_thu,
              text.common_fri,
              text.common_sat,
              text.common_sun
                         ]}
          descending={false}
          multiSelect={true}
          showSelectAll={true}
          onSelect={(values) =>
            console.log(values)
            // setAlarmValues((prev) => ({
            //   ...prev,
            //   dayOfWeek: values,
            // }))
          }
        />

        <NumberSelectList
          label={text.add_alarm_daily_amount_label}
          min={1}
          max={10}
          onSelect={(v) => {
            const startHour = 8;
            const list = Array.from({ length: v }, (_, i) => {
              const date = new Date();
              date.setHours(startHour + i, 0, 0, 0);
              return date.toISOString();
            });

            const newState = {
              ...alarmValues,
              todoNum: v,
              alarmList: list,
            };
            setAlarmValues(newState);

            console.log(`new: num=${newState.todoNum}, alarmList=[${newState.alarmList.join(', ')}]`);
          }}
        />


      </View>

      <Button
        title="Done"
        onPress={async () => {
          const updatedPotion = {
            ...potion,
            times: alarmValues.alarmList,
            Todo: alarmValues.todoNum,
          };

          console.log("updatedPotion:", JSON.stringify(updatedPotion));

          await addPotionCtx(updatedPotion);
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