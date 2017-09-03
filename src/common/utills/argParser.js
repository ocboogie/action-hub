export default function argParser(argTemplate, args, error) {
    for (const value of (argTemplate.mandatoryArgs || [])) {
        if (args[value] === undefined) {
            error(`Argument ${value} is mandatory`);
            return;
        }
    }
    return Object.assign({}, argTemplate.args, args);
}
