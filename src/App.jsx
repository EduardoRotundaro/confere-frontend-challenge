import React from 'react';
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from 'react-router-dom';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './redux/config';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import NotFound from './pages/NotFound';
import Product from './pages/Product';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Header />
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/home" />
                        </Route>
                        <Route path="/confere-frontend-challenge">
                            <Redirect to="/home" />
                        </Route>
                        <Route path="/home">
                            <Home />
                        </Route>
                        <Route path="/product/:id" >
                            <Product />
                        </Route>
                        <Route path="/cart" >
                            <Cart />
                        </Route>
                        <Route path="*">
                            <NotFound />
                        </Route>
                    </Switch>
                    <Footer />
                </Router>
            </PersistGate>
        </Provider>
    );
}
