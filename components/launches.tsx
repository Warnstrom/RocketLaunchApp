import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View, Modal, Linking, TouchableHighlight } from "react-native";
import {  Button, Card, Paragraph, ActivityIndicator, Colors } from "react-native-paper";
import { mockLaunchData } from "./mockData";
import { mission } from "../api/getLaunches";
import Icon from "react-native-vector-icons/FontAwesome";
import moment from "moment";

export const launches = () => {
  const [visible, setVisible] = React.useState(false);
  const [launchData, setData] = useState<any>();
  const [modalData, setModalData] = useState<any>(mockLaunchData[0]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const missions = await mission.all("");
    setData(missions);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showModal = (item: any) => {
    setModalData(item);
    setVisible(true);
  };
  const hideModal = () => {
    setVisible(false);
  };

  const handlePress = (url: string) => {
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });
  };

  return (
    <View>
      {loading ? (
        <View>
          <ActivityIndicator style={{marginTop: 40}} animating={true} color={Colors.red800} />
        </View>
      ) : (
        <FlatList
          data={launchData}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Cover source={{ uri: item.image }} />
              <Card.Title
                title={[item.rocket?.configuration.name, " | ", item.mission?.name]}
                subtitle={[item.pad.name, " - ", item.pad.location.name]}
              />
              <Card.Content>
                <Paragraph>Date: {moment(item.net).format("LLL")}</Paragraph>
                <Paragraph>Launching {moment(item.net).fromNow()}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <Button style={styles.buttonStyles} mode="contained" onPress={() => showModal(item)}>
                  Read more
                </Button>
                <Button style={[styles.buttonStyles, { display: item.webcast_live ? "flex" : "none" }]} mode="contained" color="#e63946">
                  Watch live
                </Button>
              </Card.Actions>
              <Modal visible={visible} onDismiss={hideModal}>
                <Button style={{ height: 50, width: 50 }} onPress={hideModal}>
                  <Icon name="close" size={35} color="#900" />
                </Button>
                <Card style={styles.card}>
                  <Card.Title title="Description" />
                  <Card.Content>
                    <Paragraph>{modalData.mission?.description}</Paragraph>
                  </Card.Content>
                </Card>
                <Card style={[styles.card, { borderColor: modalData.status.abbrev === "Go" ? "#06d6a0" : "#8d99ae" }]}>
                  <Card.Title title={["Status | ", modalData.status.name]} />
                  <Card.Content>
                    <Paragraph>{modalData.status.description}</Paragraph>
                    <Paragraph>Launch window start: {moment(modalData.window_start).format("LLL")}</Paragraph>
                    <Paragraph>Launch window end: {moment(modalData.window_end).format("LLL")}</Paragraph>
                  </Card.Content>
                </Card>
                <Card style={styles.card}>
                  <Card.Cover source={{ uri: modalData.pad.map_image }}></Card.Cover>
                  <Card.Title title="Location" />
                  <Card.Content>
                    <Paragraph>{modalData.pad.location.name}</Paragraph>
                    <Paragraph>{modalData.pad.map_url}</Paragraph>
                    <Paragraph>{modalData.pad.latitude}</Paragraph>
                    <Paragraph>{modalData.pad.longitude}</Paragraph>
                  </Card.Content>
                  <Card.Actions>
                    <TouchableHighlight
                      style={[styles.button, { display: modalData.pad.map_url ? "flex" : "none" }]}
                      onPress={() => {
                        handlePress(modalData.pad.map_url);
                      }}
                    >
                      <Text
                        style={{
                          color: "#8d99ae",
                          fontWeight: "bold",
                          textTransform: "uppercase",
                        }}
                      >
                        Google maps
                      </Text>
                    </TouchableHighlight>
                  </Card.Actions>
                </Card>
              </Modal>
            </Card>
          )}
        ></FlatList>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  card: {
    marginTop: 25,
    fontSize: 18,
    borderColor: "#8d99ae",
    borderRadius: 8,
    borderWidth: 1,
    margin: 5,
  },
  buttonStyles: {
    margin: 5,
    padding: 2,
    backgroundColor: "#536DFE",
    borderRadius: 15,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    borderColor: "#8d99ae",
    borderWidth: 1,
    margin: 5,
    width: 85,
    height: 35,
    padding: 2,
    backgroundColor: "#fff",
  },
  containerStyle: {
    paddingTop: 50,
    backgroundColor: "white",
    margin: 25,
  },
});
/**
 *
 */
