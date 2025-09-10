import text from '../../locales/ko.json'
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Eating } from "../../models/Manager";


import { PotionListItem } from './PotionListItem';
const eatingList = Object.values(Eating);

type EatingListProps = {
  onSelect: (selected: Eating) => void;
};

export function EatingList({ onSelect }: EatingListProps) {
    const [selected, setSelected] = useState<Eating | null>(null);

    const grouped: Eating[][] = [];
    for (let i = 0; i < eatingList.length; i += 2) {
        grouped.push(eatingList.slice(i, i + 2));
    }

    return (
        <View style={{ width: '100%', height: 160 }}>
            <Text style={styles.label}>{text.add_screen_type_txt}</Text>
            <FlatList
                data={grouped}
                keyExtractor={(_, index) => index.toString()}
                horizontal
                renderItem={({ item }) => (
                    <View style={styles.column}>
                        {item.map(
                            (e) => (
                                <PotionListItem
                                    key={e}
                                    item={e}
                                    selected={selected}
                                    onPress={(val) => {
                                        onSelect(val as Eating)
                                        setSelected(val as Eating);
                                    }}
                                    style={styles.row}
                                    width={120}
                                />
                            )
                        )}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    title: { fontSize: 30, fontWeight: 'bold', marginBottom: 20 },
    label: { fontSize: 25, fontWeight: 'bold', marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        fontSize: 18,
        marginBottom: 12,
    },
    row: {
        flex: 1,
        margin: 4,
        padding: 12,
        borderWidth: 2,
        borderRadius: 40,
        borderColor: "#ddd",
        alignItems: "center",
        justifyContent: "center",
    },
    pressed: {
        backgroundColor: "#a43838ff",
    },
    cell: {
        flex: 1,
        marginRight: 10,
    },
    column: {
        flexDirection: "column",
        marginRight: 8,
    },
});