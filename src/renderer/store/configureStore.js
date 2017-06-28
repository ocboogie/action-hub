let configureStoreObj;
if (process.env.NODE_ENV === 'development') {
    configureStoreObj = require('./configureStore.dev');
} else {
    configureStoreObj = require('./configureStore.prod');
}
const configureStore = configureStoreObj.configureStore;
const history = configureStoreObj.history;
export { configureStore, history };
