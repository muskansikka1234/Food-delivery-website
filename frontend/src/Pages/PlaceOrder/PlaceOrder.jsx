import { StoreContext } from '../../Context/StoreContext';
import './Placeorder.css';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Correct import
import Modal from './Modal'; // Import the Modal component

const PlaceOrder = () => {
    const { getTotalCartAmount, token, food_list, cartItems, url } = useContext(StoreContext);
    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    });
    const [modalMessage, setModalMessage] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const placeOrder = async (event) => {
        event.preventDefault();

        const orderItems = food_list
            .filter((item) => cartItems[item._id] > 0)
            .map((item) => ({ ...item, quantity: cartItems[item._id] }));

        if (orderItems.length === 0) {
            setErrorMessage("Please add some items to the cart to proceed with this order.");
            return;
        }

        const orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + 2,
        };

        try {
            const response = await axios.post(`${url}/api/order/place`, orderData, { headers: { token } });

            if (response.data.success) {
                window.location.replace(response.data.session_url);
            } else {
                setModalMessage("Thank you for your order! We will contact you shortly to confirm your payment method.");
                setShowModal(true);
            }
        } catch (error) {
            console.error("Error placing order:", error);
            setModalMessage("An error occurred while placing your order. Please try again later.");
            setShowModal(true);
        }
    };

    const closeModal = () => setShowModal(false);

    useEffect(() => {
        if (!token) {
            navigate('/cart');
        } else if (getTotalCartAmount() === 0) {
            setErrorMessage("Your cart is empty. Add items to proceed.");
        }
    }, [token, getTotalCartAmount, navigate]);

    return (
        <form onSubmit={placeOrder} className="place-order">
            <div className="place-order-left">
                <p className="title">Delivery Information</p>
                <div className="multi-fields">
                    <input
                        required
                        name="firstName"
                        onChange={onChangeHandler}
                        value={data.firstName}
                        type="text"
                        placeholder="First name"
                    />
                    <input
                        required
                        name="lastName"
                        onChange={onChangeHandler}
                        value={data.lastName}
                        type="text"
                        placeholder="Last name"
                    />
                </div>
                <input
                    required
                    name="email"
                    onChange={onChangeHandler}
                    value={data.email}
                    type="email"
                    placeholder="Email address"
                />
                <input
                    required
                    name="street"
                    onChange={onChangeHandler}
                    value={data.street}
                    type="text"
                    placeholder="Street"
                />
                <div className="multi-fields">
                    <input
                        required
                        name="city"
                        onChange={onChangeHandler}
                        value={data.city}
                        type="text"
                        placeholder="City"
                    />
                    <input
                        required
                        name="state"
                        onChange={onChangeHandler}
                        value={data.state}
                        type="text"
                        placeholder="State"
                    />
                </div>
                <div className="multi-fields">
                    <input
                        required
                        name="zipcode"
                        onChange={onChangeHandler}
                        value={data.zipcode}
                        type="text"
                        placeholder="Zip code"
                    />
                    <input
                        required
                        name="country"
                        onChange={onChangeHandler}
                        value={data.country}
                        type="text"
                        placeholder="Country"
                    />
                </div>
                <input
                    required
                    name="phone"
                    onChange={onChangeHandler}
                    value={data.phone}
                    type="text"
                    placeholder="Phone"
                />
            </div>

            <div className="place-order-right">
                <div className="cart-total">
                    <h2>Cart Totals</h2>
                    <div>
                        <div className="cart-total-details">
                            <p>Subtotal</p>
                            <p>${getTotalCartAmount()}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <p>Delivery Fee</p>
                            <p>${getTotalCartAmount() === 0 ? 0 : 2}</p>
                        </div>
                        <hr />
                        <div className="cart-total-details">
                            <b>Total</b>
                            <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + 2}</b>
                        </div>
                    </div>

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit">PROCEED TO PAYMENT</button>
                </div>
            </div>

            {showModal && <Modal message={modalMessage} onClose={closeModal} />}
        </form>
    );
};

export default PlaceOrder;
