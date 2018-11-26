import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List} from 'semantic-ui-react'

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

class StockListing extends Component {
  render() {
    const {trades} = this.props
    const stocksArr = consolidateTrades(trades)
    return (
      <List divided>
        {stocksArr.map(stock => {
          return (
            <List.Item key="stock.symbol">
              {stock.symbol} - {stock.shares}
            </List.Item>
          )
        })}
      </List>
    )
  }
}

const mapState = state => ({
  trades: state.user.trades
})

export default connect(mapState)(StockListing)
