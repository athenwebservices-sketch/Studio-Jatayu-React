import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import styled from 'styled-components';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 20px;
`;

const CartTitle = styled.h1`
  color: #2c3e50;
  margin-bottom: 2rem;
`;

const CartContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItems = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #ecf0f1;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  color: white;
  margin-right: 1rem;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  color: #2c3e50;
  margin-bottom: 0.5rem;
`;

const ItemPrice = styled.p`
  color: #667eea;
  font-weight: bold;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const QuantityButton = styled.button`
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #f8f9fa;
  }
`;

const QuantityInput = styled.input`
  width: 50px;
  text-align: center;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.25rem;
`;

const RemoveButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #c0392b;
  }
`;

const CartSummary = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  
  &.total {
    font-weight: bold;
    font-size: 1.2rem;
    color: #2c3e50;
    padding-top: 1rem;
    border-top: 2px solid #ecf0f1;
  }
`;

const CheckoutButton = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 5px;
  text-align: center;
  font-weight: bold;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
`;

const EmptyCartText = styled.p`
  color: #7f8c8d;
  margin-bottom: 2rem;
`;

const ShopButton = styled(Link)`
  display: inline-block;
  padding: 1rem 2rem;
  background: #667eea;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background 0.3s ease;
  
  &:hover {
    background: #5a67d8;
  }
`;

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity));
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.1; // 10% tax
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 10; // Free shipping over $100
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  if (items.length === 0) {
    return (
      <CartContainer>
        <CartTitle>Shopping Cart</CartTitle>
        <EmptyCart>
          <EmptyCartIcon>🛒</EmptyCartIcon>
          <EmptyCartText>Your cart is empty</EmptyCartText>
          <ShopButton to="/store">Continue Shopping</ShopButton>
        </EmptyCart>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartTitle>Shopping Cart</CartTitle>
      
      <CartContent>
        <CartItems>
          {items.map(item => (
            <CartItem key={item._id}>
              <ItemImage>{item.icon || '📦'}</ItemImage>
              <ItemDetails>
                <ItemName>{item.name}</ItemName>
                <ItemPrice>${item.price}</ItemPrice>
              </ItemDetails>
              <QuantityControls>
                <QuantityButton
                  onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                >
                  -
                </QuantityButton>
                <QuantityInput
                  type="number"
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(item._id, e.target.value)}
                  min="1"
                />
                <QuantityButton
                  onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                >
                  +
                </QuantityButton>
              </QuantityControls>
              <RemoveButton onClick={() => removeFromCart(item._id)}>
                Remove
              </RemoveButton>
            </CartItem>
          ))}
        </CartItems>

        <CartSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryRow>
            <span>Subtotal:</span>
            <span>${calculateSubtotal().toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Tax:</span>
            <span>${calculateTax().toFixed(2)}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping:</span>
            <span>
              {calculateShipping() === 0 ? 'FREE' : `$${calculateShipping().toFixed(2)}`}
            </span>
          </SummaryRow>
          <SummaryRow className="total">
            <span>Total:</span>
            <span>${calculateTotal().toFixed(2)}</span>
          </SummaryRow>
          <CheckoutButton to="/checkout">
            Proceed to Checkout
          </CheckoutButton>
        </CartSummary>
      </CartContent>
    </CartContainer>
  );
};

export default Cart;