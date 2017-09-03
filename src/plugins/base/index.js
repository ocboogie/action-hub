import actions from './actions';
import nodes from './nodes';
import presets from './presets';

export default shareObject => {
    const plugin = new shareObject.Plugin('default');

    plugin.register(actions(shareObject))
        .register(nodes(shareObject))
        .register(presets(shareObject, plugin));

    return plugin;
};

