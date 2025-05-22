import {Component} from 'react'
import Popup from 'reactjs-popup'
import CartContext from '../../context/CartContext'
import 'reactjs-popup/dist/index.css'
import './index.css'

class CartSummary extends Component {
  state = {
    paymentMethod: 'none',
    orderPlaced: false,
  }

  setPaymentMethod = method => {
    this.setState({paymentMethod: method})
  }

  onConfirmOrder = () => {
    const {paymentMethod} = this.state
    if (paymentMethod === 'cash') {
      this.setState({orderPlaced: true})
    }
  }

  renderPopup = (cartList, total, close) => {
    const {paymentMethod, orderPlaced} = this.state

    return (
      <div className="popup-container">
        <h2>Select Payment Method</h2>
        <form className="payment-form">
          <label>
            <input type="radio" name="payment" value="card" disabled />
            Card
          </label>
          <label>
            <input type="radio" name="payment" value="netbanking" disabled />
            Net Banking
          </label>
          <label>
            <input type="radio" name="payment" value="upi" disabled />
            UPI
          </label>
          <label>
            <input type="radio" name="payment" value="wallet" disabled />
            Wallet
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => this.setPaymentMethod('cash')}
            />
            Cash on Delivery
          </label>
        </form>

        <div className="summary-details">
          <p>
            <strong>Total Items:</strong> {cartList.length}
          </p>
          <p>
            <strong>Total Price:</strong> ₹{total}
          </p>
        </div>

        <button
          className="confirm-button"
          disabled={paymentMethod !== 'cash'}
          onClick={this.onConfirmOrder}
          type="button"
        >
          Confirm Order
        </button>

        {orderPlaced && (
          <p className="success-message">
            Your order has been placed successfully!
          </p>
        )}

        <button onClick={close} className="close-button" type="button">
          Close
        </button>
      </div>
    )
  }

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList} = value
          const total = cartList.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0,
          )

          return (
            <div className="cart-summary-container">
              <h1 className="order-total-value">
                <span className="order-total-label">Order Total:</span> Rs{' '}
                {total}/-
              </h1>
              <p className="total-items">{cartList.length} Items in cart</p>

              <Popup
                modal
                trigger={
                  <button type="button" className="checkout-button d-sm-none">
                    Checkout
                  </button>
                }
              >
                {close => this.renderPopup(cartList, total, close)}
              </Popup>
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartSummary
