import React, { useEffect, useState } from "react";
import { FlatList, Modal, StyleSheet, Text } from "react-native";
import { LaunchType } from "../interfaces/LaunchType";
import { Avatar, Button, Card, Title, Paragraph, Portal, Provider, Headline } from "react-native-paper";
import { mockLaunchData } from "./mockData";
import { mission } from "../api/getLaunches";
import { MapViewComponent } from "./MapView";
import Icon from 'react-native-vector-icons/FontAwesome';
const missions = mission.next("");

export const launches = () => {
  const [visible, setVisible] = React.useState(false);
  const [launchData, setData] = useState<any>(mockLaunchData);

  /* useEffect(() => {
    if (missions) {
      setData(missions);
    }
  });
*/
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  return (
    <FlatList
      data={launchData}
      renderItem={({ item }) => (
        <Card style={styles.card}>
          <Card.Cover source={{ uri: item.image }} />
          <Card.Title title={[item.rocket?.configuration.name, " | ", item.mission?.name]} subtitle={item.net} />
          <Card.Actions>
            <Button style={styles.buttonStyles} mode="contained" onPress={showModal}>
              Read more
            </Button>
            <Button style={[styles.buttonStyles, { display: item.webcast_live ? "flex" : "none" }]} mode="contained" color="#e63946">
              Watch live
            </Button>
          </Card.Actions>
          <Modal visible={visible} onDismiss={hideModal} animationType={"fade"}>
            <Button style={{height: 50, width: 50}} onPress={hideModal}><Icon name="close" size={35} color="#900" /></Button>
            <Card style={styles.card}>
              <Card.Title title="Description" />
              <Card.Content>
                <Paragraph>{item.mission?.description}</Paragraph>
              </Card.Content>
            </Card>
            <Card style={[styles.card, { borderColor: item.status.abbrev === "Go" ? "#06d6a0" : "#8d99ae" }]}>
              <Card.Title title={["Status | ", item.status.name]} />
              <Card.Content>
                <Paragraph>{item.status.description}</Paragraph>
                <Paragraph>{item.window_start}</Paragraph>
              </Card.Content>
            </Card>
            <Card style={styles.card}>
              <Card.Title title="Location" />
              <Card.Content>
                <Paragraph>{item.pad.location.name}</Paragraph>
                <Paragraph>{item.pad.map_url}</Paragraph>
                <Paragraph>{item.pad.latitude}</Paragraph>
                <Paragraph>{item.pad.longitude}</Paragraph>
              </Card.Content>
            </Card>
          </Modal>
        </Card>
      )}
    ></FlatList>
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
  },
});
