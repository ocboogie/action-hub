import * as joi from "joi";
import * as React from "react";

import { INode } from "../../../";

const node: INode = {
  name: "children",
  component(props: { children: React.ReactNode }) {
    return <>start{props.children}end</>;
  },
  argSchema: joi.object({})
};

export default node;
