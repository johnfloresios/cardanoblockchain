import { CardanoPrice } from "../components/CardanoPrice";
import { CardanoStaking } from "../components/CardanoStaking";
import React from 'react';

export default class App extends React.Component {
  render() {
    return  (
    <div className="App">
      <CardanoPrice />
      <CardanoStaking params={this.props}/>
    </div>
  );
}
}
