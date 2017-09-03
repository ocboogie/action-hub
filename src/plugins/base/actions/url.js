export default shareObject => {
    return new shareObject.Action('url',
        {
            mandatoryArgs: [
                'url'
            ]
        },
        (args, commonArgs) => {
            return { type: 'url', args, commonArgs };
        },
        (args, commonArgs, hide) => {
            hide();
            shareObject.libraries.electron.shell.openExternal(args.url);
        }
    );
};
