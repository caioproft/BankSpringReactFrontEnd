import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="menu-bg">
        <div className="menu">
          <div className="menu-logo">
            <a href="/"> IncubaBank</a>
          </div>
          <nav className="menu-nav">
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
export default Header;
