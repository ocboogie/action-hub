export default function deepMap(obj, func) {
    if (Array.isArray(obj)) {
        obj = obj.slice();
    } else {
        obj = Object.assign({}, obj);
    }
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
            obj[key] = deepMap(value, func);
        } else {
            const output = func(value);
            if (output !== undefined) {
                obj[key] = output;
            }
        }
    }
    return obj;
}
