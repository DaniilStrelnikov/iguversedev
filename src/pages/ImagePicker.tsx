import { useNavigation } from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import {
  launchImageLibraryAsync,
  MediaTypeOptions,
  useMediaLibraryPermissions,
} from "expo-image-picker";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button } from "../components";
import { RootStackParamList } from "../navigation/navigator";

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "image"
>;

export const ImagePicker = () => {
  const [status, requestPermission] = useMediaLibraryPermissions();
  const navigation = useNavigation<ProfileScreenNavigationProp>();

  useEffect(() => {
    requestPermission();
  }, []);

  const handlePickImage = async () => {
    if (status !== "none") {
      let result = await launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.cancelled) {
        navigation.navigate("main", {
          image: result.uri,
        });
      }
    }
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={style.name}>Iguverse</Text>
      <Text style={style.margin}>test application</Text>
      <Button label="load image" onPress={() => handlePickImage()} />
    </View>
  );
};

const style = StyleSheet.create({
  name: {
    fontSize: 40,
    fontWeight: "600",
    marginBottom: 10,
  },
  margin: {
    marginBottom: 20,
  },
});
