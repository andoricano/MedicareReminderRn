import { Calendar } from 'react-native-calendars';
import { View, Text, StyleSheet } from 'react-native';
import color from '../rsc/color';

export default function MyCalendar() {
  const getDayColor = (day: { dateString: string; day: number; month: number; year: number; }) => {
    const date = new Date(day.dateString);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) return color.saturday;
    if (dayOfWeek === 6) return color.sunday;
    return 'black';
  };

  return (
    <Calendar
      dayComponent={({ date, state }) => {
        if (!date) return null; // undefined 처리

        return (
          <View style={{ alignItems: 'center', margin: 2 }}>
            <Text style={{ color: state === 'disabled' ? 'gray' : getDayColor(date) }}>
              {date.day}
            </Text>
          </View>
        );
      }}
    />
  );
}