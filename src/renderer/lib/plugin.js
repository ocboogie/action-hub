import { log } from '../actions/error';

export function create(type, name, args, commonArgs) {
    if (!window.pluginManager) {
        window.store.dispatch(log('Somehow the plugin manager was not loaded'));
        return;
    }

    const found = window.pluginManager.findRegistrable(type, name);
    if (found !== undefined) {
        return found.create(args, commonArgs);
    }
}
