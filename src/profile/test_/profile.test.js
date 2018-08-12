import React from "react";
import { mount } from "enzyme";
import Profile from "../index";
import mock from "./profileTestMock.json";

describe("<Profile top menu />", () => {
  let wrapper;
  beforeEach(() => {
    const props = {
      match: { path: "/", url: "/", isExact: false, params: {} }
    };
    wrapper = mount(<Profile {...props} />);
  });

  it("before  setstate", () => {
    expect(wrapper.find(".profileBaseClass").length).toBe(1);
  });
});
