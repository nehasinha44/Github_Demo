import React , { Component } from "react";
import { Button, Col, Panel,Glyphicon} from "react-bootstrap";

class RepositoriesList extends Component {
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