
import Grid from '../containers/nodes/Grid';
import Button from '../containers/nodes/Button';
import Web from '../containers/nodes/Web';

export function findRoot(node) {
    if (node.parent === undefined) {
        return node;
    }
    return findRoot(node.parent);
}

// eslint-disable-next-line import/prefer-default-export
export const nodeMap = {
    grid: {
        element: Grid
    },
    button: {
        element: Button
    },
    web: {
        element: Web
    }
};
