import {Component} from 'react'
import './index.css'

const paymentOptionsList = [
  {
    id: 'CARD',
    displayText: 'Card',
    isDisabled: true,
  },
  {
    id: 'NET BANKING',
    displayText: 'Net Banking',
    isDisabled: true,
  },
  {
    id: 'UPI',
    displayText: 'UPI',
    isDisabled: true,
  },
  {
    id: 'WALLET',
    displayText: 'Wallet',
    isDisabled: true,
  },
  {
    id: 'CASH ON DELIVERY',
    displayText: 'Cash on Delivery',
    isDisabled: false,
  },
]

class Payments extends Component {
  state = {isOrderPlaced: false, paymentMethod: ''}

  onChangeInput = event => {
    this.setState({paymentMethod: event.target.value})
  }

  onClickConfirmBtn = () => {
    const {paymentMethod} = this.state
    if (paymentMethod !== '') {
      this.setState({isOrderPlaced: true})
    }
  }

  displayOptions = () => {
    const {items, totalAmount} = this.props
    const {paymentMethod} = this.state
    return (
      <>
        <h1 className="payment-heading">Payment Details</h1>
        <p className="payment-method">Payment Method</p>
        <ul className="payment-method-list-container">
          {paymentOptionsList.map(each => (
            <li className="payment-list-con">
              <input
                className="payment-type"
                type="radio"
                id={each.id}
                value={each.id}
                disabled={each.isDisabled}
                name="paymentMethod"
                onChange={this.onChangeInput}
              />
              <label
                className={
                  each.isDisabled ? 'label-payment' : 'label-payment label-ok'
                }
                htmlFor={each.id}
              >
                {each.displayText}
              </label>
            </li>
          ))}
        </ul>
        <p className="order-details">Order Details:</p>
        <p className="items-text">Items in Cart: {items}</p>
        <p className="amount-text">Total Amount: RS {totalAmount}/-</p>
        <button
          disabled={paymentMethod === ''}
          onClick={this.onClickConfirmBtn}
          className="confirm-order-btn"
        >
          Confirm Order
        </button>
      </>
    )
  }

  render() {
    const {isOrderPlaced} = this.state
    return (
      <div className="payments-container">
        {isOrderPlaced ? (
          <p className="order-sucees-text">
            Your Order has been Sucessfully Placed
          </p>
        ) : (
          this.displayOptions()
        )}
      </div>
    )
  }
}
export default Payments
