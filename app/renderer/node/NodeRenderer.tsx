import * as joi from "joi";
import * as React from "react";

import Logger from "../../common/Logger";
import { INode } from "./index";

export interface INodeRendererProps {
  node: INode;
  args?: object;
  logger?: Logger;
}

export default class NodeRenderer extends React.Component<INodeRendererProps> {
  public render() {
    const logger = this.props.logger || window.logger;
    const node = this.props.node;
    const NodeComponent = node.component;

    const error = node.argSchema.validate(this.props.args).error;
    if (error) {
      if (!logger) {
        throw error;
      }
      logger.report(
        "error",
        "Incorrect arguments passed to node",
        error.message
      );
      return <div />;
    }

    return (
      <div>
        <NodeComponent {...this.props.args} />
      </div>
    );
  }
}
