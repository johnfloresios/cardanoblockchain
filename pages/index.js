import { CardanoPrice } from "./api/CardanoPrice";
import { CardanoStaking } from "./api/CardanoStaking";
import React from 'react';

export default function Home() {
	return  (
	<div className="App">
		<CardanoPrice />
		<Router>
		        <Route path='/:addr' component={CardanoStaking}/>
		</Router>
        </div>
	);
}
