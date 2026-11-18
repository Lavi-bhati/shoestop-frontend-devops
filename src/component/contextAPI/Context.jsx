
import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import API_URL from '../../api';

export const productContext = createContext();

const Context = ({ children }) => {
    const [favProList, setFavProductList] = useState([]);
    const [cartProduct, setCartProducts] = useState([]);

    // Load saved token when the context initializes
    const [token, setToken] = useState(
        () => localStorage.getItem('token') || ''
    );

    // Fetch favourites
    const getFav = async () => {
        if (!token) {
            setFavProductList([]);
            return;
        }

        try {
            const response = await axios.get(
                `${API_URL}/api/addfav`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setFavProductList(response.data);
        } catch (error) {
            console.error(
                'Error fetching favourites:',
                error.response?.data || error.message
            );
        }
    };

    // Fetch cart items
    const getcart = async () => {
        if (!token) {
            setCartProducts([]);
            return;
        }

        try {
            const response = await axios.get(
                `${API_URL}/api/addcart`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setCartProducts(response.data);
        } catch (error) {
            console.error(
                'Error fetching cart:',
                error.response?.data || error.message
            );
        }
    };

    // Fetch data whenever login token changes
    useEffect(() => {
        if (token) {
            getFav();
            getcart();
        } else {
            setFavProductList([]);
            setCartProducts([]);
        }
    }, [token]);

    return (
        <productContext.Provider
            value={{
                favProList,
                setFavProductList,
                cartProduct,
                setCartProducts,
                token,
                setToken,
                getFav,
                getcart
            }}
        >
            {children}
        </productContext.Provider>
    );
};

export default Context;
