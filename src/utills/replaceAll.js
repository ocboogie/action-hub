export default function replaceAll(obj, valueToReplace, replacement, reference=false) {
    if(!reference) {
        obj = {...obj};
    }
    for (let [key, value] of Object.entries(obj)) {
        if (typeof value === "object") {
            replaceAll(obj, valueToReplace, replacement, true);
        } else {
            if (value === valueToReplace) {
                obj[key] = replacement
            }
        }
    }
    if(!reference) {
        return obj;
    }
}
