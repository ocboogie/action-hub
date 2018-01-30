import { TagRendererProps } from "cheerio-react-bind";
import * as React from "react";

import { IRegistry } from "../registry";
import { INode } from "./index";
import NodeRenderer from "./NodeRenderer";

interface INodeTagRendererProps extends TagRendererProps {
  registry: IRegistry;
}

export default class NodeTagRenderer extends React.Component<
  INodeTagRendererProps
> {
  public node: INode;

  constructor(props: INodeTagRendererProps) {
    super(props);

    this.node = this.props.registry.nodes[this.props.tagName];
    if (!this.node) {
      // tslint:disable-next-line: no-string-throw
      throw `Unknown node name "${this.props.tagName}".`;
    }
  }

  public render() {
    if (!this.node) {
      return <div />;
    }

    return (
      <>
        <NodeRenderer args={this.props.attributes} node={this.node}>
          {this.props.children}
        </NodeRenderer>
      </>
    );
  }
}
