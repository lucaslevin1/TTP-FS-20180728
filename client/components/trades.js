import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List} from 'semantic-ui-react'

class Trades extends Component {
  render() {
    const {trades} = this.props
    return (
      <React.Fragment>
        {trades.length ? (
          <List>
            {trades
              .sort((trade1, trade2) => {
                return trade2.id - trade1.id
              })
              .map(trade => {
                return (
                  <List.Item key={trade.id}>
                    BUY ({trade.symbol}) - {trade.shares} Shares @ ${
                      trade.price
                    }
                  </List.Item>
                )
              })}
          </List>
        ) : (
          <p>You have not made any transactions to date.</p>
        )}
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  trades: state.user.trades
})

export default connect(mapState)(Trades)
