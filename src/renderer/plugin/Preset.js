import Registrable from './Registrable';
import argParser from '../../common/utills/argParser';

import { log } from '../actions/error';

export default class Preset extends Registrable {
    constructor(name, args, creator) {
        super('preset', name);
        this.args = args;
        this.creator = creator;
    }

    create(args) {
        args = argParser(this.args, args, error => {
            window.store.dispatch(log(`There was an error while creating preset "${this.name}": ${error}`));
        });
        return this.creator(args);
    }
}
