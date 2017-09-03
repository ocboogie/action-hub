import Registrable from './Registrable';
import argParser from '../../common/utills/argParser';
import { defaultCommonArgs } from '../lib/action';
import { log } from '../actions/error';

export default class Action extends Registrable {
    constructor(name, args, creator, run) {
        super('action', name);
        this.args = args;
        this.creator = creator;
        this.run = run;
    }

    create(args, commonArgs = {}) {
        args = argParser(this.args, args, error => {
            window.store.dispatch(log(`There was an error while creating action "${this.name}": ${error}`));
        });
        return this.creator(args, Object.assign({}, defaultCommonArgs, commonArgs));
    }
}
