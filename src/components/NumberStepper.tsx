import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ViewStyle, StyleProp } from 'react-native';

export interface StepperCallback {
    Label: React.ComponentType;
    ment: string,
    min?: number,
    max?: number,
    onClick: (num: number) => void;
    height?: number;
    stepperStyle?: StyleProp<ViewStyle>;
}

export function NumberStepper(
    { Label, ment, min = 0, max = 9999, onClick, height, stepperStyle }: StepperCallback
) {
    const [value, setValue] = useState(-1);

    const increment = () => {
        setValue(prev => (prev < max ? prev + 1 : max));
        onClick(value)
    }
    const decrement = () => {
        setValue(prev => (prev > min ? prev - 1 : min));
        onClick(value)
    }

    return (
        <View style={{ flexDirection: 'column', height }}>
            <Label />
            <View style={[stepperStyle, styles.container]}>
                <Button title="-" onPress={decrement} />
                <Text style={styles.value}>
                    {value === -1 ? ment : value}
                </Text>
                <Button title="+" onPress={increment} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    value: {
        marginHorizontal: 20,
        fontSize: 20,
    },
    container: {
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 12,
        backgroundColor: "#fff",
    },
});