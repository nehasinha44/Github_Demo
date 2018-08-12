import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./header/header";
import Profile from "./profile";
import ProjectDetail from "./projectDetail";
import Footer from "./footer/footer";

ReactDOM.render(
  <Router>
    <div>
      <Route path="/" component={Header} />
      <Route exact path="/:userName" component={Profile} />
      <Route exact path="/:userName/:reponame" component={ProjectDetail} />
      <Route exact path="/" component={Profile} />
      <Route exact path="/" component={Footer} />
    </div>
  </Router>,
  document.getElementById("root")
);
