import grid from './grid';
import text from './text';
import web from './web';

export default shareObject => {
    return [
        grid(shareObject),
        text(shareObject),
        web(shareObject)
    ];
};
