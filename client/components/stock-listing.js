import React, {Component} from 'react'
import {List, Header} from 'semantic-ui-react'

export default class StockListing extends Component {
  render() {
    const stocksArr = this.props.stocks
    return (
      <React.Fragment>
        <Header as="h4">My Stocks</Header>
        <List divided>
          {stocksArr.map(stock => {
            let currentVal =
              Math.round(stock.latestPrice * stock.shares * 100) / 100
            let diff = 'gray'
            if (stock.open < stock.latestPrice) diff = 'green'
            if (stock.open > stock.latestPrice) diff = 'red'
            return (
              <List.Item key={stock.symbol}>
                <span className={diff}>{stock.symbol}</span> - {stock.shares}, ${
                  currentVal
                }
              </List.Item>
            )
          })}
        </List>
      </React.Fragment>
    )
  }
}
