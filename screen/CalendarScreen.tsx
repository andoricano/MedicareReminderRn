import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import BaseScreen from './BaseScreen';

export default function CalendarScreen({ navigation }: any) {
    
      return (
        <BaseScreen>
    
              <Text style={styles.title}>AlarmList</Text>
              <View style={{ margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Button
                  title="Detail"
                  onPress={() => navigation.navigate('Detail')}
                />
              </View>
        
    
    
        </BaseScreen>
      );
}
const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold' },
});