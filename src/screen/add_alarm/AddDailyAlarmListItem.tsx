import React from "react";
import { View, Text, Pressable, Button, StyleSheet } from "react-native";

type AddDailyAlarmListItemProps = {
  time: string;
  editOnClick : ()=>void;
  deleteOnClick : ()=>void;
};


export function AddDailyAlarmListItem({
  time,
  editOnClick,
  deleteOnClick,
}: AddDailyAlarmListItemProps) {
  return (
    <Pressable onPress={editOnClick} style={styles.container}>
      <Text style={styles.text}>{time}</Text>

      <Button title="삭제" onPress={deleteOnClick} />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    flexDirection: "row", 
  },
  text: {
    textAlign: "center",
    fontSize: 16,
    flex: 1,
  },
  deleteButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#f55",
    marginLeft: 10,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
});