import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Pressable } from 'react-native';

interface NumberSelectListProps {
    label: string;
    min: number;
    max: number;
    descending?: boolean;
    onSelect: (value: number) => void;
}

export function NumberSelectList({ label, min, max, descending = false, onSelect }: NumberSelectListProps) {
    const [selected, setSelected] = useState<number | null>(null);

    const values = descending
        ? Array.from({ length: max - min + 1 }, (_, i) => max - i)
        : Array.from({ length: max - min + 1 }, (_, i) => min + i);

    const handlePress = (value: number) => {
        setSelected(value);
        onSelect(value);
    };

    return (
        <View style={{ marginVertical: 10 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 5 }}>{label}</Text>
            <FlatList
                horizontal
                data={values}
                keyExtractor={(item) => item.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => handlePress(item)}
                        style={{
                            padding: 10,
                            margin: 5,
                            backgroundColor: selected === item ? 'dodgerblue' : 'lightgray',
                            borderRadius: 5,
                        }}
                    >
                        <Text style={{ color: selected === item ? 'white' : 'black' }}>{item}</Text>
                    </Pressable>
                )}
            />
        </View>
    );
}