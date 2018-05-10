import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default class Invoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = { paymentRequest: "", response: null };
  }

  onDecode() {
    console.log("onDecode");

    const { paymentRequest } = this.state;

    console.log(paymentRequest);
  }

  onPay() {
    console.log("onPay");

    const { amount, description } = this.state;

    console.log(amount, description);
  }

  renderDecode() {
    return (
      <View>
        <Text>Payment Request</Text>
        <TextInput
          onChangeText={paymentRequest => this.setState({ paymentRequest })}
          value={this.state.paymentRequest}
        />

        <Button onPress={this.onDecode} title="Decode" />
      </View>
    );
  }

  renderPay() {
    const { response } = this.state;

    if (!response) return null;

    const { amount, description } = response;

    return (
      <View>
        <Text>Amount {Amount}</Text>
        <Text>Description {description}</Text>

        <Button onPress={this.onPay} title="Pay" />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderDecode()}
        {this.renderPay()}
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
