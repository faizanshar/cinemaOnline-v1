import { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import HeaderCss from "./Header.module.css";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";

// icons/images
import film from "../../public/icons/film.png";
import user from "../../public/icons/user.png";
import logout from "../../public/icons/logOut.png";
import avatar from "../../public/images/avatar.png";

export default function DropdownUser(props) {
  const { logOut, profile } = props;
  const navigate = useNavigate();
  const [profileUser, setProfileUser] = useState();

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToMyFilm = () => {
    navigate("/my-film");
  };

  const getProfile = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.get("/profile", config);
      setProfileUser(response.data.data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [localStorage.token]);

  return (
    <Dropdown className={HeaderCss.ContainerAvatar}>
      <Dropdown.Toggle variant="link" bsPrefix="p-0">
        <div className={HeaderCss.ContentAvatar}>
          {profileUser?.avatar ? (
            <img src={profileUser?.avatar} />
          ) : (
            <img src={avatar} />
          )}
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu
        style={{ backgroundColor: "rgba(13, 13, 13, 1)", padding: "10px" }}
      >
        <Dropdown.Item className={HeaderCss.DropdownItem} onClick={goToProfile}>
          <img src={user} />
          Profile
        </Dropdown.Item>
        <Dropdown.Item className={HeaderCss.DropdownItem} onClick={goToMyFilm}>
          <img src={film} />
          My List Film
        </Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item className={HeaderCss.DropdownItem} onClick={logOut}>
          <img src={logout} />
          Logout
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
