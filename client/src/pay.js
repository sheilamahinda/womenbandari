import React from 'react';
import './pay.css';

// Payment Summary Component
const PaymentSummary = () => {
  return (
    <div className="payment-summary">
      <h3>Summary</h3>
      <div className="summary-item">
        <img src="/advanced-grammar.png" alt="Advanced Grammar" />
        <p>Advanced Grammar<br />$24.69</p>
      </div>
      <div className="summary-item">
        <img src="/writing-skills.png" alt="Writing Skills" />
        <p>Writing Skills<br />$24.69</p>
      </div>
      <div className="summary-total">
        <p>Subtotal: $51.38</p>
        <p>Coupon Discount: 0%</p>
        <p>Tax: $0</p>
        <p>Total: $56.38</p>
      </div>
    </div>
  );
};

// Checkout Form Component
const CheckoutForm = () => {
  return (
    <div className="checkout-form">
      <h3>Checkout</h3>
      <div className="card-types">
        <img src="/paypal-logo.png" alt="PayPal" />
        <img src="/amex-logo.png" alt="American Express" />
        <img src="/visa-logo.png" alt="Visa" />
        <img src="/mastercard-logo.png" alt="MasterCard" />
      </div>
      <form>
        <label>Name on Card</label>
        <input type="text" placeholder="Enter name on card" />

        <label>Card Number</label>
        <input type="text" placeholder="Enter card number" />

        <label>Expiration Date (MM/YY)</label>
        <input type="text" placeholder="Enter expiration date" />

        <label>CVC</label>
        <input type="text" placeholder="Enter CVC" />

        <label>
          <input type="checkbox" /> Save my information for faster checkout
        </label>

        <button className="confirm-btn">Confirm Payment</button>
      </form>
    </div>
  );
};

// Special Offers Component
const SpecialOffers = () => {
  return (
    <div className="special-offers">
      <h3>Top Education Offers and Deals</h3>
      <div className="offer-list">
        <div className="offer-item">
          <img src="/offer1.png" alt="Conversational English" />
          <div className="offer-content">
            <p>50% Conversational English</p>
            <p>Developing fluency through discussions on various topics.</p>
          </div>
        </div>
        <div className="offer-item">
          <img src="/offer2.png" alt="Basic Grammar" />
          <div className="offer-content">
            <p>10% Basic Grammar and Vocabulary</p>
            <p>Introduction to common nouns, verbs, and sentence structures.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Pay Component
const Pay = () => {
  return (
    <div className="pay-container">
      <PaymentSummary />
      <CheckoutForm />
      <SpecialOffers />
    </div>
  );
};

export default Pay;
