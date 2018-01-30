import * as joi from "joi";
import * as React from "react";

import { INode } from "../../../";

const node: INode = {
  name: "text",
  component(props: { text: string }) {
    return <h1>{props.text}</h1>;
  },
  argSchema: joi.object({ text: joi.string().required() })
};

export default node;
