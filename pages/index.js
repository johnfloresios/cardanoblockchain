import { CardanoPrice } from "./api/CardanoPrice";
import { CardanoStaking } from "./api/CardanoStaking";
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
