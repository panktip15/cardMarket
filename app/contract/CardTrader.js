import EthContract from 'ethjs-contract'
import EthAbi from 'ethjs-abi'
import contractBuild from './cardTrader.json'

export default class CardTrader {
  constructor(provider) {
    if (!provider) {
      throw new Error('gravity constructor isn\'t getting a provider')
    } else {
      this.provider = provider
      provider.net_version((err, net) => {
      console.log(net)
      this.address = contractBuild[net].address
      this.contractInstance = EthContract(provider)(contractBuild.abi).at(this.address)

      })
    }
  }

  decodeLogs = logs => EthAbi.logDecoder(contractBuild.abi)(logs)

  getCards = () =>
    new Promise((resolve, reject) => {
      this.provider.getLogs({
        fromBlock: 0,
        toBlock: 'latest',
        address: this.address,
        topics: []
      }, (err, logs) => {
        if (err) reject(err)
        resolve(this.decodeLogs(logs)
          .reduce((acc, {description, imageUrl}) => [...acc, {description, imageUrl}], [])
        )
      })
    })
}
