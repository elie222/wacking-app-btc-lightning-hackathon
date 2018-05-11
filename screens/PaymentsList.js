import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
  Clipboard
} from "react-native";
import { ListItem } from "react-native-elements";
import axios from "axios";

export default class Invoice extends React.Component {
  constructor(props) {
    super(props);

    this.state = { payments: null, loading: true };
  }

  componentWillMount() {
    axios({
      method: "get",
      url: "http://charge.caterpie.hackbtc18.offchain.rocks/invoices",
      headers: {
        Authorization: "Basic YXBpLXRva2VuOnZoc3NMdWNLMFA4eEJn",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(response => {
        // data:
        // [{
        //   "created_at": 1525981227,
        //   "description": "asdsa",
        //   "expires_at": 1525984827,
        //   "id": "zajgxv2n6AJw6iVko_mqn",
        //   "metadata": null,
        //   "msatoshi": "5000",
        //   "msatoshi_received": null,
        //   "paid_at": null,
        //   "pay_index": null,
        //   "payreq": "lnbcrt50n1pd0fgptpp53wknctx9pruf58nw0khm8w0qe9px4m5zgdhekurv022jkp55t97sdqgv9ekgumpcqpx7kfyj3cvgc7j6jy7ldengwz4l2ysma0763z0h6h2eyqjy38ak00x8e9e8valrtazdx9t6k8z5739sjqa3d28s60a4xph9p7ny6zp7rqqxe48sh",
        //   "quoted_amount": null,
        //   "quoted_currency": null,
        //   "rhash": "8bad3c2cc508f89a1e6e7dafb3b9e0c9426aee82436f9b706c7a952b0694597d",
        //   "status": "expired",
        // }]

        const payments = response.data.map(payment => {
          return {
            ...payment,
            key: payment.id
          };
        });

        this.setState({
          payments
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderRow({ item }) {
    return (
      <ListItem
        key={item.key}
        title={item.payreq}
        subtitle={`${item.msatoshi || 0} satoshi - ${item.status} - ${new Date(item.created_at * 1000)}`}
        // leftAvatar={{ source: { uri: item.avatar_url } }}
        chevron={false}
        onPress={() => {
          console.log("row: copying payreq");
          Clipboard.setString(item.payreq)
        }}
        rightAvatar={() => {
          return <Button title="Copy" />;
        }}
      />
    );
  }

  render() {
    const { payments } = this.state;

    return (
      <View style={styles.container}>
        <FlatList
          data={payments}
          // renderItem={({ item }) => (
          //   <View key={item.key} style={{ padding: 20 }}>
          //     <Text>Id: {item.id}</Text>
          //     <Text>Status: {item.status}</Text>
          //   </View>
          // )}
          renderItem={this.renderRow}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
