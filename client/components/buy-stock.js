import React, {Component} from 'react'
import {Header, Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {buyStock} from '../store/trades'

class BuyStock extends Component {
  availableCash = stocks => {
    return (
      5000 -
      Math.round(
        stocks.reduce((accum, stock) => {
          return accum + stock.price * stock.shares
        }, 0) * 100
      ) /
        100
    )
  }

  render() {
    const {
      stocks,
      buyAStock,
      quantityError,
      symbolError,
      overageError
    } = this.props
    const availableCash = this.availableCash(stocks)
    return (
      <React.Fragment>
        <Header as="h4">Buy Stocks</Header>
        Budget: ${availableCash}
        <Form
          onSubmit={evt => {
            evt.preventDefault()
            const symbol = evt.target.symbol.value
            const quantity = evt.target.quantity.value
            buyAStock(symbol, quantity, availableCash)
          }}
        >
          <Form.Group widths="equal">
            <Form.Field>
              <label htmlFor="symbol">Symbol</label>
              <input name="symbol" type="text" placeholder="Symbol" />
            </Form.Field>
            <Form.Field>
              <label htmlFor="quantity">Quantity</label>
              <input name="quantity" type="text" placeholder="Quantity" />
            </Form.Field>
          </Form.Group>
          <Button type="submit">Buy</Button>
        </Form>
        {symbolError ? (
          <p className="red">Error: Invalid stock symbol.</p>
        ) : (
          <div />
        )}
        {quantityError ? (
          <p className="red">
            Error: Invalid quantity. The quantity needs to be greater than 0.
          </p>
        ) : (
          <div />
        )}
        {overageError ? (
          <p className="red">
            Error: You do not have the funds in your account to purchase this
            stock at this quantity.
          </p>
        ) : (
          <div />
        )}
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  quantityError: state.trades.quantityError,
  symbolError: state.trades.symbolError,
  overageError: state.trades.overageError
})

const mapDispatch = dispatch => ({
  buyAStock: (symbol, quantity, availableCash) =>
    dispatch(buyStock(symbol, quantity, availableCash))
})

export default connect(mapState, mapDispatch)(BuyStock)
