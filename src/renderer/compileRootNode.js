export default rootNodeFunc => {
    try {
        const rootNode = rootNodeFunc();
        return [false, rootNode];
    } catch (err) {
        return [true, 'There was a runtime error loading your config: "' + err + '"'];
    }
};
