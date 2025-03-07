import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import '../asset/css/cart.css';
import { checkDiscountCode } from "../services/api";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [appliedDiscount, setAppliedDiscount] = useState(null);
  const [discountCode, setDiscountCode] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
      const userId = storedUser.id;
      const storedCart = JSON.parse(localStorage.getItem(`${userId}_cart`)) || [];
      setCart(storedCart);
    }
  }, []);

  const calculateSelectedTotal = (cartItems, selectedIndexes = []) => {
    const selectedTotal = cartItems
      .filter((_, index) => selectedIndexes.includes(index))
      .reduce((acc, item) => acc + item.unitprice * item.quantity, 0);
    
    setTotal(selectedTotal);
    
    if (appliedDiscount) {
      const discountAmount = (selectedTotal * appliedDiscount.percentage) / 100;
      setDiscount(discountAmount);
    } else {
      setDiscount(0);
    }
  };

  const handleQuantityChange = (index, newQuantity) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = newQuantity;
    setCart(updatedCart);
    if (user) {
      localStorage.setItem(`${user.id}_cart`, JSON.stringify(updatedCart));
    }
    calculateSelectedTotal(updatedCart, selectedItems);
  };

  const handleRemoveItem = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
    if (user) {
      localStorage.setItem(`${user.id}_cart`, JSON.stringify(updatedCart));
    }
    calculateSelectedTotal(updatedCart, selectedItems);
  };

  const handleSelectItem = (index) => {
    let updatedSelectedItems = selectedItems.includes(index)
      ? selectedItems.filter((item) => item !== index)
      : [...selectedItems, index];

    setSelectedItems(updatedSelectedItems);
    calculateSelectedTotal(cart, updatedSelectedItems);
  };

  const applyDiscount = async () => {
    try {
      const discountData = await checkDiscountCode(discountCode);
      if (discountData && discountData) {
        const discountAmount = (total * discountData.percentage) / 100;
        setDiscount(discountAmount);
        setAppliedDiscount(discountData);
      } else {
      }
    } catch (error) {
      alert("Error validating discount code!");
    }
  };

  const handleCheckout = () => {
    const selectedProducts = cart.filter((_, index) => selectedItems.includes(index));
  
    // Include size information in selected products
    const selectedProductsWithSize = selectedProducts.map(item => ({
      ...item, // Keep all existing fields
      size: item.size, // Explicitly include the size field (in case it's needed on checkout)
    }));
  
    let selectedTotal = total - discount;
  
    navigate("/checkout", {
      state: {
        selectedProducts: selectedProductsWithSize,
        total: selectedTotal,
        usedDiscount: appliedDiscount || null
      }
    });
  };
  

  return (
    <div className="cart-container">
      <button className="button-back" onClick={() => window.history.back()}>
        <span className="button-span1">
          <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4-4m-4 4 4 4" />
          </svg>
        </span>
      </button>
      <h2>Your Cart</h2>
      <ul className="cart-items">
        {cart.map((item, index) => (
          <li key={index} className="cart-item">
            <img src={item.imageurl} alt={item.name} className="cart-img" />
            <div className="cart-item-details">
              <h3>{item.productname}</h3>
              <p>Size: {item.size}</p>
              <p>Price: ${item.unitprice}</p>
              <div className="cart-item-actions">
                <label>
                  Quantity:
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(index, parseInt(e.target.value))}
                  />
                </label>
                <button onClick={() => handleRemoveItem(index)}>Remove</button>
                <label className="select">
                  <input type="checkbox" checked={selectedItems.includes(index)} onChange={() => handleSelectItem(index)} />
                  <span className="checkmark"></span>
                </label>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <h3>Total (Before Discount): ${total.toFixed(2)}</h3>
        {appliedDiscount && <p>Discount Applied: {appliedDiscount.percentage}% (-${discount.toFixed(2)})</p>}
        <h3>Final Total: ${(total - discount).toFixed(2)}</h3>
        <button className="checkout-btn" onClick={handleCheckout} disabled={selectedItems.length === 0}>
          <FontAwesomeIcon icon={faCreditCard} /> Pay Now
        </button>
      </div>
      <div className="discount-section">
        <input type="text" placeholder="Enter discount code" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} />
        <button className="apply-discount-btn" onClick={applyDiscount}>Apply</button>
      </div>
    </div>
  );
};

export default Cart;
