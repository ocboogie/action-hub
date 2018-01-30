import CheerioReactBind from "cheerio-react-bind";
import * as React from "react";

import Logger from "../../common/Logger";
import { IRegistry } from "../registry";
import NodeTagRenderer from "./NodeTagRenderer";

export interface INodeManagerProps {
  $: CheerioStatic;
  registry: IRegistry;
  logger: Logger;
}

export default class NodeManager extends React.Component<INodeManagerProps> {
  constructor(props: INodeManagerProps) {
    super(props);
  }

  public errorHandler(msg: string) {
    this.props.logger.report("error", msg);
  }

  public render() {
    const errorHandler = this.errorHandler.bind(this);

    return (
      <>
        <CheerioReactBind
          $={this.props.$}
          $elem={this.props.$.root()
            .children()
            .first()}
          tagRendererArgs={{
            registry: this.props.registry
          }}
          tagRenderer={NodeTagRenderer}
          errorHandler={errorHandler}
        />
      </>
    );
  }
}
