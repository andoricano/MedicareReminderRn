import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export function ScreenHeader({ navigation, title }: { navigation: any; title: string }) {
    return (
        <View style={styles.container}>
            <Pressable onPress={() => navigation.pop()} style={styles.backButton}>
                <Ionicons name="arrow-back" size={24} color="#000" />
            </Pressable>
            <Text style={styles.title}>{title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButton: {
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        flex: 1,
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center'
    },
});