import { useState, useEffect } from "react";
import ProfileCss from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { API } from "../../config/api";
import convertRupiah from "rupiah-format";

// components
import Header from "../../components/Header/Header";

// icons/images
import avatar from "../../public/images/avatar.png";

export default function Profile() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState();
  const [cart, setCart] = useState();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const goToEdit = () => {
    navigate("/profile/edit-profile", { state: profile });
  };

  const getProfile = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.get("/profile", config);
      setProfile(response.data.data.profile);
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.get("/my-film", config);
      console.log(response.data.data);
      setCart(response.data.data.myFilms);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
    getData();
  }, [localStorage.token]);

  return (
    <div className={ProfileCss.Container}>
      <Header logOut={logOut} />
      <Container className="mt-4">
        <Row>
          <ProfileComp goToEdit={goToEdit} profile={profile} />
          <HistoryTransaction cart={cart} />
        </Row>
      </Container>
    </div>
  );
}

const ProfileComp = (props) => {
  const { profile, goToEdit } = props;
  return (
    <Col xs={6}>
      <h3>My Profile</h3>
      <div className={ProfileCss.ContentProfile}>
        <div>
          {profile?.avatar ? <img src={profile?.avatar} /> : <img src={avatar} />}

          <button onClick={goToEdit}>Edit Profile</button>
        </div>
        <div className={ProfileCss.ContentBio}>
          <div>
            <h6>Full Name</h6>
            <p>{profile?.fullName}</p>
          </div>
          <div>
            <h6>Email</h6>
            <p>{profile?.email}</p>
          </div>
          <div>
            <h6>Phone</h6>
            {profile?.phone == null ? <p>-</p> : <p>{profile?.phone}</p>}
          </div>
        </div>
      </div>
    </Col>
  );
};

const HistoryTransaction = (props) => {
  const { cart } = props;
  return (
    <Col className={ProfileCss.GroupRight} xs={6}>
      <h3>History Transaction</h3>
      {cart?.map((item, index) => {
        return (
          <div className={ProfileCss.ContentHistory}>
            <div>
              <h6>{item.film.title}</h6>
              <p className={ProfileCss.TextTime}>{item.orderDate}</p>
              <p className={ProfileCss.TextPrice}>
                Total: {convertRupiah.convert(item.film.price)}
              </p>
            </div>
            <div className={ProfileCss.ContentStatus}>
              <p>Finished</p>
            </div>
          </div>
        );
      })}

      <div style={{ height: "30px" }}></div>
    </Col>
  );
};
