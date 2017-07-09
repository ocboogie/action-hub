
import Button from '../containers/nodes/Button';
import Grid from '../containers/nodes/Grid';
import Text from '../containers/nodes/Text';
import Web from '../containers/nodes/Web';

export function findRoot(node) {
    if (node.parent === undefined) {
        return node;
    }
    return findRoot(node.parent);
}

// eslint-disable-next-line import/prefer-default-export
export const nodeMap = {
    button: {
        element: Button
    },
    grid: {
        element: Grid
    },
    text: {
        element: Text
    },
    web: {
        element: Web
    }
};
