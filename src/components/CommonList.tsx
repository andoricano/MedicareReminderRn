import React from "react";
import { View, FlatList, Pressable, Text, StyleSheet } from "react-native";

type CommonListProps<T> = {
  data: T[];
  renderItem: (item: T) => React.ReactElement | null;
  keyExtractor?: (item: T, index: number) => string;
  containerHeight?: number;
};

export function CommonList<T>({
  data,
  renderItem,
  keyExtractor,
  containerHeight = 500,
}: CommonListProps<T>) {
  return (
    <View style={{ width: "100%", height: containerHeight, paddingTop: 20 }}>
      <FlatList
        data={data}
        keyExtractor={keyExtractor || ((_, index) => index.toString())}
        renderItem={({ item }) => renderItem(item)}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
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