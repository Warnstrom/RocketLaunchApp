import MapView from 'react-native-maps';
import * as React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
interface MapViewType {
  flongitude: string;
  flatitude: string;
  furl: string;
}

export const MapViewComponent = ({ flongitude, flatitude, furl }: MapViewType) => {
  return (
    <MapView
      initialRegion={{
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    ></MapView>
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
