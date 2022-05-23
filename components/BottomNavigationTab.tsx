import React from "react";
import { BottomNavigation, Text } from "react-native-paper";
import { AppBarTop } from "./AppBarTop";
import { launches } from "./launches";
import { news } from "./news";

const agencies = () => <Text>Agencies</Text>;
const rockets = () => <Text>Rockets</Text>;

export const BottomNavigationTab = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: "launches", title: "Upcoming", icon: "rocket-launch" },
    { key: "news", title: "News", icon: "newspaper" },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    launches: launches,
    news: news,
    agencies: agencies,
    rockets: rockets,
  });
  return (
    <>
      <AppBarTop appTitle={routes[index].title} />
      <BottomNavigation
        barStyle={{ backgroundColor: "#1d3557", padding: 5 }}
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
    </>
  );
};
