import React from 'react';

function Header() {
  return (
    <header className="header">
      <ul>
        <li>
          <a className="links" href="#user">
            <button className="signbutton" type="button">
              Sign in
            </button>
          </a>
        </li>
        <li>
          <a href="#grid">
            <img
              className="grid"
              src="https://cdn3.iconfinder.com/data/icons/navigation-and-settings/24/Material_icons-01-11-512.png"
              title="Google apps"
              alt="Logo"
            />
          </a>
        </li>
        <li>
          <a href="#images">Images</a>
        </li>
        <li>
          <a href="#gmail">Gmail</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
