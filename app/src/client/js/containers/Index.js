import React, {Component} from 'react'
import Navbar from './Navbar'

export default (props) => {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  )
}
