export default shareObject => {
    return new shareObject.Action('node',
        {
            mandatoryArgs: [
                'node'
            ]
        },
        (args, commonArgs) => {
            return { type: 'node', args, commonArgs };
        },
        (args, commonArgs, hide, dispatch) => {
            dispatch(shareObject.actions.node.displayNode(args.node));
        }
    );
};
