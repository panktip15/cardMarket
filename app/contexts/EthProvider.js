import React, {Component} from 'react'
import Eth from 'ethjs'
import EthContext from './EthContext'
import CardTrader from '../contract/CardTrader.js'

export default class EthProvider extends Component {
  state = {
    loading: true,
    cards: [],
  }

  async componentDidMount() {
    const ethOptions = {interval: 3000}
    if (
      typeof window.web3 !== 'undefined' &&
      typeof window.web3.currentProvider !== 'undefined'
    ) {
      this.eth = new Eth(window.web3.currentProvider, ethOptions)
    }
    window.eth = this.eth
    if (this.eth) {
      this.cardTrader = new CardTrader(this.eth)
      const cards = [] // await this.gravity.getUsers()
      this.setState({cards})
    }
    this.setState({loading: false})
  }

  render() {
    return (
      <EthContext.Provider value={{
        eth: this.eth,
        cardTrader: this.cardTrader,
        cards: this.state.cards
    }}>
    {!this.eth && !this.state.loading
      ? <a href="https://metamask.io/"
      style={{color: 'white'}}
      target="_blank" rel="noopener noreferrer">
      Come back once you have MetaMask!
    </a>
    : this.state.loading
      ? <div>Loading CardTrader...</div>
    : this.props.children}
  </EthContext.Provider>
  )
  }
}

