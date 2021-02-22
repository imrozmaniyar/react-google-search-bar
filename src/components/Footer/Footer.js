import React, { useContext } from 'react';
import StateContext from '../context/StateContext';

function Footer() {
  const appState = useContext(StateContext);
  return (
    <div className={'footer' + (appState.isSearchPage ? ' search-list-footer' : '')}>
      <div id="footerlocation">
        <p>Somewhere, Moon </p>
        <p> - From your phone (Location History) - Use precise location - Learn more</p>
      </div>

      <ul id="footermenu">
        <li>Help</li>
        <li>Send feedback</li>
        <li>Privacy</li>
        <li>Terms</li>
      </ul>
    </div>
  );
}

export default Footer;
