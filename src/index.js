import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { CardanoPrice } from "./CardanoPrice";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import { CardanoStaking } from "./CardanoStaking";

export default function Home() {
  return  (
    <div>
    <CardanoPrice />
    <Router>
        <Route path='/:addr' component={CardanoStaking}/>
      </Router>
      </div>
    );
}

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <CardanoPrice />
    <Router>
        <Route path='/:addr' component={CardanoStaking}/>
      </Router>,
  </StrictMode>,
  rootElement
);

