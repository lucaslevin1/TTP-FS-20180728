import React, {Component} from 'react'
import Portfolio from './portfolio'
import {connect} from 'react-redux'
import Trades from './trades'
import {Menu, Header} from 'semantic-ui-react'

class UserHome extends Component {
  constructor() {
    super()
    this.state = {tab: 'Portfolio'}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = tab => {
    this.setState({tab})
  }

  render() {
    const {tab} = this.state
    const {name} = this.props
    return (
      <React.Fragment>
        <Header as="h2">Welcome {name}</Header>
        <Menu pointing secondary>
          <Menu.Item
            name="portfolio"
            active={tab === 'Portfolio'}
            onClick={() => this.handleClick('Portfolio')}
          />
          <Menu.Item
            name="transactions"
            active={tab === 'Transactions'}
            onClick={() => this.handleClick('Transactions')}
          />
        </Menu>
        {tab === 'Portfolio' ? <Portfolio /> : <Trades />}
      </React.Fragment>
    )
  }
}

const mapState = state => ({
  name: state.user.name
})

export default connect(mapState)(UserHome)
