import React, {Component} from 'react'
import {List, Header} from 'semantic-ui-react'
import StockListingItem from './stock-listing-item'

export default class StockListing extends Component {
  render() {
    const stocksArr = this.props.stocks
    return (
      <React.Fragment>
        <Header as="h4">My Stocks</Header>
        {stocksArr.length ? (
          <List divided>
            {stocksArr.map(stock => {
              let currentVal = stock.latestPrice * stock.shares
              let diff = 'gray'
              if (stock.open < stock.latestPrice) diff = 'green'
              if (stock.open > stock.latestPrice) diff = 'red'
              return (
                <StockListingItem
                  key={stock.symbol}
                  diff={diff}
                  currentVal={currentVal}
                  stock={stock}
                />
              )
            })}
          </List>
        ) : (
          <p>You currently do not own any stocks.</p>
        )}
      </React.Fragment>
    )
  }
}
