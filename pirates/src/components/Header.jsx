import logo from "../assets/img/anchor.svg";
import "../assets/css/Header.css";

function Header({ title }) {
  return (
    <div className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1>{title}</h1>
    </div>
  );
}

export default Header;
