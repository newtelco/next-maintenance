import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes,
  faQuestion,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons'

export default class CompleteIcon extends Component {
  render() {
    if (this.props.node.data.done === 1 || this.props.node.data.done === 'true') {
      return (
        <span style={{ display: 'flex', justifyContent: 'center', height: '50px', alignItems: 'center' }}>
          <FontAwesomeIcon style={{ fontSize: '12px' }} width='1.5em' icon={faCheckCircle} />
        </span>
      )
    } else if (this.props.node.data.done === 0 || this.props.node.data.done === 'false') {
      return (
        <span style={{ display: 'flex', justifyContent: 'center', height: '50px', alignItems: 'center' }}>
          <FontAwesomeIcon style={{ fontSize: '12px' }} width='1.5em' icon={faTimes} />
        </span>
      )
    } else {
      return (
        <span style={{ display: 'flex', justifyContent: 'center', height: '50px', alignItems: 'center' }}>
          <FontAwesomeIcon style={{ fontSize: '12px' }} width='1.5em' icon={faQuestion} />
        </span>
      )
    }
  }
};
