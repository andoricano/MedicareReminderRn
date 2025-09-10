import { Pressable, Text, StyleSheet, ViewStyle, StyleProp } from 'react-native';

type PotionListItemProps = {
  item: string;
  selected: string | null;
  onPress: (item: string) => void;
  style?: StyleProp<ViewStyle>;
  width?: number;
};

export function PotionListItem({ item, selected, onPress, style, width }: PotionListItemProps) {
  const isSelected = item === selected;

  return (
    <Pressable
      onPress={() => onPress(item)}
      style={({ pressed }) => [
        styles.container,
        style,
        { width },
        pressed && styles.pressed,
        isSelected && styles.selected,
      ]}
    >
      <Text style={styles.text}>
        {item} {isSelected ? "✔" : ""}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    marginVertical: 4,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  pressed: {
    opacity: 0.5,
  },
  selected: {
    backgroundColor: "#a0e0a0",
  },
  text: {
    textAlign: "center",
  },
});