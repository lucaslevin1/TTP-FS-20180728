import React, {Component} from 'react'
import {List, Header, Grid} from 'semantic-ui-react'
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
                  <Grid>
                    <Grid.Column width={8}>
                      <span className={diff}>{stock.symbol}</span> -{' '}
                      {stock.shares} Shares
                    </Grid.Column>
                    <Grid.Column width={8} textAlign="right">
                      <DollarComp money={currentVal} />
                    </Grid.Column>
                  </Grid>
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
