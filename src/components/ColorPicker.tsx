import React, { memo, useMemo } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { COLORS } from "../const";

type Props = {
  pickColor: (color: string) => void;
};

export const ColorPicker = memo(({ pickColor }: Props) => {
  return (
    <View style={style.view}>
      <FlatList
        data={COLORS}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={style.handler}
            onPress={() => pickColor(item)}
          >
            <View style={{ ...style.color, backgroundColor: item }} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
});

const style = StyleSheet.create({
  color: {
    width: 35,
    height: 35,
    borderRadius: 20,
  },
  handler: {
    width: 45,
    height: 45,
    marginHorizontal: 5,

    borderWidth: 0.5,
    borderRadius: 25,
    borderColor: "gray",

    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  view: {
    flexDirection: "row",
    backgroundColor: "lightgray",
    padding: 15,
  },
});
