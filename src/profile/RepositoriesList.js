import React , { Component } from "react";
import { Button, Col, Panel,Glyphicon} from "react-bootstrap";
import { Link } from "react-router-dom";

class RepositoriesList extends Component {
    repositoriesList(val) {
      const LoginUser = this.props.LoginUser;
        return val.map((item, index) => (
          <Col md={12} key={index}>
            <Panel style={{ height: "158px" }}>
              <Panel.Body>
              <Link to={`${LoginUser}/${item.node.name}`}>
                  <h3>{item.node.name}</h3>
                </Link>
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
    render(){
        return(
            <div>
                <h4 style={{ padding: "10px" }}> Repositories </h4>
                {this.repositoriesList(this.props.repositories)}
              </div> 
        )

    }
}

export default RepositoriesList;