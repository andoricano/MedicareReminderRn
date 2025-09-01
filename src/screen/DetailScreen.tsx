import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BaseScreen from './BaseScreen';
import text from '../locales/ko.json'

export default function DetailScreen({ navigation }: any) {
    
      return (
        <BaseScreen>
              <Text style={styles.title}>{text.deatil_screen_title}</Text>
              <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                
              </View>
        </BaseScreen>
      );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});