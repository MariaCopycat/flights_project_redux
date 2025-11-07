import React from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import style from "./layout.module.scss"

const Layout: React.FC = () => {
  return (
	  <div className={style.container}>
		  <Header />
		  <Main/>
    </div>
  );
}

export default Layout;