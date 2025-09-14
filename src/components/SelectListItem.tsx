import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Pressable } from 'react-native';

interface SelectListItemProps {
  label: string;
  list: string[];
  descending?: boolean;
  multiSelect?: boolean;
  showSelectAll?: boolean; // All 버튼 여부
  onSelect: (values: string[]) => void;
}

export function SelectListItem({
  label,
  list,
  descending = false,
  multiSelect = false,
  showSelectAll = false,
  onSelect,
}: SelectListItemProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const values = descending ? [...list].reverse() : list;

  const handlePress = (value: string) => {
    let newSelected: string[];
    if (multiSelect) {
      if (selected.includes(value)) {
        newSelected = selected.filter((v) => v !== value);
      } else {
        newSelected = [...selected, value];
      }
    } else {
      newSelected = [value];
    }
    setSelected(newSelected);
    onSelect(newSelected);
  };

  const handleSelectAll = () => {
    const newSelected = selected.length === list.length ? [] : list;
    setSelected(newSelected);
    onSelect(newSelected);
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={{ fontWeight: "bold", marginBottom: 5 }}>{label}</Text>
      <FlatList
        horizontal
        data={showSelectAll ? ["__ALL__", ...values] : values}
        keyExtractor={(item) => item}
        renderItem={({ item }) => {
          if (item === "__ALL__") {
            return (
              <Pressable
                onPress={handleSelectAll}
                style={{
                  padding: 10,
                  margin: 5,
                  backgroundColor:
                    selected.length === list.length ? "seagreen" : "lightgray",
                  borderRadius: 5,
                }}
              >
                <Text
                  style={{
                    color:
                      selected.length === list.length ? "white" : "black",
                  }}
                >
                  All
                </Text>
              </Pressable>
            );
          }

          return (
            <Pressable
              onPress={() => handlePress(item)}
              style={{
                padding: 10,
                margin: 5,
                backgroundColor: selected.includes(item)
                  ? "dodgerblue"
                  : "lightgray",
                borderRadius: 5,
              }}
            >
              <Text style={{ color: selected.includes(item) ? "white" : "black" }}>
                {item}
              </Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}