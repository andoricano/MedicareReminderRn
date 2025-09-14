import React from "react";
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";

type AddDailyAlarmListProps = {
    item: string[];
    onAdd: () => void;
};

export function AddDailyAlarmList({ item, onAdd }: AddDailyAlarmListProps) {
  return (
    <View style={{ flex: 1}}>
      <View style={{ alignItems: "center" }}>
        <Pressable style={styles.addAlarmButton} onPress={onAdd}>
          <Text style={styles.addAlarmText}>알람 추가하기</Text>
        </Pressable>
      </View>

      <View style={{ marginTop: 16 }}>
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
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
    addAlarmButton: {
        backgroundColor: "dodgerblue",
        width: "50%",
        paddingVertical: 12,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    addAlarmText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
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
    itemText: { textAlign: "center", fontSize: 16 },
});