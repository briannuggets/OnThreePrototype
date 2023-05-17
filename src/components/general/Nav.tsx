// import { ReactComponent as Logo } from "../../assets/svg/logo.svg";

const Nav = () => {
  return (
    <nav>
      <img src="logo.svg" alt="On Three Logo" id="nav-logo" />
      <button id="menu-button">
        <div className="hamburger top" />
        <div className="hamburger mid" />
        <div className="hamburger bot" />
      </button>
    </nav>
  );
};

export default Nav;
