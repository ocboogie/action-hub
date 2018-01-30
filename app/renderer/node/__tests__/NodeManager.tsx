import * as Cheerio from "cheerio";
// tslint:disable-next-line:no-implicit-dependencies
import { mount } from "enzyme";
import * as React from "react";

import Logger from "../../../common/Logger";
import { IRegistry } from "../../registry";
import NodeManager from "../NodeManager";
import childrenNode from "./resources/mockNodes/children";
import textNode from "./resources/mockNodes/text";

const registry: IRegistry = {
  nodes: {
    text: textNode,
    children: childrenNode
  }
};

const logger = new Logger(["error"]);

describe("rendering", () => {
  test("renders correct nodes", () => {
    const $mock = Cheerio.load(
      `
      <text text="foo" />
  `,
      { xmlMode: true }
    );
    const wrapper = mount(
      <NodeManager $={$mock} registry={registry} logger={logger} />
    );

    expect(wrapper.contains(<h1>foo</h1>)).toBeTruthy();
  });

  test("updates", () => {
    const $mock = Cheerio.load(
      `
    <children>
    </children>
  `,
      { xmlMode: true }
    );
    const wrapper = mount(
      <NodeManager $={$mock} registry={registry} logger={logger} />
    );

    $mock("children").append('<text text="foo" />');
    $mock("children").update();
    expect(wrapper.html()).toMatchSnapshot();
  });
});

describe("error handling", () => {
  test("logs when invalid args are supplied to a node", () => {
    (Error.prototype as any).suppressReactErrorLogging = true;
    // Related issue https://github.com/airbnb/enzyme/issues/1255
    const $mock = Cheerio.load(
      `
        <text />
    `,
      { xmlMode: true }
    );
    const mockLogger = { report: jest.fn() };
    mount(
      <NodeManager $={$mock} registry={registry} logger={mockLogger as any} />
    );

    expect(mockLogger.report.mock.calls[0]).toEqual([
      "error",
      'There was an error rendering a tag at "/": "Invalid arguments: child "text" fails because ["text" is required]."'
    ]);
    (Error.prototype as any).suppressReactErrorLogging = false;
  });

  test("logs when unknown node name is found", () => {
    (Error.prototype as any).suppressReactErrorLogging = true;
    // Related issue https://github.com/airbnb/enzyme/issues/1255
    const $mock = Cheerio.load(
      `
        <notARealTag />
    `,
      { xmlMode: true }
    );
    const mockLogger = { report: jest.fn() };
    mount(
      <NodeManager $={$mock} registry={registry} logger={mockLogger as any} />
    );

    expect(mockLogger.report.mock.calls[0]).toEqual([
      "error",
      'There was an error rendering a tag at "/": "Unknown node name "notarealtag"."'
    ]);
    (Error.prototype as any).suppressReactErrorLogging = false;
  });
});
