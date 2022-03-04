import { useState, useEffect, useContext } from "react";
import HomeCss from "./Home.module.css";
import { API } from "../../config/api";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../components/Header/Header";
import MainContent from "../../components/Content/MainContent";
import CartContent from "../../components/Content/CartContent";
import AdminContent from "../../components/Content/AdminContent";

export default function Home() {
  const [profile, setProfile] = useState();
  const [state, dispatch] = useContext(userContext);
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.get("/profile", config);
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

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getUser();
    // console.log("ini token");
    // console.log(localStorage.token);
  }, [localStorage.token]);

  return (
    <div className={HomeCss.Container}>
      <Header logOut={logOut} />
      {localStorage.token ? (
        profile?.status == "user" ? (
          <div>
            <MainContent />
            <CartContent />
          </div>
        ) : (
          <AdminContent />
        )
      ) : (
        <div>
          <MainContent />
          <CartContent />
        </div>
      )}
    </div>
  );
}
