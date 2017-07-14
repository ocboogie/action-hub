export default function argParser(map, key, args, error) {
    if (!(key in map)) {
        error('Key in not in map', key);
        return;
    }
    for (const value of (map[key].mandatoryArgs || [])) {
        if (args[value] === undefined) {
            error('A mandatory arg in undefined', value);
            return;
        }
    }
    return Object.assign({}, map[key].args, args);
}
