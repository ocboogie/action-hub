// tslint:disable-next-line:no-implicit-dependencies
import { mount, shallow } from "enzyme";
import * as React from "react";

import NodeRenderer from "../NodeRenderer";
import textNode from "./__resources__/mockNodes/text";

test("renders node", () => {
  const wrapper = mount(
    <NodeRenderer node={textNode} args={{ text: "foo" }} />
  );

  expect(wrapper.contains(<h1>foo</h1>)).toBeTruthy();
});

test("throws when arguments are invalid", () => {
  expect(() => {
    shallow(<NodeRenderer node={textNode} args={{ foo: "bar" }} />);
  }).toThrowErrorMatchingSnapshot();
});
