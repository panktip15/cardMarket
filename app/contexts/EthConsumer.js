import React, {Component} from 'react'

import EthContext from './EthContext'

export default class EthConsumer extends Component {
  render() {
    return <EthContext.Consumer {...this.props} />
  }
}
