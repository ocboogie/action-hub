// tslint:disable-next-line:no-implicit-dependencies
import { mount, shallow } from "enzyme";
import * as React from "react";

import Logger from "../../../common/Logger";
import NodeRenderer from "../NodeRenderer";
import mockNode from "./resources/mockNode";

const logger = new Logger(["error"]);

test("renders node", () => {
  const wrapper = mount(
    <NodeRenderer node={mockNode} args={{ text: "foo" }} />
  );

  expect(wrapper.contains(<h1>foo</h1>)).toBeTruthy();
});

test("throws when arguments are invalid", () => {
  expect(() => {
    const wrapper = shallow(
      <NodeRenderer node={mockNode} args={{ foo: "bar" }} />
    );
  }).toThrowErrorMatchingSnapshot();
});

test("logs when arguments are invalid", () => {
  const mockListener = jest.fn();
  logger.addListener("error", mockListener);

  const wrapper = shallow(
    <NodeRenderer logger={logger} node={mockNode} args={{ foo: "bar" }} />
  );

  expect(mockListener.mock.calls[0][0]).toMatchObject({
    title: "Incorrect arguments passed to node"
  });
});
