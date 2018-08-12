import React, { Component } from "react";
import {
  Grid,
  Row,
  Col,
  Tabs,
  Tab,
  Glyphicon,
  Button,
  ButtonToolbar,
  ButtonGroup,
  Table,
  DropdownButton,
  MenuItem,
  Jumbotron
} from "react-bootstrap";
import client from "../config/graphqlConfig";
import {
  ADD_STAR,
  REMOVE_STAR,
  WATCH_REPOSITORY,
  REPO_VAL,
  GET_README
} from "../config/queries";
import showdown from "showdown";

class App extends Component {
  constructor(props) {
    super(props);
    const {
      match: { params }
    } = this.props;
    this.state = {
      LoginUser:
        params.userName !== undefined ? params.userName : "nehasinha44",
      secondParam: params.reponame,
      repo: "",
      totalStarCount: "",
      readMeText: "",
      descriptionHTML: ""
    };
  }
  componentDidMount() {
    const that = this;
    const LoginUser = that.state.LoginUser;

    client
      .query({
        query: REPO_VAL,
        variables: {
          LoginUser: LoginUser,
          repositoryName: this.state.secondParam
        }
      })
      .then(
        resp =>
          this.setState({
            repo: resp.data.user.repository,
            viewerHasStarred: resp.data.user.repository.viewerHasStarred,
            totalStarCount: resp.data.user.repository.stargazers.totalCount,
            viewerSubscription: resp.data.user.repository.viewerSubscription,
            totalWatchCount: resp.data.user.repository.watchers.totalCount
          }),
        client
          .query({
            query: GET_README,
            variables: {
              LoginUser: LoginUser,
              repositoryName: this.state.secondParam
            }
          })
          .then(response =>
            this.setState(prevState => ({
              readmecontain: response.data.repositoryOwner.repository
            }))
          )
      )
      .catch(error => error);
  }

  entries(data) {
    return data.map((item, index) => (
      <tr key={index}>
        <td>
          <a href="">{item.name}</a>
        </td>
        <td>{item.type}</td>
        <td style={{ textAlign: "right" }}>{item.mode}</td>
      </tr>
    ));
  }
  activeInactiveStar(repoid) {
    const mutationVal =
      this.state.viewerHasStarred === false ? ADD_STAR : REMOVE_STAR;
    client
      .mutate({
        mutation: mutationVal,
        variables: {
          repositoryId: repoid
        }
      })
      .then(resp =>
        this.setState({
          totalStarCount:
            mutationVal === REMOVE_STAR
              ? this.state.totalStarCount - 1
              : this.state.totalStarCount + 1,
          viewerHasStarred: mutationVal === REMOVE_STAR ? false : true
        })
      )
      .catch(/*Exception handling*/);
  }
  watchUnwatch(repoid) {
    const sytatesView =
      this.state.viewerSubscription === "UNSUBSCRIBED"
        ? "SUBSCRIBED"
        : "UNSUBSCRIBED";
    client
      .mutate({
        mutation: WATCH_REPOSITORY,
        variables: {
          id: repoid,
          viewerSubscription: sytatesView
        }
      })
      .then(resp =>
        this.setState({
          totalWatchCount:
            this.state.viewerSubscription === "UNSUBSCRIBED"
              ? this.state.totalWatchCount + 1
              : this.state.totalWatchCount - 1,
          viewerSubscription:
            this.state.viewerSubscription === "UNSUBSCRIBED"
              ? "SUBSCRIBED"
              : "UNSUBSCRIBED"
        })
      )
      .catch(/*Exception handling*/);
  }

  render() {
    const variableName =
      this.state.viewerSubscription === "UNSUBSCRIBED"
        ? `${this.state.totalWatchCount} UnWatch`
        : `${this.state.totalWatchCount} Watch`;
    const repo = this.state.repo;
    const repoentry =
      this.state.repo.object === undefined
        ? (this.state.repo = "")
        : this.state.repo.object.entries;
    var converter = new showdown.Converter();

    if (this.state.readmecontain !== undefined) {
      const readMe =
        this.state.readmecontain.object !== undefined &&
        this.state.readmecontain.object !== null
          ? converter.makeHtml(this.state.readmecontain.object.text)
          : "Nothing To Show";
      this.state.readMeText = readMe ? (
        <p dangerouslySetInnerHTML={{ __html: readMe }} />
      ) : (
        "Nothing To Show"
      );
      this.state.descriptionHTML =
        this.state.readmecontain.descriptionHTML !== undefined &&
        this.state.readmecontain.descriptionHTML !== null ? (
          <p
            dangerouslySetInnerHTML={{
              __html: this.state.readmecontain.descriptionHTML
            }}
          />
        ) : (
          "Null"
        );
    } else this.state.readMeText = "Nothing To Show";

    if (repo === "") {
      return <div className="profileDetailClass">Loading....</div>;
    }

    return (
      <Grid>
        <Row className="show-grid">
          <Col xs={12} md={12}>
            <Col xs={6} md={6}>
              <a href="">
                <h4>
                  {this.state.LoginUser}/{this.state.secondParam}
                </h4>
              </a>
            </Col>
            <Col xs={6} md={6}>
              <ButtonToolbar>
                <DropdownButton title={variableName} id="12">
                  <MenuItem
                    eventKey="1"
                    onClick={() => this.watchUnwatch(repo.id)}
                  >
                    Not watching{" "}
                    <p>Be notified when participating or @mentioned</p>
                  </MenuItem>
                  <MenuItem divider />
                  <MenuItem
                    eventKey="2"
                    onClick={() => this.watchUnwatch(repo.id)}
                  >
                    Watching <p>Be notified of all conversations.</p>
                  </MenuItem>
                </DropdownButton>
                <ButtonGroup>
                  <Button
                    bsSize="small"
                    onClick={() => this.activeInactiveStar(repo.id)}
                  >
                    <Glyphicon glyph="star" />{" "}
                    {this.state.viewerHasStarred === false ? "Star" : "UnStar"}
                    {this.state.totalStarCount}
                  </Button>
                </ButtonGroup>
                <ButtonGroup>
                  <Button bsSize="small">
                    <svg
                      className="octicon octicon-repo-forked v-align-text-bottom"
                      viewBox="0 0 10 16"
                      version="1.1"
                      width="10"
                      height="16"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"
                      />
                    </svg>{" "}
                    fork
                    {repo.forkCount}
                  </Button>
                </ButtonGroup>
              </ButtonToolbar>
            </Col>
          </Col>
          <Col xs={12} md={12}>
            <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
              <Tab eventKey={1} title="Code">
                <h5 style={{ padding: "10px" }}>{repo.description}</h5>
                <Table responsive>
                  <thead style={{ border: "1px", background: "#edfaff" }}>
                    <tr>
                      <th>{this.state.LoginUser}</th>
                      <th />
                      <th style={{ textAlign: "right" }}>Commit</th>
                    </tr>
                  </thead>
                  <tbody>{this.entries(repoentry)}</tbody>
                </Table>
              </Tab>
              <Tab eventKey={2} title="Issue" />
              <Tab eventKey={3} title="Pull Request" />
              <Tab eventKey={4} title="Projects" />
              <Tab eventKey={6} title="Wiki" />
              <Tab eventKey={7} title="Insights" />
              <Tab eventKey={8} title="Settings" />
            </Tabs>
          </Col>
        </Row>
        <Jumbotron>
          {this.state.descriptionHTML}
          {this.state.readMeText}
        </Jumbotron>
      </Grid>
    );
  }
}

export default App;
