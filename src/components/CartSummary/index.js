import {useState} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = () => {
  const [option, updateOption] = useState('')
  const [orderStatus, updateOrderStatus] = useState(false)
  const onChangeOption = event => {
    updateOption(event.target.value)
  }
  const confirmOrder = () => {
    updateOrderStatus(true)
  }
  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        let total = 0
        cartList.forEach(eachCartItem => {
          total += eachCartItem.price * eachCartItem.quantity
        })

        return (
          <>
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}
                /-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>
              <Popup
                modal
                trigger={
                  <button type="button" className="checkout-btn">
                    Checkout
                  </button>
                }
                className="popup-content"
              >
                {close => {
                  if (orderStatus) {
                    return (
                      <>
                        <p className="succes-text">
                          Your order has been placed successfully
                        </p>
                        <button onClick={() => close()} className="close-btn">
                          Close
                        </button>
                      </>
                    )
                  }
                  return (
                    <>
                      <h1 className="order-total-p-value">
                        <span className="order-total-label">Order Total:</span>
                        Rs {total}
                        /-
                      </h1>
                      <p className="total--p-items">
                        {cartList.length} Items in cart
                      </p>
                      <select
                        className="select-payment-option"
                        onChange={onChangeOption}
                      >
                        <option value="Card">Card Payment</option>
                        <option value="Net Banking">Net Banking</option>
                        <option value="UPI Payment">UPI Payment</option>
                        <option value="Wallet Payment">Wallet Payment</option>
                        <option value="COD">Cash on Delievery</option>
                      </select>
                      {option === 'COD' && (
                        <button onClick={confirmOrder} className="confirm-btn">
                          Confirm Order
                        </button>
                      )}
                    </>
                  )
                }}
              </Popup>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default CartSummary
