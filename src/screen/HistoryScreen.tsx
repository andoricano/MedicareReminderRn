import React, { useState } from "react";
import { Text, Pressable, View, StyleSheet } from "react-native";
import BaseScreen from "./BaseScreen";
import AlarmCalendar from "../components/AlarmCalendar";
import { CommonList } from "../components/CommonList";

type Potion = {
  id: string;
  name: string;
  date: string; 
  eatingType?: string;
  totalNum?: number;
};

export default function HistoryScreen() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // tmp data
  const [potions, setPotions] = useState<Potion[]>([
    { id: "1", name: "Potion A", date: "2025-09-16", eatingType: "Type1", totalNum: 2 },
    { id: "2", name: "Potion B", date: "2025-09-17", eatingType: "Type2", totalNum: 1 },
    { id: "3", name: "Potion C", date: "2025-09-16", eatingType: "Type1", totalNum: 3 },
  ]);

  const filteredPotions = selectedDate
    ? potions.filter(p => p.date === selectedDate)
    : [];

  const handleDelete = (id: string) => {
    setPotions(prev => prev.filter(p => p.id !== id));
  };

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
        data={filteredPotions}
        keyExtractor={item => item.id}
        renderItem={(item) => (
          <Pressable onPress={() => handleDelete(item.id)} style={styles.card}>
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