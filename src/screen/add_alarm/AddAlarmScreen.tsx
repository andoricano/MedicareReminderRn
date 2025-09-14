import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { ScreenHeader } from '../../components/ScreenHeader';
import { SelectListItem } from '../../components/SelectListItem';
import { AddDailyAlarmList } from './AddDailyAlarmList';
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
    <BaseScreen style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ flex: 1 }}>
        <ScreenHeader navigation={navigation} title={text.add_alarm_title} />

        <SelectListItem
          label={text.add_alarm_cycle_label}
          list={[text.common_mon, text.common_tue, text.common_wed, text.common_thu, text.common_fri, text.common_sat, text.common_sun]}
          descending={false}
          multiSelect={true}
          showSelectAll={true}
          onSelect={(values) => console.log(values)}
        />

        <View style={{ flex: 1 }}>
          <AddDailyAlarmList 
          item={["202", "2023", "2302", "3202"]}
          onAdd={()=> console.log("yeah")}
           />
        </View>
      </View>

      <View style={{ padding: 16 }}>
        <Button
          title="Done"
          onPress={async () => {
            const updatedPotion = {
              ...potion,
              times: alarmValues.alarmList,
              Todo: alarmValues.todoNum,
            };
            await addPotionCtx(updatedPotion);
            navigation.pop(2);
          }}
        />
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1, flexDirection: 'column' },
  content: { flex: 1 },
  listContainer: {
    backgroundColor: '#f5f5f5',
    marginTop: 16,
    padding: 16,
  },
  buttonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
});