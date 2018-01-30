// tslint:disable-next-line:no-implicit-dependencies
import { mount, shallow } from "enzyme";
import * as React from "react";

import NodeTagRenderer from "../NodeTagRenderer";
import registry from "./resources/mockRegistry";

test("renders node", () => {
  const wrapper = mount(
    <NodeTagRenderer
      location="/"
      tagName="text"
      attributes={{ text: "foo" }}
      registry={registry}
    />
  );

  expect(wrapper.contains(<h1>foo</h1>)).toBeTruthy();
});

test("logs when unknown node name is found", () => {
  expect(() => {
    shallow(
      <NodeTagRenderer
        location="/"
        tagName="bar?"
        attributes={{}}
        registry={registry}
      />
    );
  }).toThrowErrorMatchingSnapshot();
});
