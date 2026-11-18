
import API_URL from '../../api';
import React, { useContext, useEffect, useState } from 'react';
import './cart.css';
import { Button, Container } from 'react-bootstrap';
import { productContext } from '../contextAPI/Context';
import axios from 'axios';

const Cart = () => {
    const {
        cartProduct,
        setCartProducts,
        getcart,
        token
    } = useContext(productContext);

    const [total, setTotal] = useState(0);

    // Calculate total cart value
    useEffect(() => {
        const cartTotal = cartProduct.reduce((acc, item) => {
            const price = Number(item.price) || 0;
            const quantity = Number(item.quantity) || 1;

            return acc + price * quantity;
        }, 0);

        setTotal(cartTotal);
    }, [cartProduct]);

    // Remove item from cart
    const removeFavItems = async (id) => {
        try {
            await axios.delete(`${API_URL}/api/addcart/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            await getcart();
        } catch (error) {
            console.error(
                'Error removing cart item:',
                error.response?.data || error.message
            );

            alert('Unable to remove item from cart');
        }
    };

    // Increase quantity
    const addQty = (id) => {
        const updatedCartItems = cartProduct.map((item) =>
            item._id === id
                ? {
                    ...item,
                    quantity: (Number(item.quantity) || 1) + 1
                }
                : item
        );

        setCartProducts(updatedCartItems);
    };

    // Decrease quantity
    const reduceQty = (id) => {
        const updatedCartItems = cartProduct.map((item) =>
            item._id === id
                ? {
                    ...item,
                    quantity: Math.max(1, (Number(item.quantity) || 1) - 1)
                }
                : item
        );

        setCartProducts(updatedCartItems);
    };

    return (
        <Container>
            <div>
                {cartProduct.length > 0 ? (
                    <div className="cart">
                        <h4 className="text-center py-3">
                            {cartProduct.length} items in your Cart
                        </h4>

                        {cartProduct.map((li) => (
                            <div key={li._id}>
                                <div className="item">
                                    <img
                                        src={li.image}
                                        className="img"
                                        alt={li.title}
                                    />

                                    <div className="mx-3">
                                        <p className="cp-title">
                                            {li.title}
                                        </p>
                                        <p className="cp-company">
                                            {li.company}
                                        </p>
                                    </div>

                                    <div className="quantity-counter my-2">
                                        <Button
                                            className="mx-3"
                                            onClick={() => reduceQty(li._id)}
                                        >
                                            -
                                        </Button>

                                        <p>{Number(li.quantity) || 1}</p>

                                        <Button
                                            className="mx-3"
                                            onClick={() => addQty(li._id)}
                                        >
                                            +
                                        </Button>
                                    </div>

                                    <p className="cp-price text-dark mx-5 my-3">
                                        Rs: {(Number(li.price) || 0) *
                                            (Number(li.quantity) || 1)}
                                    </p>

                                    <div className="Fbtns">
                                        <Button
                                            variant="danger"
                                            onClick={() =>
                                                removeFavItems(li._id)
                                            }
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-around'
                            }}
                        >
                            <p>Total</p>
                            <p>Rs: {total}</p>
                        </div>
                    </div>
                ) : (
                    <div className="no-items">
                        <p>No Items are added to the cart</p>
                    </div>
                )}
            </div>
        </Container>
    );
};

export default Cart;
