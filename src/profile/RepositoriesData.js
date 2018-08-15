import React , { Component } from "react";
import { Col, Panel,Glyphicon} from "react-bootstrap";
import { Link } from "react-router-dom";

class RepositoriesData extends Component {
    
    repositories(value) {
        const LoginUser = this.props.LoginUser;
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
      render(){
          return(
           <div>
            <h4 style={{ padding: "10px" }}> Popular repositories </h4>
            {this.repositories(this.props.repositories)}
          </div>
          )

      }
}

export default RepositoriesData;