import dir2actions from './dir2actions';
import button from './button';

export default (shareObject, plugin) => {
    return [
        dir2actions(shareObject, plugin),
        button(shareObject, plugin)
    ];
};
