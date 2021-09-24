import { CardanoPrice } from "./api/CardanoPrice";
import { CardanoStaking } from "./api/CardanoStaking";
import '../styles/globals.css'
import React from 'react';

export default function Home() {
	  render() {
		      return  (
			          <div className="App">
			            <CardanoPrice />
			          </div>
			        );
	  }
}
