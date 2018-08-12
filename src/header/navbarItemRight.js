import React from "react";
import { Nav, NavItem, NavDropdown, MenuItem } from "react-bootstrap";

const NavbarItemRight = profile => (
  <Nav pullright="true">
    <NavItem href="#">
      <svg
        alt="you have to unread notification"
        aria-hidden="true"
        className="octicon octicon-bell"
        height="16"
        version="1.1"
        viewBox="0 0 14 16"
        width="14"
      >
        <path d="M14 12v1H0v-1l.73-.58c.77-.77.81-2.55 1.19-4.42C2.69 3.23 6 2 6 2c0-.55.45-1 1-1s1 .45 1 1c0 0 3.39 1.23 4.16 5 .38 1.88.42 3.66 1.19 4.42l.66.58H14zm-7 4c1.11 0 2-.89 2-2H5c0 1.11.89 2 2 2z" />
      </svg>
    </NavItem>

    <NavDropdown
      eventKey={6}
      title={
        <svg
          aria-hidden="true"
          className="octicon octicon-plus float-left mr-1 mt-1"
          height="16"
          version="1.1"
          viewBox="0 0 12 16"
          width="12"
        >
          <path d="M12 9H7v5H5V9H0V7h5V2h2v5h5z" />
        </svg>
      }
      id="basic-nav-dropdown"
    >
      {Object.keys(profile.dropDownPlusIconVal).map(key => (
        <MenuItem key={key}>{profile.dropDownPlusIconVal[key]}</MenuItem>
      ))}
    </NavDropdown>

    <NavDropdown
      eventKey={7}
      title={
        <img
          alt=""
          className="avatar float-left mr-1"
          src={profile.profile.iconImage}
          height="20"
          width="20"
        />
      }
      id="basic-nav-dropdown"
    >
      {Object.keys(profile.dropDownLogVal).map(key => (
        <MenuItem key={key}>
          {profile.dropDownLogVal[key]}
          {profile.dropDownLogVal[key] === "Signed in as"
            ? profile.profile.login
            : ""}
        </MenuItem>
      ))}
    </NavDropdown>
  </Nav>
);

export default NavbarItemRight;
