import React from "react";
import { Navbar, FormGroup, FormControl } from "react-bootstrap";

const NavbarForm = () => (
  <Navbar.Form pullLeft>
    <FormGroup>
      <FormControl
        type="text"
        placeholder="Search Github"
        className="Search"
        id="search"
      />
    </FormGroup>
  </Navbar.Form>
);

export default NavbarForm;
