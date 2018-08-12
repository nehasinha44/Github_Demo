import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Row,
  Col,
  Tabs,
  Tab,
  Panel,
  Glyphicon,
  Button
} from "react-bootstrap";
import { Link } from "react-router-dom";
import client from "../config/graphqlConfig";
import "../App.css";
import ProfileLeftSide from "./profileLeftSide";
import { PROFILE_QUERY } from "../config/queries";

class App extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.state = {
      LoginUser:
        params.userName !== undefined ? params.userName : "nehasinha44",
      profile: "",
      ErrorValue: ""
    };
  }

  componentDidMount() {
    const LoginUser = this.state.LoginUser;
    client
      .query({
        query: PROFILE_QUERY,
        variables: {
          LoginUser: LoginUser
        }
      })
      .then(resp => this.setState({ profile: resp.data.user }))
      .catch(error =>
        this.setState({
          ErrorValue: "Error: Network error: Failed to fetch data"
        })
      );
  }

  // For grid discription
  repositories(value) {
    const LoginUser = this.state.LoginUser;
    return value.map((val, index) => (
      <Col xs={6} key={index}>
        <Panel style={{ height: "158px" }}>
          <Panel.Body>
            <Link to={`${LoginUser}/${val.node.name}`}>
              <h3>{val.node.name}</h3>
            </Link>
            <h5>{val.node.description}</h5>
            <Col xs={5}>
              <div
                className="colorCode"
                style={{
                  backgroundColor:
                    val.node.languages.edges[0] !== undefined
                      ? val.node.languages.edges[0].node.color
                      : ""
                }}
              />
              {val.node.primaryLanguage != null
                ? val.node.primaryLanguage.name
                : ""}{" "}
            </Col>
            <Col xs={3}>
              <Glyphicon glyph="star" />
              {val.node.stargazers.totalCount}
            </Col>
            <Col xs={3}>
              <svg
                aria-label="forks"
                className="octicon octicon-repo-forked"
                viewBox="0 0 10 16"
                version="1.1"
                width="10"
                height="16"
                role="img"
              >
                <path
                  fillRule="evenodd"
                  d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
                />
              </svg>
              {val.node.forkCount}
            </Col>
          </Panel.Body>
        </Panel>
      </Col>
    ));
  }

  repositoriesList(val) {
    return val.map((item, index) => (
      <Col md={12} key={index}>
        <Panel style={{ height: "158px" }}>
          <Panel.Body>
            <a href="hello">
              <h3>{item.node.name}</h3>
            </a>
            <h5>{item.node.description}</h5>
            <p>
              {item.node.primaryLanguage != null
                ? item.node.primaryLanguage.name
                : ""}
              <Button bsSize="xsmall">
                <Glyphicon glyph="star" /> 1{" "}
              </Button>
            </p>
          </Panel.Body>
        </Panel>
      </Col>
    ));
  }

  render() {
    const Profile = this.state.profile;
    if (
      Profile === "" &&
      this.state.ErrorValue !== "" &&
      this.state.profile.repositories === undefined
    ) {
      return this.state.ErrorValue === "" ||
        this.state.profile.repositories === undefined ? (
        <h1>Loading...</h1>
      ) : (
        <h1>{this.state.ErrorValue}</h1>
      );
    }
    if (this.state.profile.repositories === undefined) {
      this.state.ErrorValue = "something went wrong";
      return false;
    }
    const Repositories = this.state.profile.repositories.edges;

    const TotalRepCount = `Repositories (${Object.keys(Repositories).length})`; // to find count of repo
    const TotalFollowersCount = `Followers (${
      this.state.profile.followers.totalCount
    })`; //find start count following
    const TotalFollwingCount = `Following (${
      this.state.profile.following.totalCount
    })`; //find follwing count following
    return (
      <Grid>
        <Row className="show-grid">
          <ProfileLeftSide profile={this.state.profile} />
          <Col xs={12} md={8}>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Overview">
                <h4 style={{ padding: "10px" }}> Popular repositories </h4>
                {this.repositories(Repositories)}
              </Tab>
              <Tab eventKey={2} title={TotalRepCount}>
                <h4 style={{ padding: "10px" }}> Repositories </h4>
                {this.repositoriesList(Repositories)}
              </Tab>
              <Tab eventKey={3} title="Stars" />
              <Tab eventKey={4} title={TotalFollowersCount} />
              <Tab eventKey={5} title={TotalFollwingCount} />
            </Tabs>
          </Col>
        </Row>
      </Grid>
    );
  }
}
App.propTypes = {
  match: PropTypes.object.isRequired
};

export default App;
