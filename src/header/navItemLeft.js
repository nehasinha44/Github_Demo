import React from "react";
import { Nav, NavItem } from "react-bootstrap";

const NavItemLeft = hearderMock => (
  <Nav>
    {Object.keys(hearderMock).map(key =>
      Object.keys(hearderMock[key]).map(navItemKey => (
        <NavItem
          key={navItemKey}
          href={hearderMock[key][navItemKey].url}
          className="nevItem"
        >
          {hearderMock[key][navItemKey].value}
        </NavItem>
      ))
    )}
  </Nav>
);

export default NavItemLeft;
