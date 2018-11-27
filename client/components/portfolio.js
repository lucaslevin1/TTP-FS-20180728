import React, {Component} from 'react'
import {connect} from 'react-redux'
import StockListing from './stock-listing'
import BuyStock from './buy-stock'
import {Grid, Header} from 'semantic-ui-react'
import {IEXClient} from 'iex-api'
import DollarComp from './dollar-comp'

class Portfolio extends Component {
  constructor() {
    super()
    this.state = {
      stocks: []
    }
  }
  async componentDidMount() {
    const stocks = await this.stocksForDisplay()
    this.setState({stocks})
  }

  async componentDidUpdate(prevProps) {
    if (this.props.trades.length !== prevProps.trades.length) {
      const stocks = await this.stocksForDisplay()
      this.setState({stocks})
    }
  }

  async stocksForDisplay() {
    const {trades} = this.props
    const stocks = this.consolidateTrades(trades)
    const fetch = window.fetch.bind(window)
    const iex = new IEXClient(fetch)
    for (let i = 0; i < stocks.length; i++) {
      let info = await iex.stockQuote(stocks[i].symbol)
      stocks[i].latestPrice = info.latestPrice
      stocks[i].open = info.open
    }
    return stocks
  }

  consolidateTrades = trades => {
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

  calcCurrentValue = stocks => {
    return stocks.reduce((accum, stock) => {
      return accum + stock.latestPrice * stock.shares
    }, 0)
  }

  render() {
    const {stocks} = this.state
    const {trades} = this.props
    const currentValue = this.calcCurrentValue(stocks)
    return (
      <React.Fragment>
        <Header as="h3">
          Portfolio (Current Value: <DollarComp money={currentValue} />)
        </Header>
        <Grid>
          <Grid.Column width={8}>
            <StockListing stocks={this.state.stocks} />
          </Grid.Column>
          <Grid.Column width={8}>
            <BuyStock stocks={trades} />
          </Grid.Column>
        </Grid>
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  trades: state.user.trades
})

export default connect(mapState)(Portfolio)
