import app from './app';
import cmd from './cmd';
import confirm from './confirm';
import func from './func';
import node from './node';
import url from './url';

export default shareObject => {
    return [app(shareObject), cmd(shareObject), confirm(shareObject), func(shareObject), node(shareObject), url(shareObject)];
};
