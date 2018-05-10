import React from "react";
import { StyleSheet, Text, View, StatusBar, Dimensions } from "react-native";
import { Constants } from "expo";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view"; // 0.0.67
import Invoice from "./screens/Invoice.js";
import Pay from "./screens/Pay.js";
import PaymentsList from "./screens/PaymentsList.js";

const initialLayout = {
  height: 0,
  width: Dimensions.get("window").width
};

export default class App extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: "first", title: "Request" },
      { key: "second", title: "Pay" },
      { key: "history", title: "History" }
    ]
  };

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} />;

  _renderScene = SceneMap({
    first: Invoice,
    second: Pay,
    history: PaymentsList
  });

  render() {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: Constants.statusBarHeight,
          backgroundColor: "#1982f3"
        }}
      >
        <TabViewAnimated
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
        <StatusBar barStyle="light-content" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
