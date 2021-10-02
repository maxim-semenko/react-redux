import './App.css';
import ListStudents from "./pages/ListStudents";
import React from "react";
import {Route, Switch} from "react-router-dom";
import AboutStudent from "./pages/AboutStudent";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={ListStudents}/>
        <Route exact path="/student/:id" component={AboutStudent}/>
      </Switch>
    </div>
  );
}

export default App;
