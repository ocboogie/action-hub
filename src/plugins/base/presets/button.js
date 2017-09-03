export default (shareObject, plugin) => {
    return new shareObject.Preset('button',
        {
            mandatoryArgs: [
                'action'
            ],
            args: {
                text: ''
            }
        },
        args => {
            return plugin.findRegistrable('node', 'text').create(
                {
                    text: args.text
                },
                {
                    onClick() {
                        console.log(shareObject);
                        shareObject.store.dispatch(shareObject.actions.action.runAction(args.action));
                    },
                    style: {
                        cursor: 'pointer'
                    }
                }
            );
        }
    );
};
