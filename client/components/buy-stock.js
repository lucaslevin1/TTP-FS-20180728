import React, {Component} from 'react'
import {Header, Form, Button} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {buyStock} from '../store/trades'
import DollarComp from './dollar-comp'
import BuyStockErrors from './buy-stock-errors'

class BuyStock extends Component {
  availableCash = stocks => {
    return (
      5000 -
      stocks.reduce((accum, stock) => {
        return accum + stock.price * stock.shares
      }, 0)
    )
  }

  render() {
    const {stocks, buyAStock} = this.props
    let availableCash = 5000
    if (stocks) availableCash = this.availableCash(stocks)
    return (
      <React.Fragment>
        <Header as="h4">
          Buy Stocks - Available Cash: <DollarComp money={availableCash} />
        </Header>
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
        <BuyStockErrors />
      </React.Fragment>
    )
  }
}

const mapDispatch = dispatch => ({
  buyAStock: (symbol, quantity, availableCash) =>
    dispatch(buyStock(symbol, quantity, availableCash))
})

export default connect(null, mapDispatch)(BuyStock)
