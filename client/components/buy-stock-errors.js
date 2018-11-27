import React, {Component} from 'react'
import {connect} from 'react-redux'

class BuyStockErrors extends Component {
  render() {
    const {quantityError, symbolError, overageError} = this.props
    return (
      <React.Fragment>
        {symbolError ? (
          <p className="red">Error: Invalid stock symbol.</p>
        ) : (
          <div />
        )}
        {quantityError ? (
          <p className="red">
            Error: Invalid quantity. The quantity needs to be greater than 0 and
            a whole number.
          </p>
        ) : (
          <div />
        )}
        {overageError ? (
          <p className="red">
            Error: You do not have the funds in your account to purchase this
            stock at this quantity.
          </p>
        ) : (
          <div />
        )}
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  quantityError: state.trades.quantityError,
  symbolError: state.trades.symbolError,
  overageError: state.trades.overageError
})

export default connect(mapState)(BuyStockErrors)
