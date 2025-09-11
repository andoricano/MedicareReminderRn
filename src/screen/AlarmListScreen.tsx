import React from 'react';
import { Pressable, View, Text, Button, StyleSheet, FlatList } from 'react-native';
import BaseScreen from './BaseScreen';
import text from '../locales/ko.json'
import { useManager } from '../ManagerContext';
import { Potion } from "../models/Manager";
import '../test/CreateData'



const PotionList = ({ data }: { data: Potion[] }) => {
  const { deletePotionCtx } = useManager();
  return (
    <View style={{ width: '100%', height: 500, paddingTop: 20 }}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              console.log('클릭한 아이템:', JSON.stringify(item));
              deletePotionCtx(
                item.id,
                () => console.log('삭제 성공'),
                (err) => console.error('삭제 실패:', err)
              );
            }}

            style={styles.card}
          >
            <Text style={styles.titleText}>{item.eatingType}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{text.alarm_list_screen_item_type_info} : {item.eatingType}</Text>
              <Text>{text.alarm_list_screen_item_total_info} {item.totalNum}</Text>
            </View>
          </Pressable>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
};

export default function AlarmListScreen({ navigation }: any) {
  const { managers, setManagers } = useManager();

  return (
    <BaseScreen>

      <Text style={styles.title}>AlarmList</Text>
      <PotionList data={managers} />
      <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="AddPotion"
          onPress={() => navigation.navigate('AddPotion')}
        />
      </View>
    </BaseScreen>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
  itemCard: {
    marginVertical: 10,
  },
  separator: {
    height: 10,
  },

  card: {
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
});