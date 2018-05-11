import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList
} from "react-native";
// import { FormInput } from 'react-native-elements';
import axios from "axios";
import qs from "qs";
import { ACCOUNTS } from "../utils/consts";

export default class Invoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: "5000",
      description: "",
      requestString: "",
      modalVisible: false,
      selectedAccount: ACCOUNTS[0].name
    };

    this.onRequestPayment = this.onRequestPayment.bind(this);
  }

  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
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

  // renderSwitchAccount() {
  //   return (
  //     <View style={{ paddingTop: 50 }}>
  //       <Button
  //         title="Switch Account"
  //         onPress={() => {
  //           console.log("xxx");
  //         }}
  //       />
  //     </View>
  //   );
  // }

  // renderSwitchAccount() {
  //   return (
  //     <View style={{ paddingTop: 50 }}>
  //       <Button
  //         title="Switch Account"
  //         onPress={() => {
  //           console.log("xxx");
  //         }}
  //       />
  //     </View>
  //   );
  // }

  renderSwitchAccount() {
    return (
      <View style={{ marginTop: 150 }}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
        >
          <View
            style={{
              marginTop: 22,
              flex: 1,
              backgroundColor: "#fff",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 18
                }}
              >
                Switch Account
              </Text>

              <View style={{ height: 300 }}>
                <FlatList
                  data={ACCOUNTS}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={{ padding: 10 }}
                      onPress={() => {
                        this.setState({ selectedAccount: item.name });
                        this.setModalVisible(false);
                      }}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>

              <Button
                title={"Cancel"}
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}
              />
            </View>
          </View>
        </Modal>

        <Text>Account: {this.state.selectedAccount}</Text>

        <Button
          title="Switch Account"
          onPress={() => {
            this.setModalVisible(true);
          }}
        />
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

        {this.renderSwitchAccount()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    height: 40,
    width: 300,
    borderColor: "gray",
    borderWidth: 1,
    padding: 10
  },
  requestStringContainer: {
    padding: 20
  }
});
