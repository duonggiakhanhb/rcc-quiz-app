import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Level1 from "./views/Level1";
import Level2 from "./views/Level2";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Level1}></Route>
        <Route exact path="/test2" component={Level2}></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
