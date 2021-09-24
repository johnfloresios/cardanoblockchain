import { CardanoPrice } from "./CardanoPrice";
import { CardanoStaking } from "./CardanoStaking";
import "./styles.css";
import React from 'react';

export default class App extends React.Component {
  render() {
    console.log(this.props)
    return  (
    <div className="App">
      <CardanoPrice />
      <CardanoStaking params={this.props}/>
    </div>
  );
}
}
