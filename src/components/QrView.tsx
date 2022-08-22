import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  pickedColor: string;
  image: string;
};

type contextProps = {
  translateX: number;
  translateY: number;
};

export const QrView = ({ pickedColor, image }: Props) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const PanGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    contextProps
  >({
    onStart: (_, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: () => {
      translateX.value = withSpring(0);
      translateY.value = withSpring(0);
    },
  });

  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={PanGestureEvent}>
      <Animated.View
        style={[
          style.container,
          rStyle,
          {
            backgroundColor: pickedColor,
          },
        ]}
      >
        <View
          style={{
            flexDirection: "row",
          }}
        >
          <Image source={{ uri: image }} style={style.image} />
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text style={style.color}>{pickedColor}</Text>
            <Text
              style={{ fontSize: 12, width: 140, color: "white" }}
              numberOfLines={2}
            >
              I play IguVerse and donate to Friends and Animals
            </Text>
          </View>
        </View>
        <Image source={require("../images/someQr.png")} style={style.qr} />
      </Animated.View>
    </PanGestureHandler>
  );
};

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 130,
    margin: 20,
    borderRadius: 13,
    justifyContent: "space-between",
  },
  qr: {
    width: 60,
    height: 60,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  color: {
    fontWeight: "600",
    fontSize: 22,
    marginBottom: 10,
    color: "white",
  },
  image: {
    width: 110,
    height: 110,
    margin: 10,
    borderRadius: 11,
  },
});
