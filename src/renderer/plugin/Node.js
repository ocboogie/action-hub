import uuidv4 from 'uuid/v4';

import Registrable from './Registrable';
import argParser from '../../common/utills/argParser';
import { log } from '../actions/error';

export default class Node extends Registrable {
    constructor(name, args, creator, element) {
        super('node', name);
        this.args = args;
        this.creator = creator;
        this.element = element;
    }

    create(args, reactArgs = {}) {
        args = argParser(this.args, args, error => {
            window.store.dispatch(log(`There was an error while creating node "${this.name}": ${error}`));
        });
        const node = this.creator(args, reactArgs);
        node.uuid = uuidv4();
        return node;
    }
}
