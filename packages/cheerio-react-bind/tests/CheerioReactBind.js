/* eslint react/prop-types: "off" */
import React from "react";
import Cheerio from "cheerio";
import renderer from "react-test-renderer";

import CheerioReactBind from "../src/index";

const tags = {
  div: ({ children }) => <div>{children}</div>,
  h1: ({ children }) => <h1>{children}</h1>,
  p: ({ children }) => <p>{children}</p>
};

const $ = Cheerio.load(
  `
  <div>
    <p>Paragraph</p>
  </div>
`,
  { xmlMode: true }
);

test("modifying the Cheerio dom updates the React dom with custom tags", () => {
  const component = renderer.create(
    <CheerioReactBind tags={tags} $elem={$("div").first()} $={$} />
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  $("div").append(`<div>test</div>`);
  $("div").data("update")();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  $("p").text("Paragraph test");
  $("p").data("update")();
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
