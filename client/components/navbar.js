import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {Grid, Header, List, Icon} from 'semantic-ui-react'

const Navbar = ({handleClick, isLoggedIn}) => (
  <div className="navbar">
    <Grid>
      <Grid.Column width={8}>
        <Header as="h1">
          <Icon name="chart line" />
          TTP Stock Portfolio App
        </Header>
      </Grid.Column>
      <Grid.Column width={8} textAlign="right">
        <List horizontal>
          {isLoggedIn ? (
            <React.Fragment>
              <List.Item>
                <Link to="/home">Home</Link>
              </List.Item>
              <List.Item>
                <a href="#" onClick={handleClick}>
                  Logout
                </a>
              </List.Item>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <List.Item>
                <Link to="/login">Login</Link>
              </List.Item>
              <List.Item>
                <Link to="/signup">Sign Up</Link>
              </List.Item>
            </React.Fragment>
          )}
        </List>
      </Grid.Column>
    </Grid>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
