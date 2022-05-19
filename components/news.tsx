import React, { useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import { Button, Card, Modal, Paragraph, Title } from "react-native-paper";
import { mockNewsData } from "./mockData";


export const news = () => {
    
  const [visible, setVisible] = React.useState(false);
  const [launchData, setData] = useState<any>(mockNewsData);

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
          <Card.Cover source={{ uri: item.feature_image }} />
          <Card.Title title={item.name} subtitle={item.date} />
          <Card.Content>
            <Title>Description</Title>
            <Paragraph>{item.description}</Paragraph>
            <Paragraph>{item.news_url}</Paragraph>
            <Paragraph>{item.video_url}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button style={[styles.buttonStyles, { display: item.webcast_live ? "flex" : "none" }]} mode="contained" color="#e63946">
              Watch live
            </Button>
          </Card.Actions>
        </Card>
      )}
    ></FlatList>
  );
}
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