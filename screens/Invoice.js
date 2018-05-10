import React from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";
import axios from "axios";
import qs from "qs";

export default class Invoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = { amount: "5000", description: "", requestString: "" };

    this.onRequestPayment = this.onRequestPayment.bind(this);
  }

  onRequestPayment() {
    const { amount, description } = this.state;

    const data = { msatoshi: amount, description };

    axios({
      method: "post",
      url: "http://charge.caterpie.hackbtc18.offchain.rocks/invoice",
      headers: {
        Authorization: "Basic YXBpLXRva2VuOnZoc3NMdWNLMFA4eEJn",
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: qs.stringify(data)
    })
      .then(response => {
        console.log(response.data);

        // data:
        // {
        //   "created_at": 1525981094,
        //   "description": "As",
        //   "expires_at": 1525984694,
        //   "id": "Z6IvKiP8IWWHT_nJehSKG",
        //   "metadata": null,
        //   "msatoshi": "5000",
        //   "payreq": "lnbcrt50n1pd0f8axpp5qquy4fq6yhjvqmetdsxfn3ajufdzjl9vgemfx8jc4yaljcs5jz3qdqyg9escqpx9hy45ylg7genxeufgy97jl02kgecw7uuzahy57xjqgwgeaasss38vg2ste3k54ap2tx48kzmhkty79qs8dk5syuprau6kayngr83u9cpl3nt2q",
        //   "rhash": "00384aa41a25e4c06f2b6c0c99c7b2e25a297cac4676931e58a93bf9621490a2",
        //   "status": "unpaid",
        // }

        const { payreq } = response.data;

        this.setState({
          requestString: payreq
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderRequestString() {
    if (!this.state.requestString) return null;

    return (
      <View style={styles.requestStringContainer}>
        <Text>Send the following string to a friend to receive payment:</Text>
        <TextInput value={this.state.requestString} />
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Amount</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={amount => this.setState({ amount })}
          value={this.state.amount}
        />

        <Text>Description</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={description => this.setState({ description })}
          value={this.state.description}
        />

        <Button onPress={this.onRequestPayment} title="Request Payment" />

        {this.renderRequestString()}
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
  },
  textInput: {
    height: 40,
    width: 200,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10
  },
  requestStringContainer: {
    padding: 20,
  },
});
