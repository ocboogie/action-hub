import { INode } from "./node";

export interface IRegistry {
  nodes: {
    [nodeName: string]: INode;
  };
}
