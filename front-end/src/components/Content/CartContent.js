import { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import ContentCss from "./Content.module.css";
import { API } from "../../config/api";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";

// icons/images
import sapidermen from "../../public/images/sapidermen.png";
import kong from "../../public/images/kong.png";
import lord from "../../public/images/lord.png";
import meg from "../../public/images/meg.png";
import tom from "../../public/images/tom.png";
import troll from "../../public/images/troll.png";

export default function CartContent() {
  const [cart, setCart] = useState([]);
  const patch = "http://localhost:5000/uploads/";
  const navigate = useNavigate();

  const getData = async () => {
    try {
      const response = await API.get("/film");
      setCart(response.data.data.films);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const goToDetailFilm = (id) => {
    navigate(`/${id}`);
  };

  return (
    <Container className={ContentCss.ContainerCart}>
      <h5 className={ContentCss.h5Title}>List Film</h5>
      <Row>
        {cart.map((item, index) => {
          return (
            <Col xs={2} key={index} onClick={() => goToDetailFilm(item.id)}>
              <div className={ContentCss.ButtonContent}>
                <img src={patch + item.thumbnail} />
              </div>
            </Col>
          );
        })}
      </Row>
      <div style={{ width: "100%", height: "40px" }}></div>
    </Container>
  );
}

