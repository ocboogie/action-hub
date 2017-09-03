import web from '../components/Web';

export default shareObject => {
    return new shareObject.Node('web',
        {
            mandatoryArgs: [
                'url'
            ]
        },
        (args, reactArgs) => {
            return { type: 'web', args, reactArgs };
        },
        web(shareObject)
    );
};
