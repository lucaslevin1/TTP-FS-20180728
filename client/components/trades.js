import React, {Component} from 'react'
import {connect} from 'react-redux'
import {List, Header} from 'semantic-ui-react'
import dateFormat from 'dateformat'

class Trades extends Component {
  render() {
    let {trades} = this.props
    if (!trades) trades = []
    return (
      <React.Fragment>
        <Header as="h3">Trade History</Header>
        {trades.length ? (
          <List>
            {trades
              .sort((trade1, trade2) => {
                return trade2.id - trade1.id
              })
              .map(trade => {
                return (
                  <List.Item key={trade.id}>
                    {dateFormat(trade.createdAt)} - BUY ({trade.symbol}) -{' '}
                    {trade.shares} Shares @ ${trade.price}
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
