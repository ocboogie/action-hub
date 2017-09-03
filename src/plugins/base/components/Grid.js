export default shareObject => {
    const React = shareObject.libraries.React;

    class Grid extends React.Component {
        render() {
            const nodes = this.props.args.nodes;
            const gridSize = (100 / Math.ceil(Math.sqrt(nodes.length))).toString() + '%';

            const GridNodeContainer = {
                width: gridSize,
                height: gridSize,
                float: 'left'
            };

            const renderedNodes = nodes.map(node => {
                return (<div style={GridNodeContainer} key={node.uuid}>{shareObject.utills.node.getCachedNode(node)}</div>);
            });
            return (
                <div>
                    {renderedNodes}
                </div>
            );
        }
    }

    return shareObject.libraries.reactRedux.connect()(Grid);
};
