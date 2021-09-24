import ReactDOM from "react-dom";
import App from "../src/App";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

const rootElement = document.getElementById("root");
ReactDOM.render(
      <Router>
        <Route path='/:addr' component={App}/>
      </Router>,
  rootElement
);

