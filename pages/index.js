import { CardanoPrice } from "./CardanoPrice";
import { CardanoStaking } from "./CardanoStaking";
import '../styles/globals.css'
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
