import React from "react";
import plane from "../../assets/plane.png";
import style from "./header.module.scss"

const Header: React.FC = () => {
	return (
    <header className={style.header}>
      <div className={style.header__logo}>
        <img src={plane} alt="plane" />
      </div>
      <h1 className={style.header__title}>Поиск авиабилетов</h1>
    </header>
  );
}

export default Header;