import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Portfolio from './portfolio'

export const UserHome = () => {
  return (
    <div className="body-padding">
      <Portfolio />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email,
    trades: state.user.trades
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
