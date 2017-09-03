
import * as electron from 'electron';
import React from 'react';
import cssModules from 'react-css-modules';
import * as reactRedux from 'react-redux';
import * as reactRouter from 'react-router';
import * as reactRouterRedux from 'react-router-redux';
import * as redux from 'redux';

import * as nodeUtills from '../lib/node';
import * as actionUtills from '../lib/action';

import * as actionActions from '../actions/action';
import * as errorActions from '../actions/error';
import * as nodeActions from '../actions/node';

import NodeContainer from '../containers/NodeContainer';

import Plugin from './Plugin';
import Node from './Node';
import Action from './Action';
import Preset from './Preset';

let shareObject;

export function init(store) {
    shareObject = {
        Plugin,
        Node,
        Action,
        Preset,
        NodeContainer,
        store,
        libraries: {
            electron,
            React,
            cssModules,
            reactRedux,
            reactRouter,
            reactRouterRedux,
            redux
        },
        utills: {
            node: nodeUtills,
            action: actionUtills
        },
        actions: {
            action: actionActions,
            error: errorActions,
            node: nodeActions
        }
    };
}

export function get() {
    return shareObject;
}
