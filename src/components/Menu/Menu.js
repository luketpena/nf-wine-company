import React, {Component} from 'react';
import './Menu.css';

class Menu extends Component {
  render () {
    return (
      <header>
        <nav>
          <ul>
            <li>NF</li>
            <li>About</li>
            <li>Suppliers</li>
            <li>Producer</li>
            <li>Events</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
    )
  }
}

export default Menu;