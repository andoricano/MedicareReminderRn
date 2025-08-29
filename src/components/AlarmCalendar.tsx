import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text, StyleSheet } from 'react-native';
import color from '../rsc/color';

export type AlarmCalendarHandle = {
  selectAll: () => void;
  select2Days: () => void;
};
const AlarmCalendar = forwardRef<AlarmCalendarHandle>((props, ref) => {
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [mode, setMode] = useState<'all' | '2days' | 'single'>('single');
  const getDayColor = (day: { dateString: string; day: number; month: number; year: number; }) => {
    const date = new Date(day.dateString);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) return color.sunday;    
    if (dayOfWeek === 6) return color.saturday;   
    return 'black';                      
  };

  const getMarkSymbol = (dateStr: string) => {
    if (mode === 'all') return '📝';      
    if (mode === '2days') {
      const index = selectedDates.indexOf(dateStr);
      return index % 2 === 0 ? '⭐' : '';  
    }
    return '📌';                            
  };

  useImperativeHandle(ref, () => ({
    selectAll: () => {
      console.log("selectAll");
      const allDates = ['2025-08-29', '2025-08-30', '2025-08-31']; // 예시, 실제 달력 범위로 바꾸세요
      setSelectedDates(allDates);
      setMode('all');
    },
    select2Days: () => {
      console.log("select2Days");
      const twoDays = ['2025-08-29', '2025-08-30'];
      setSelectedDates(twoDays);
      setMode('2days');
    }
  }));

  const markedDates = selectedDates.reduce((acc, date) => {
    acc[date] = { customStyles: { container: {}, text: { color: 'black' } }, mark: getMarkSymbol(date) };
    return acc;
  }, {} as any);

  return (
    <Calendar
      markedDates={markedDates}
      dayComponent={({ date, state }) => {
        if (!date) return null;
        const symbol = selectedDates.includes(date.dateString) ? getMarkSymbol(date.dateString) : '';
        return (
          <View style={{ alignItems: 'center', margin: 2 }}>
            <Text style={{ color: state === 'disabled' ? 'gray' : getDayColor(date) }}>
              {date.day}{symbol}
            </Text>
          </View>
        );
      }}
      onDayPress={(day) => {
        setSelectedDates([day.dateString]);
        setMode('single');
      }}
    />
  );
});

export default AlarmCalendar;