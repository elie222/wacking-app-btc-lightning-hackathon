import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default class Invoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = { payments: null, loading: true };
  }

  componentWillMount() {
    axios
      .get("/user?ID=12345")
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    const { payments } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={payments}
          // data={[{ key: "a" }, { key: "b" }]}
          renderItem={({ item }) => <Text>{item.key}</Text>}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
