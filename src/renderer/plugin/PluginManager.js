export default class PluginManager {
    constructor(log) {
        this.plugins = [];
        this.log = log;
    }

    findRegistrable(type, name) {
        for (const plugin of this.plugins) {
            const found = plugin.findRegistrable(type, name);
            if (found !== undefined) {
                return found;
            }
        }
        if (this.log) {
            this.log(`Could not find "${name}" of type "${type}"`);
        }
    }

    create(type, name, args, commonArgs) {
        const found = this.findRegistrable(type, name);
        if (found !== undefined) {
            return found.create(args, commonArgs);
        }
        if (this.log) {
            this.log(`Could not find "${name}" of type "${type}"`);
        }
    }

    loadPlugin(plugin) {
        plugin.log = this.log;
        this.plugins.push(plugin);
    }
}
