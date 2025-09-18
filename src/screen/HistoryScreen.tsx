import React, { useEffect, useState } from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";
import BaseScreen from "./BaseScreen";
import AlarmCalendar from "../components/AlarmCalendar";
import { CommonList } from "../components/CommonList";
import { useManager } from '../ManagerContext';


type Potion = {
  id: string;
  name: string;
  date: string; 
  eatingType?: string;
  totalNum?: number;
};

export default function HistoryScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const { managers, loadPotions } = useManager();

  useEffect(()=>{
    loadPotions();
  },[])



  return (
    <BaseScreen>
      <AlarmCalendar
        selectedDate={selectedDate}
        onDateSelect={setSelectedDate}
      />

      {selectedDate && (
        <Text style={{ marginTop: 16, fontWeight: "bold" }}>
          {selectedDate} 데이터
        </Text>
      )}

      <CommonList
        data={managers}
        keyExtractor={item => item.id}
        renderItem={(item) => (
          <Pressable onPress={() => console.log(item.ate)} style={styles.card}>
            <Text style={styles.titleText}>{item.name}</Text>
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Text>타입: {item.eatingType}</Text>
              <Text>총 개수: {item.totalNum}</Text>
            </View>
          </Pressable>
        )}
      />
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fff",
  },
  titleText: { fontSize: 16, fontWeight: "bold" },
});