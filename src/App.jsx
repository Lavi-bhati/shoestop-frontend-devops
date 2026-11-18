
import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from 'react-router-dom';

import Login from './component/login/Login';
import Signup from './component/signup/Signup';
import Home from './component/home/Home';
import Cart from './component/cart/Cart';

import Context from './component/contextAPI/Context';

function App() {
    return (
        <Context>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={<Navigate to="/login" />}
                    />

                    <Route
                        path="/login"
                        element={<Login />}
                    />

                    <Route
                        path="/signup"
                        element={<Signup />}
                    />

                    <Route
                        path="/home"
                        element={<Home />}
                    />

                    <Route
                        path="/cart"
                        element={<Cart />}
                    />
                </Routes>
            </BrowserRouter>
        </Context>
    );
}

export default App;
