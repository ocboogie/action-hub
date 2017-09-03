import { exec } from 'child_process';

export default shareObject => {
    return new shareObject.Action('cmd',
        {
            mandatoryArgs: [
                'cmd'
            ]
        },
        (args, commonArgs) => {
            return { type: 'cmd', args, commonArgs };
        },
        (args, commonArgs, hide) => {
            hide();
            exec(args.cmd);
        }
    );
};
