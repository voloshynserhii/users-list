import { View, Text, Image, StyleSheet } from "react-native";
import { userProps } from "../types/index";
import Colors from "../constants/Colors";

const CardText = ({ text }: { text: string }) => {
  return <Text style={styles.name}>{text}</Text>;
};

const UserCard = ({ item }: {item: userProps}) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: item.image }} />
      <Text style={styles.title}>{item.username}</Text>
      <View style={styles.namesContainer}>
        <CardText text={item.firstName} />
        <CardText text={item.lastName} />
      </View>
      <View style={styles.namesContainer}>
        <CardText text="AGE: " />
        <CardText text={`${item.age} years`} />
      </View>
      <View style={styles.namesContainer}>
        <CardText text="CITY: " />
        <CardText text={item.city} />
      </View>
    </View>
  );
};
export default UserCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.light.background,
    paddingVertical: "15%",
    borderRadius: 12,
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    marginTop: 16,
  },
  namesContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  name: {
    fontSize: 24,
    marginLeft: 4
  },
});
