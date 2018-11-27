import React, {Component} from 'react'
import Portfolio from './portfolio'
import Trades from './trades'
import {Menu} from 'semantic-ui-react'

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
    return (
      <div className="body-padding">
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
      </div>
    )
  }
}

export default UserHome
