import React from "react";

const Nav = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <nav ref={ref}>
      <a href="./">
        <img src="logo.svg" alt="On Three Logo" id="nav-logo" />
      </a>
      <button id="menu-button">
        <div className="hamburger top" />
        <div className="hamburger mid" />
        <div className="hamburger bot" />
      </button>
    </nav>
  );
});

export default Nav;
