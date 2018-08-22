import React, {Component} from 'react'
import injectSheet from 'react-jss'
import {connect} from 'react-redux'
import {styles} from './styles'

class home extends Component {
  componentDidMount() {

  }

  render() {
    const {classes} = this.props
    return (
      <div className={classes.root}>
        test
      </div>
    )
  }
}

const mapStateToProps = () => ({})
const mapDispatchToProps = () => ({})

export const Home = injectSheet(styles)(
  connect(mapStateToProps, mapDispatchToProps)(home)
)
