import { IRegistry } from "../../../registry";
import children from "./mockNodes/children";
import text from "./mockNodes/text";

const registry: IRegistry = {
  nodes: {
    text,
    children
  }
};

export default registry;
