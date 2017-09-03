import grid from '../components/Grid';

export default shareObject => {
    return new shareObject.Node('grid',
        {
            mandatoryArgs: [
                'nodes'
            ]
        },
        (args, reactArgs) => {
            return { type: 'grid', args, reactArgs };
        },
        grid(shareObject)
    );
};
