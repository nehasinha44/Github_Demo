import React, { Component } from "react";
import PropTypes from "prop-types";
import { Navbar } from "react-bootstrap";
import "../App.css";
import client from "../config/graphqlConfig";
import NavbarHeader from "./navbarHeader";
import NavbarForm from "./navbarForm";
import NavItemLeft from "./navItemLeft";
import hearderMock from "../mockData/headerMock";
import NavbarItemRight from "./navbarItemRight";
import { HEAD_QUERY } from "../config/queries";

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
    const that = this;
    const LoginUser = this.state.LoginUser;
    client
      .query({
        query: HEAD_QUERY,
        variables: {
          LoginUser: LoginUser
        }
      })
      .then(resp => that.setState({ profile: resp.data.user }))
      .catch(error =>
        that.setState({
          ErrorValue: "Error: Network error: Failed to fetch data"
        })
      );
  }

  render() {
    if (this.state.profile === "" && this.state.ErrorValue !== "") {
      return this.state.ErrorValue === "" ? (
        <h1>Loading...</h1>
      ) : (
        <h1>{this.state.ErrorValue}</h1>
      );
    }
    return (
      <Navbar inverse collapseOnSelect id="navId">
        <NavbarHeader />
        <Navbar.Collapse>
          <NavbarForm />
          <NavItemLeft hearderMock={hearderMock.navItem.headerLeft} />
          <NavbarItemRight
            profile={this.state.profile}
            dropDownPlusIconVal={hearderMock.navItem.dropDownPlusIcon}
            dropDownLogVal={hearderMock.navItem.dropDownLogVal}
          />
        </Navbar.Collapse>
      </Navbar>
    );
  }
}
App.defaultProps = {
  match: ""
};
App.propTypes = {
  match: PropTypes.object
};

export default App;
