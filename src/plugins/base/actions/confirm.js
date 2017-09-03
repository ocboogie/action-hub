export default shareObject => {
    return new shareObject.Action('confirm',
        {
            mandatoryArgs: [
                'action'
            ],
            args: {
                msg: ''
            }
        },
        (args, commonArgs) => {
            return { type: 'confirm', args, commonArgs };
        },
        (args, commonArgs, hide, dispatch) => {
            const choice = shareObject.libraries.electron.remote.dialog.showMessageBox(shareObject.electron.remote.getCurrentWindow(), {
                type: 'question',
                buttons: ['Yes', 'No'],
                title: 'Confirm',
                message: args.msg
            });
            if (choice === 0) {
                dispatch(shareObject.action.runAction(args.action));
            }
        }
    );
};
