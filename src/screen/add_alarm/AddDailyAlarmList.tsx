import React from "react";
import {
  View,
  FlatList,
  Pressable,
  Text,
  StyleSheet,
} from "react-native";

type AddDailyAlarmListProps = {
  item: string[];
  onAdd: () => void;
};

export function AddDailyAlarmList({ item, onAdd }: AddDailyAlarmListProps) {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={item}
        keyExtractor={(v, i) => `${v}-${i}`}
        renderItem={({ item: value }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{value}</Text>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
      />

      {/* 리스트 끝에 버튼 */}
      <View style={styles.addButtonContainer}>
        <Pressable style={styles.addButton} onPress={onAdd}>
          <Text style={styles.addText}>＋</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    padding: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  itemText: {
    textAlign: "center",
    fontSize: 16,
  },
  addButtonContainer: {
    marginTop: 16,
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "dodgerblue",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  addText: {
    color: "#fff",
    fontSize: 32,
    lineHeight: 32,
  },
});