import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import BaseScreen from './BaseScreen';
interface MenuItem {
  id: string;
  title: string;
  navigateTo: string;
}

const ItemCard = ({ item, navigation }: { item: MenuItem; navigation: any }) => {
  return (
    <View style={styles.itemCard}>
      <Button title={item.title} onPress={() => console.log(item.title)} />
    </View>
  );
};

interface CustomListProps {
  data: MenuItem[];
  navigation: any;
}

const CustomList = ({ data, navigation }: CustomListProps) => {
  return (
    <View style={{ height: 200 }}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ItemCard item={item} navigation={navigation} />}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
};

export default function HomeScreen({ navigation }: any) {

  const menuData: MenuItem[] = [
    { id: "1", title: "이력 보러 가기", navigateTo: "History" },
    { id: "2", title: "알람 확인 하기", navigateTo: "AlarmList" },
  ];
  return (
    <BaseScreen style={styles.center}>

      <Text style={styles.title}>Playground Menu</Text>

      <CustomList data={menuData} navigation={navigation} />

      <View style={{ width:250, margin: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          title="Calendar"
          onPress={() => navigation.navigate('Calendar')}
        />

        <Button
          title="AlarmList"
          onPress={() => navigation.navigate('AlarmList')}
        />
      </View>


    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  itemCard: {
    marginVertical: 10,
  },
  separator: {
    height: 10,
  },
});