import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import ContentCss from "./Content.module.css";
import { API } from "../../config/api";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

export default function MyFilmContent() {
  const [cart, setCart] = useState();
  const patch = "http://localhost:5000/uploads/";
  const navigate = useNavigate();

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
    getData();
  }, [localStorage.token]);

  const goToDetailFilm = (id) => {
    navigate(`/${id}`);
  };

  return (
    <Container className={ContentCss.ContainerCart}>
      <h5 className={ContentCss.h5Title}>List Film</h5>
      <Row>
        {cart?.map((item, index) => {
          return (
            <Col xs={2} key={index} onClick={() => goToDetailFilm(item.filmId)}>
              <div className={ContentCss.ButtonContent}>
                <img src={patch + item.film.thumbnail} />
              </div>
            </Col>
          );
        })}
      </Row>
      <div style={{ width: "100%", height: "40px" }}></div>
    </Container>
  );
}
