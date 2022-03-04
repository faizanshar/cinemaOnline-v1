import React from "react";
import MyFilmCss from "./MyFilm.module.css";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../components/Header/Header";
import MyFilmContent from "../../components/Content/MyFilmContent";

export default function MyFilm() {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className={MyFilmCss.Container}>
      <Header logOut={logOut} />
      <MyFilmContent />
    </div>
  );
}
