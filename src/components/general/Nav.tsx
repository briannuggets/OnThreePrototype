const Nav = () => {
  return (
    <nav>
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
};

export default Nav;
