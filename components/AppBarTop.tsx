import * as React from "react";
import { Appbar } from "react-native-paper";
import { StyleSheet } from "react-native";
interface AppbarTitleType {
  appTitle: string;
}
export const AppBarTop = ({ appTitle }: AppbarTitleType) => {
  return (
    <Appbar style={styles.bottom}>
      <Appbar.Content title={appTitle} />
    </Appbar>
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
