import React from "react";
import HeaderCss from "./Header.module.css";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// icons/images
import logout from "../../public/icons/logOut.png";
import addFilm from "../../public/icons/addfilm.png";

export default function DropdownAdmin(props) {
  const { logOut } = props;
  const navigate = useNavigate();

  const goToAdd = () => {
    navigate("/add-film");
  };

  return (
    <Dropdown className={HeaderCss.ContainerAvatar}>
      <Dropdown.Toggle variant="link" bsPrefix="p-0">
        <div className={HeaderCss.ContentAvatar}></div>
      </Dropdown.Toggle>
      <Dropdown.Menu
        style={{ backgroundColor: "rgba(13, 13, 13, 1)", padding: "10px" }}
      >
        <Dropdown.Item className={HeaderCss.DropdownItem} onClick={goToAdd}>
          <img src={addFilm} />
          Add Film
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
