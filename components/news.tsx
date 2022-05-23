import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Linking, StyleSheet, TouchableHighlight, View } from "react-native";
import { Card, Paragraph, Title, Text, Colors } from "react-native-paper";
import moment from "moment";
import { mission } from "../api/getLaunches";
export const news = () => {
  const [launchData, setData] = useState<any>();
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    const missions = await mission.news();
    setData(missions);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePress = (url: string) => {
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });
  };

  return (
    <View>
      {loading ? (
        <View>
          <ActivityIndicator style={{ marginTop: 40 }} animating={true} color={Colors.red800} />
        </View>
      ) : (
        <FlatList
          data={launchData}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Cover source={{ uri: item.feature_image }} />
              <Card.Title title={[item.name, " | ", moment(item.date).fromNow()]} subtitle={moment(item.date).format("LLL")} />
              <Card.Content>
                <Title>Description</Title>
                <Paragraph>{item.description}</Paragraph>
              </Card.Content>
              <Card.Actions>
                <TouchableHighlight
                  style={[styles.button, { backgroundColor: "#457b9d", display: item.news_url ? "flex" : "none" }]}
                  onPress={() => {
                    handlePress(item.news_url);
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Read more
                  </Text>
                </TouchableHighlight>
                <TouchableHighlight
                  style={[styles.button, { backgroundColor: "#9e2a2b", display: item.video_url ? "flex" : "none" }]}
                  onPress={() => {
                    handlePress(item.video_url);
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                    }}
                  >
                    Watch live
                  </Text>
                </TouchableHighlight>
              </Card.Actions>
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
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    margin: 5,
    width: 80,
    height: 35,
  },
});
