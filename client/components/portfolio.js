import React, {Component} from 'react'
import {connect} from 'react-redux'
import StockListing from './stock-listing'
import BuyStock from './buy-stock'
import {Grid, Header} from 'semantic-ui-react'
import {IEXClient} from 'iex-api'

const consolidateTrades = trades => {
  const tradeObj = {}
  const endArr = []
  trades.forEach(trade => {
    let symbol = trade.symbol
    if (!tradeObj[symbol]) {
      tradeObj[symbol] = trade.shares
    } else {
      tradeObj[symbol] = tradeObj[symbol] + trade.shares
    }
  })
  for (let key in tradeObj) {
    if (tradeObj.hasOwnProperty(key)) {
      endArr.push({symbol: key, shares: tradeObj[key]})
    }
  }
  return endArr
}

class Portfolio extends Component {
  constructor() {
    super()
    this.state = {
      stocks: []
    }
  }

  async componentDidMount() {
    const {trades} = this.props
    const stocks = consolidateTrades(trades)
    const fetch = window.fetch.bind(window)
    const iex = new IEXClient(fetch)
    for (let i = 0; i < stocks.length; i++) {
      let info = await iex.stockQuote(stocks[i].symbol)
      stocks[i].latestPrice = info.latestPrice
      stocks[i].open = info.open
    }
    this.setState({stocks})
  }

  render() {
    const {stocks} = this.state
    const {trades} = this.props
    const currentValue =
      Math.round(
        stocks.reduce((accum, stock) => {
          return accum + stock.latestPrice * stock.shares
        }, 0) * 100
      ) / 100
    return (
      <div>
        <Header as="h3">Portfolio (Current Value: ${currentValue})</Header>
        <Grid>
          <Grid.Column width={8}>
            <StockListing stocks={this.state.stocks} />
          </Grid.Column>
          <Grid.Column width={8}>
            <BuyStock stocks={trades} />
          </Grid.Column>
        </Grid>
      </div>
    )
  }
}

const mapState = state => ({
  trades: state.user.trades
})

export default connect(mapState)(Portfolio)