import React, {Component} from 'react'
import {List, Header} from 'semantic-ui-react'
import NumberFormat from 'react-number-format'

export default class StockListing extends Component {
  render() {
    const stocksArr = this.props.stocks
    return (
      <React.Fragment>
        <Header as="h4">My Stocks</Header>
        <List divided>
          {stocksArr.map(stock => {
            let currentVal = stock.latestPrice * stock.shares
            let diff = 'gray'
            if (stock.open < stock.latestPrice) diff = 'green'
            if (stock.open > stock.latestPrice) diff = 'red'
            return (
              <List.Item key={stock.symbol}>
                <span className={diff}>{stock.symbol}</span> - {stock.shares},{' '}
                <NumberFormat
                  value={currentVal}
                  displayType={'text'}
                  thousandSeparator={true}
                  decimalScale={2}
                  fixedDecimalScale={true}
                  prefix={'$'}
                />
              </List.Item>
            )
          })}
        </List>
      </React.Fragment>
    )
  }
}
