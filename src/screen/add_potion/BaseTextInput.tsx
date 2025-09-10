import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import text from '../../locales/ko.json';


type Props = {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
};

export function AddAlarmInput({ label, value, onChangeText, placeholder }: Props) {
    return (
        <View style={{ flexDirection: 'column' }}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    label: { fontSize: 25, fontWeight: 'bold', marginBottom: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        padding: 10,
        fontSize: 18,
        marginBottom: 12,
    },
});