import { useState, useEffect, useContext } from "react";
import HeaderCss from "./Header.module.css";
import { API } from "../../config/api";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

// icons/images
import logo from "../../public/icons/logoCinema.png";

// components
import ModalLogin from "../Modal/ModalLogin";
import ModalRegister from "../Modal/ModalRegister";
import DropdownAdmin from "./DropdownAdmin";
import DropdownUser from "./DropdownUser";

export default function Header(props) {
  const { logOut } = props;
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [profile, setProfile] = useState();
  const [state, dispatch] = useContext(userContext);
  const navigate = useNavigate();

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegister(false);
  };

  const handleShowRegister = () => {
    setShowRegister(true);
    setShowLogin(false);
  };

  const handleCloseLogin = () => setShowLogin(false);
  const handleCloseRegister = () => setShowRegister(false);

  const getUser = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.get("/profile", config);
      // console.log('ini Header');
      // console.log(response.data.data.profile);
      setProfile(response.data.data.profile);
      let payload = response.data.data.profile;
      payload.token = localStorage.token;
      dispatch({
        type: "LOGIN_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const goHome = () => {
    navigate("/");
  };

  useEffect(() => {
    getUser();
    // console.log("ini useContext");
  }, [localStorage.token]);

  return (
    <div className={HeaderCss.Container}>
      <img src={logo} onClick={goHome} className={HeaderCss.IconLogo} />

      {localStorage.token ? (
        profile?.status == "user" ? (
          <DropdownUser profile={profile} logOut={logOut} />
        ) : (
          <DropdownAdmin logOut={logOut} />
        )
      ) : (
        <BeforeLogin
          handleShowLogin={handleShowLogin}
          handleShowRegister={handleShowRegister}
        />
      )}

      <ModalLogin
        show={showLogin}
        handleCloseLogin={handleCloseLogin}
        handleShowRegister={handleShowRegister}
      />
      <ModalRegister
        show={showRegister}
        handleCloseRegister={handleCloseRegister}
        handleShowLogin={handleShowLogin}
      />
    </div>
  );
}

const BeforeLogin = (props) => {
  const { handleShowLogin, handleShowRegister } = props;
  return (
    <div className={HeaderCss.GroupButton}>
      <button className={HeaderCss.ButtonLogin} onClick={handleShowLogin}>
        Login
      </button>
      <button className={HeaderCss.ButtonRegister} onClick={handleShowRegister}>
        Register
      </button>
    </div>
  );
};
