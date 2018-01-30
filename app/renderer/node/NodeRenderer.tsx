import * as React from "react";

import { INode } from "./index";

export interface INodeRendererProps {
  node: INode;
  args?: object;
}

export default class NodeRenderer extends React.Component<INodeRendererProps> {
  constructor(props: INodeRendererProps) {
    super(props);

    const error = this.props.node.argSchema.validate(this.props.args).error;
    if (error) {
      // tslint:disable-next-line: no-string-throw
      throw `Invalid arguments: ${error.message}.`;
    }
  }

  public render() {
    const NodeComponent = this.props.node.component;

    return (
      <div>
        <NodeComponent {...this.props.args}>
          {this.props.children}
        </NodeComponent>
      </div>
    );
  }
}
