import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import ContentCss from "./Content.module.css";
import { API } from "../../config/api";
import convertRupiah from "rupiah-format";
import { useNavigate } from "react-router-dom";

// icons/images
import DeadPool from "../../public/images/deadpool.png";
import tomjery from "../../public/images/tomjery.png";

export default function MainContent() {
  const patch = "http://localhost:5000/uploads/";
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  const getData = async () => {
    try {
      const response = await API.get("/film");
      // console.log("ini respon main");
      // console.log(response.data.data.films);
      setCart(response.data.data.films);
    } catch (error) {
      console.log(error);
    }
  };

  const goToDetailFilm = (id) => {
    navigate(`/${id}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Container
      className={ContentCss.ContainerMain}
      // style={{ backgroundImage: url(tomjery) }}
    >
        <div
          className={ContentCss.ContentMain}
          style={{
            backgroundImage: `url(${patch + cart[0]?.poster})`,
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
            backgroundSize: "cover",
            cursor: "pointer",
          }}
          onClick={() => goToDetailFilm(cart[0].id)}
        >
          <div className={ContentCss.GroupTextMain}>
            <h1 className={ContentCss.h1Main}>{cart[0]?.title}</h1>
            <h4 className={ContentCss.h4CategoryMain}>
              {cart[0]?.category.name}
            </h4>
            <h4 className={ContentCss.h4PriceMain}>
              {convertRupiah.convert(cart[0]?.price)}
            </h4>
            <h6 className={ContentCss.h6DescMain}>{cart[0]?.description}</h6>
            <button className={ContentCss.ButtonMain}>Buy Now</button>
          </div>
        </div>
    </Container>
  );
}
