import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  Row,
  Col,
  Tabs,
  Tab
} from "react-bootstrap";
import client from "../config/graphqlConfig";
import "../App.css";
import ProfileLeftSide from "./profileLeftSide";
import RepositoriesData from './RepositoriesData';
import RepositoriesList from './RepositoriesList';
import { QUERY_PROFILE } from "../config/queries";


class Profile extends Component {
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
        query: QUERY_PROFILE,
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
    const TotalRepCount = `Repositories (${Object.keys(this.state.profile.repositories.edges).length})`; // to find count of repo
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
            <Tab eventKey={1} title="OverView">
            <RepositoriesData repositories={this.state.profile.repositories.edges} LoginUser={this.state.LoginUser} />
            </Tab>
            <Tab eventKey={2} title={TotalRepCount}>
            <RepositoriesList repositories={this.state.profile.repositories.edges} LoginUser={this.state.LoginUser}/>
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
Profile.propTypes = {
  match: PropTypes.object.isRequired
};

export default Profile;
