import React from "react";

function Header(props) {
    const {headerTitle, subTitle} = props;
  return (
    <header className='header'>
      <h1 className="header-title">{headerTitle}</h1>
      <h4 className="header-subtitle">{subTitle}</h4>
    </header>
  );
}

export default Header;
