import React from "react";
import { mount } from "enzyme";
import ProfileDetail from "../index";
import mock from "./projectDetailTestMock";

describe("<Profile top menu />", () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      match: { path: "/", url: "/", isExact: false, params: {} }
    };
    wrapper = mount(<ProfileDetail {...props} />);
  });

  it("before  setstate", () => {
    expect(wrapper.find(".profileDetailClass").length).toBe(1);
  });
});
