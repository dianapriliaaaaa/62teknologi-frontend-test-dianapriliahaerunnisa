import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import BusinessList from "./components/BusinessList";
import BusinessDetail from "./components/BusinessDetail";

function App() {
  return (
    <Router>
      <div>
        <h1>Business Search</h1>
        <Switch>
          <Route exact path="/" component={BusinessList} />
          <Route path="/business/:id" component={BusinessDetail} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
