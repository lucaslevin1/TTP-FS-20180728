import React, {Component} from 'react'
import StockListing from './stock-listing'
import BuyStock from './buy-stock'
import {Grid, Header} from 'semantic-ui-react'

class Portfolio extends Component {
  render() {
    return (
      <div>
        <Header as="h3">Portfolio</Header>
        <Grid>
          <Grid.Column width={8}>
            <StockListing />
          </Grid.Column>
          <Grid.Column width={8}>
            <BuyStock />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

export default Portfolio
