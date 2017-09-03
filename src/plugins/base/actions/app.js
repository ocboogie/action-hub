import { exec } from 'child_process';

export default shareObject => {
    return new shareObject.Action('app',
        {
            mandatoryArgs: [
                'path'
            ]
        },
        (args, commonArgs) => {
            return { type: 'app', args, commonArgs };
        },
        (args, commonArgs, hide) => {
            hide();
            exec(`"${args.path}"`);
        }
    );
};
