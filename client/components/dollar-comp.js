import React, {Component} from 'react'
import NumberFormat from 'react-number-format'

class DollarComp extends Component {
  render() {
    return (
      <NumberFormat
        value={this.props.money}
        displayType={'text'}
        thousandSeparator={true}
        decimalScale={2}
        fixedDecimalScale={true}
        prefix={'$'}
      />
    )
  }
}

export default DollarComp
