import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Alert } from "react-native";
import axios from "axios";

export default class Invoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = { paymentRequest: "", response: null };

    this.onDecode = this.onDecode.bind(this);
    this.onPay = this.onPay.bind(this);
  }

  onDecode() {
    const { paymentRequest } = this.state;

    if (!paymentRequest) return;

    axios({
      method: "post",
      url: "http://rpc.charmander.hackbtc18.offchain.rocks/",
      headers: {
        Authorization: "Basic YXBpLXRva2VuOllVOWdpdGw0WGhXRHNn",
        "Content-Type": "application/json"
      },
      data: {
        jsonrpc: "2.0",
        method: "decodepay",
        params: [paymentRequest],
        id: "2"
      }
    })
      .then(response => {
        // result:
        // {
        //   "id": "2",
        //   "jsonrpc": "2.0",
        //   "result": Object {
        //     "created_at": 1525957490,
        //     "currency": "bcrt",
        //     "description": "football",
        //     "expiry": 3600,
        //     "min_final_cltv_expiry": 6,
        //     "msatoshi": 2000,
        //     "payee": "0310700d2f65e23375cea1b58f511398e52f9d7fc6518ffd6733b3608364a68eff",
        //     "payment_hash": "ded569e5207c1e8eb591f7ad2c838fe024e6b1fd3f6c6e571c131cda72adabc5",
        //     "signature": "304402205e450794c2ece87f50b22c2a53ddc6af70dc33aa08ebbb26d5cacd4100c28f3102200a642827488e88b5fcf1b8dcc7d542c2d49d2e3a2844786ac7d4be5a79acd394",
        //     "timestamp": 1525957490,
        //   },
        // }

        const {
          data: { result }
        } = response;

        this.setState({
          response: {
            amount: result.msatoshi,
            description: result.description,
            expiry: result.expiry
          }
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onPay() {
    const {
      response: { amount, description },
      paymentRequest
    } = this.state;

    console.log(amount, description, paymentRequest);

    if (!paymentRequest) return;

    axios({
      method: "post",
      url: "http://rpc.charmander.hackbtc18.offchain.rocks/",
      headers: {
        Authorization: "Basic YXBpLXRva2VuOllVOWdpdGw0WGhXRHNn",
        "Content-Type": "application/json"
      },
      data: {
        jsonrpc: "2.0",
        method: "pay",
        params: [paymentRequest],
        id: "2"
      }
    })
      .then(response => {
        const {
          data: { result }
        } = response;

        // console.log('response', response)
        // console.log('result', result)

        Alert.alert('Completed')
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderDecode() {
    return (
      <View>
        <Text>Payment Request</Text>
        <TextInput
          onChangeText={paymentRequest => this.setState({ paymentRequest })}
          value={this.state.paymentRequest}
        />

        <TextInput
          style={styles.textInput}
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

    console.log("response", response);

    const { amount, description } = response;

    return (
      <View>
        <Text>Amount: {amount}</Text>
        <Text>Description: {description}</Text>

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
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10
  }
});
