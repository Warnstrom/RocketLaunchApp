import MapView from "react-native-maps";
import * as React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
interface MapViewType {
  flongitude: string;
  flatitude: string;
  furl: string;
}
//{ flongitude, flatitude, furl }: MapViewType
export const MapViewComponent = () => {
  return (
    <View>
      <Text>dasd</Text>
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      ></MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    backgroundColor: "#1d3557",
    left: 0,
    right: 0,
    paddingTop: 25,
    height: 80,
    top: 0,
  },
});
