import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import UserCard from '../components/UserCard';
import {userProps} from '../types/index';
import Colors from "../constants/Colors";

export default function UserScreen({ route }: any) {
  const { user }  = route.params

  const item: userProps = {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    image: user.image,
    age: user.age,
    city: user.address.city,
    gender: user.gender
  }
  
  return (
    <View style={styles.container}>
      <UserCard item={item} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: '10%',
    backgroundColor: Colors.light.tint,
  }
});
