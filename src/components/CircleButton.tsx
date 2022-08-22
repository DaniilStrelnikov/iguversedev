import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

type Props = {
  children: React.ReactElement;
  onPress: () => void;
};

export const CircleButton = ({ children, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={style.circleButton}>{children}</View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  circleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
});
