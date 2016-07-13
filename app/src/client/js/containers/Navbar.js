import React, {Component} from 'react'
import { Link } from 'react-router'
import { Button, ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import links from './NavbarLinks'

const buttons = links.map(item => (
  <Link to={item.path} key={item.path}>
    <Button bsStyle="info" bsSize="large">{item.name}</Button>
  </Link>
))
const menuItems = links.map(item => (
  <MenuItem>
    {item.name}
  </MenuItem>
))

export default (props) => {
  return (
    <div>
      <ButtonToolbar>
        {buttons}
      </ButtonToolbar>
      <br/>
      <DropdownButton bsStyle="success" title="Dropdown">
        {menuItems}
      </DropdownButton>
    </div>
  )
}
