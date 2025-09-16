import React from 'react';
import { Calendar } from 'react-native-calendars';
import { View, Text, TouchableOpacity } from 'react-native';
import color from '../rsc/color';

type Props = {
  selectedDate: string | null;
  onDateSelect: (date: string) => void;
};

const AlarmCalendar = ({ selectedDate, onDateSelect }: Props) => {
  const getDayColor = (day: { dateString: string }) => {
    const date = new Date(day.dateString);
    const dayOfWeek = date.getDay();
    if (dayOfWeek === 0) return color.sunday;
    if (dayOfWeek === 6) return color.saturday;
    return 'black';
  };

  return (
    <Calendar
      markedDates={
        selectedDate
          ? {
            [selectedDate]: {
              selected: true,
              selectedColor: '#ffd54f',
            },
          }
          : {}
      }

      dayComponent={({ date, state }) => {
        if (!date) return null;
        const isSelected = selectedDate === date.dateString;

        return (
          <TouchableOpacity onPress={() => onDateSelect(date.dateString)}>
            <View style={{ alignItems: 'center', justifyContent: 'center', width: 32, height: 32 }}>
              <Text
                style={{
                  color: state === 'disabled' ? 'gray' : getDayColor(date),
                  fontWeight: isSelected ? 'bold' : 'normal',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                  width: 28,
                  height: 28,
                  borderRadius: 14,
                  backgroundColor: isSelected ? '#ffd54f' : 'transparent',
                }}
              >
                {date.day}
              </Text>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
};

export default AlarmCalendar;
