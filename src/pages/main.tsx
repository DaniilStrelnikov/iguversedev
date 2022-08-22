import Octicons from "@expo/vector-icons/build/Octicons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import {
  Button,
  CircleButton,
  ColorPicker,
  QrView,
  Spacer,
} from "../components";
import { RootStackParamList } from "../navigation/navigator";

type ImageLayout = {
  width?: number;
  height?: number;
};

export const Main = () => {
  const [color, setColor] = useState("#ba94ea");
  const route = useRoute<RouteProp<RootStackParamList, "main">>();
  const navigation = useNavigation();
  const [imageLayout, setImageLayout] = useState<ImageLayout>();

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView
        style={style.safeAreaView}
        forceInset={{ top: "never", bottom: "always" }}
      >
        <View
          style={{ flex: 1 }}
          onLayout={(event) => {
            setImageLayout({
              width: event.nativeEvent.layout.width,
              height: event.nativeEvent.layout.height,
            });
          }}
        >
          <Image
            source={{
              uri: route.params.image,
            }}
            resizeMode={"cover"}
            style={[
              style.image,
              { height: imageLayout?.height, width: imageLayout?.width },
            ]}
          />

          <Spacer />
          <View style={style.headerButton}>
            <CircleButton onPress={() => navigation.goBack()}>
              <Octicons size={26} color="gray" name="arrow-left" />
            </CircleButton>
            <CircleButton onPress={() => {}}>
              <Octicons size={26} color="gray" name="upload" />
            </CircleButton>
          </View>

          <View style={style.qrStyle}>
            <QrView pickedColor={color} image={route.params.image} />
          </View>
        </View>

        <ColorPicker pickColor={(color) => setColor(color)} />
      </SafeAreaView>
    </View>
  );
};

const style = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: "lightgray",
  },
  image: {
    position: "absolute",
  },
  headerButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },
  qrStyle: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
