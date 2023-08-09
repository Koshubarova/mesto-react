import logo from '../images/logo_Mesto.svg';

function Header() {

  return (
    <header className="header">
      <img
        src={logo}
        alt="Лого Mesto"
        className="header__logo"
      />
    </header>
  )
}

export default Header;