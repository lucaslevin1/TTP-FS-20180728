import React, {Component} from 'react'
import {Header} from 'semantic-ui-react'

class BuyStock extends Component {
  render() {
    const {stocks} = this.props
    console.log(stocks)
    const availableCash =
      5000 -
      Math.round(
        stocks.reduce((accum, stock) => {
          return accum + stock.price * stock.shares
        }, 0) * 100
      ) /
        100
    return (
      <React.Fragment>
        <Header as="h4">Buy Stocks</Header>
        Budget: ${availableCash}
      </React.Fragment>
    )
  }
}

export default BuyStock
