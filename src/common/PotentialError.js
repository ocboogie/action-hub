export default class PotentialError {
    constructor() {
        this.active = false;
        this.msg = '';
    }

    activate(msg) {
        this.active = true;
        this.msg = msg;
    }

    deactivate() {
        this.active = false;
        this.msg = '';
    }

    toObj() {
        return { msg: this.msg, active: this.active };
    }
}
