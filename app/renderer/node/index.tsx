import * as joi from "joi";
import * as React from "react";

export interface INode {
  name: string;
  component: React.SFC<any> | React.ComponentClass<any>; // Might be the wrong type
  argSchema: joi.ObjectSchema;
}
