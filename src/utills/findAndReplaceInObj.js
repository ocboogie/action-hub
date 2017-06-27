export default function findAndReplaceInObj(obj, condition, replacement) {
    if (Array.isArray(obj)) {
        obj = obj.slice();
    } else {
        obj = Object.assign({}, obj);
    }
    if (condition(obj)) {
        return replacement(obj);
    }
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'object') {
            obj[key] = findAndReplaceInObj(value, condition, replacement);
        }
    }
    return obj;
}
