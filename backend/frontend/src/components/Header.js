import React from 'react';
import { Button } from './Button';
import logo from '../images/logo.svg';
function Header({
  loggedIn,
  buttonState,
  userEmail,
  handleLogout,
  pushToLogin,
  pushToRegister,
}) {
  let button;

  if (buttonState === 'register') {
    button = (
      <Button onClick={pushToRegister} buttonText={'Зарегистрироваться'} />
    );
  } else {
    button = <Button onClick={pushToLogin} buttonText={'Войти'} />;
  }

  return (
    <header className="header section section_standard">
      <img src={logo} alt="Логотип Место" className="logo" />
      {loggedIn ? (
        <div className="header__container">
          <p className="header__user-email">{userEmail}</p>{' '}
          <Button onClick={handleLogout} buttonText={'Выйти'} />{' '}
        </div>
      ) : (
        button
      )}
    </header>
  );
}

export default Header;
