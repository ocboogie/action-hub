export default class Plugin {
    constructor(name) {
        this.name = name;
        this.registrables = Object.create(null);
        this.log = null;
    }

    findRegistrable(type, name) {
        if (Object.prototype.hasOwnProperty.call(this.registrables, type)) {
            const found = this.registrables[type][name];
            if (found !== undefined) {
                return found;
            }
        }
        if (this.log) {
            this.log(`Could not find "${name}" of type "${type}"`);
        }
    }

    register(registrables) {
        if (Array.isArray(registrables)) {
            for (const registrable of registrables) {
                this.register(registrable);
            }
        } else {
            if (!Object.prototype.hasOwnProperty.call(this.registrables, registrables.type)) {
                this.registrables[registrables.type] = Object.create(null);
            }
            registrables.origins = this;
            this.registrables[registrables.type][registrables.name] = registrables;
        }
        return this;
    }
}
