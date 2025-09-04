import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import BaseScreen from './BaseScreen';
import text from '../locales/ko.json'
import { useManager } from '../ManagerContext';
import { Potion } from "../models/Manager";

const PotionList = ({ data }: { data: Potion[]; }) => {
  return (
    <View style={{ width: '100%', height: 500, paddingTop: 20 }}>
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.titleText}>{item.eatingType}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text>{text.alarm_list_screen_item_type_info} : {item.eatingType}</Text>
              <Text>{text.alarm_list_screen_item_total_info} {item.totalNum}</Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
};


export default function HomeScreen({ navigation }: any) {
  const { managers, loadPotions } = useManager(); // loadPotions 포함

  useEffect(() => {
    loadPotions();
  }, []);
  
  return (
    <BaseScreen style={styles.center}>
      <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
        <Text style={[styles.title, { flex: 1, textAlign: 'center' }]}>
          {text.title_screen_title}
        </Text>
      </View>
      <PotionList data={managers} />

      <View style={{ width: 250, margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="History"
          onPress={() => navigation.navigate('History')}
        />

        <Button
          title="AlarmList"
          onPress={() => navigation.navigate('AlarmList')}
        />
      </View>


    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

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