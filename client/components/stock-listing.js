import React, {Component} from 'react'
import {List, Header} from 'semantic-ui-react'
import DollarComp from './dollar-comp'

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
                <List.Item key={stock.symbol}>
                  <span className={diff}>{stock.symbol}</span> - {stock.shares},{' '}
                  <DollarComp money={currentVal} />
                </List.Item>
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
