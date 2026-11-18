
import API_URL from '../../api';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import './home.css';
import { Button } from 'react-bootstrap';
import { productContext } from '../contextAPI/Context';

const Product = () => {
    const [products, setProducts] = useState([]);
    const { token } = useContext(productContext);

    // Fetch all products
    const fetchData = async () => {
        try {
            const res = await axios.get(`${API_URL}/api/getproducts`);
            setProducts(res.data);
        } catch (error) {
            console.error(
                'Error fetching products:',
                error.response?.data || error.message
            );
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Add product to favourites
    const getProduct = async (image, title, company, price) => {
        if (!token) {
            alert('Please login first!');
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/api/addfav`,
                { image, title, company, price },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 202) {
                alert('Already in favourite list');
            } else {
                alert('Item added to favourites');
            }
        } catch (error) {
            console.error(
                'Error adding favourite:',
                error.response?.data || error.message
            );
            alert(error.response?.data?.message || 'Unable to add favourite');
        }
    };

    // Add product to cart
    const addtoCart = async (image, title, company, price) => {
        if (!token) {
            alert('Please login first!');
            return;
        }

        try {
            const response = await axios.post(
                `${API_URL}/api/addcart`,
                { image, title, company, price },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 202) {
                alert('Already in cart');
            } else {
                alert('Item added to cart');
            }
        } catch (error) {
            console.error(
                'Error adding to cart:',
                error.response?.data || error.message
            );

            alert(
                error.response?.data?.message ||
                error.response?.data?.error ||
                'Unable to add item to cart. Please try again.'
            );
        }
    };

    return (
        <div className="product">
            <h3 className="text-center p-4">Products</h3>

            <div className="pro-layout">
                {products && products.length > 0 ? (
                    products.map((li) => (
                        <div className="cardz" key={li._id}>
                            <img
                                src={li.image}
                                className="image"
                                alt={li.title}
                            />

                            <p className="title">{li.title}</p>

                            <div className="comrice">
                                <p className="company">{li.company}</p>
                                <p className="price text-dark">
                                    Rs: {li.price}
                                </p>
                            </div>

                            <div className="btns">
                                <Button
                                    variant="success px-4"
                                    onClick={() =>
                                        addtoCart(
                                            li.image,
                                            li.title,
                                            li.company,
                                            li.price
                                        )
                                    }
                                >
                                    Add to Cart
                                </Button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>
                        <p>No products found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;

