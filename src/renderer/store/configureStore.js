// console.log((__DEV__) ? "./createStore.dev" : "./createStore.prod");
let configureStoreObj;
if (__DEV__) {
    configureStoreObj = require("./configureStore.dev");
} else {
    configureStoreObj = require("./configureStore.prod");
}
const configureStore = configureStoreObj.configureStore;
const history = configureStoreObj.history;
export {configureStore, history}