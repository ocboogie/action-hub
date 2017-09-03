import text from '../components/Text';

export default shareObject => {
    return new shareObject.Node('text',
        {
            args: {
                text: ''
            }
        },
        (args, reactArgs) => {
            return { type: 'text', args, reactArgs };
        },
        text(shareObject)
    );
};
