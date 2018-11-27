import React, {Component} from 'react'
import {List, Grid} from 'semantic-ui-react'
import DollarComp from './dollar-comp'

class StockListingItem extends Component {
  render() {
    const {stock, currentVal, diff} = this.props
    return (
      <List.Item>
        <Grid>
          <Grid.Column width={8}>
            <span className={diff}>{stock.symbol}</span> - {stock.shares} Shares
          </Grid.Column>
          <Grid.Column width={8} textAlign="right">
            <DollarComp money={currentVal} />
          </Grid.Column>
        </Grid>
      </List.Item>
    )
  }
}

export default StockListingItem
