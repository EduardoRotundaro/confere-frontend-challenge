import {createStore} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers';

const DEV_MODE = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const PERSIST_CONFIG = {
    storage,
    key: 'root',
}

const store = createStore(
    persistReducer(PERSIST_CONFIG, reducers),
    DEV_MODE
);
const persistor = persistStore(store);

export { store, persistor };
