import React from "react";
import { mount } from "enzyme";
import Header from "../header";
import mock from "./headerTestMock";

describe("<Header top menu />", () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      match: { path: "/", url: "/", isExact: false, params: {} }
    };
    wrapper = mount(<Header {...props} />);
    wrapper.setState({
      profile: {
        ...mock
      }
    });
  });

  it("search box check", () => {
    expect(wrapper.find("#search").length).toBe(2);
  });

  it("should render the page if the params are there", () => {
    expect(wrapper.find("#navId").length).toBe(3);
  });
  it("container class count check", () => {
    expect(wrapper.find(".container").length).toBe(1);
  });
  it("html navbar count check", () => {
    expect(wrapper.find("Navbar").length).toBe(1);
  });
  it("should render the page if the params are there", () => {
    expect(wrapper.find("Grid").length).toBe(1);
    // console.log(wrapper.debug());
  });
});
