export default shareObject => {
    return new shareObject.Action('func',
        {
            mandatoryArgs: [
                'func'
            ],
            args: {
                args: []
            }
        },
        (args, commonArgs) => {
            return { type: 'func', args, commonArgs };
        },
        (args, commonArgs, hide, dispatch) => {
            try {
                args.func(...args.args);
            } catch (e) {
                dispatch(shareObject.actions.error.log(`An error occurred while running your function: ${e}`));
            }
        }
    );
};
