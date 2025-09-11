import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Props } from '../../components/BaseTextInput';

export function AddAlarmInput({ label, value, onChangeText, placeholder, height = 30 }: Props) {
    return (
        <View style={{ flexDirection: 'column', height }}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                value={value}
                onChangeText={onChangeText}
                multiline={true}    
                textAlignVertical="top"
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
        flex: 1,
    },
});