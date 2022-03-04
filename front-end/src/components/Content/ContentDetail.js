import { useEffect, useState } from "react";
import ContentCss from "./Content.module.css";
import { Container, Col, Row, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import convertRupiah from "rupiah-format";
import { API } from "../../config/api";

// icons/images
import play from "../../public/icons/play.png";

// components
import ModalWarn from "../Modal/ModalWarn";
import ModalTransaction from "../Modal/ModalTransaction";
import ModalSuccess from "../Modal/ModalSuccess";

toast.configure();
export default function ContentDetail(props) {
  const { data, id } = props;
  const [showWarn, setShowWarn] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [status, setStatus] = useState(false);
  const [checkData, setCheckData] = useState();

  const checkStatus = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${localStorage.token}` },
      };
      const response = await API.get(`/check-data/${id}`, config);
      // console.log(response.data);
      setCheckData(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Play = () => {
    var videoPlayer = document.getElementById("myvideo");
    var button = document.getElementById("button-play");
    console.log(checkData);

    if (checkData?.status == "approve") {
      videoPlayer.play();
      videoPlayer.controls = "true";
      button.setAttribute("style", "display:none");
    } else if (localStorage.token == undefined || status == false) {
      handleShowWarn();
    }
  };

  const handleShowWarn = () => {
    setShowWarn(true);
  };

  const handleShowTransaction = () => {
    setShowTransaction(true);
  };

  const handleShowSuccess = ({ setForm, setImage }) => {
    setShowSuccess(true);
    setShowTransaction(false);
    setForm({
      orderDate: "",
      accountNumber: "",
      transferProof: "",
    });
    setImage(null);
  };

  const handleCloseWarn = () => {
    setShowWarn(false);
  };

  const handleCloseTransaction = ({ setForm, setImage }) => {
    setShowTransaction(false);
    setForm({
      orderDate: "",
      accountNumber: "",
      transferProof: "",
    });
    setImage(null);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
  };

  useEffect(() => {
    checkStatus();
    // console.log(checkData?);
  }, [localStorage.token]);

  return (
    <Container className="mt-3">
      <CartDetail
        Play={Play}
        data={data}
        handleShowTransaction={handleShowTransaction}
        checkData={checkData}
      />
      <ModalWarn show={showWarn} handleCloseWarn={handleCloseWarn} />
      <ModalTransaction
        data={data}
        show={showTransaction}
        handleCloseTransaction={handleCloseTransaction}
        handleShowSuccess={handleShowSuccess}
      />
      <ModalSuccess
        show={showSuccess}
        handleCloseSuccess={handleCloseSuccess}
      />
    </Container>
  );
}

const CartDetail = (props) => {
  const { data, handleShowTransaction, Play, checkData } = props;
  const patch = "http://localhost:5000/uploads/";

  return (
    <Row>
      <Col xs={3} className={ContentCss.ContentThumbnail}>
        <img src={patch + data?.thumbnail} />
      </Col>
      <Col xs={9} className={ContentCss.ContentDetail}>
        <div className={ContentCss.GroupTitle}>
          <div className={ContentCss.Title}>
            <h1>{data?.title}</h1>
          </div>
          {checkData?.status == "approve" ? (
            <div></div>
          ) : (
            <div
              className={ContentCss.ButtonBuy}
              onClick={handleShowTransaction}
            >
              Buy Now
            </div>
          )}
        </div>

        <video
          poster={patch + data?.poster}
          className={ContentCss.ContentVideo}
          id="myvideo"
        >
          <source src={patch + data?.filmUrl} type="video/mp4" />
          <source src={patch + data?.filmUrl} type="video/ogg" />
        </video>

        <button
          className={ContentCss.ButtonPlay}
          id="button-play"
          onClick={Play}
        >
          <img src={play} />
        </button>
        <div className={ContentCss.ContentCategory}>
          <h5>{data?.category.name}</h5>
        </div>
        {checkData?.status == "approve" ? (
          <div></div>
        ) : (
          <div className={ContentCss.ContentRp}>
            <h6>{convertRupiah.convert(data?.price)}</h6>
          </div>
        )}

        <div className={ContentCss.ContentDesc}>
          <p>{data?.description}</p>
        </div>
      </Col>
    </Row>
  );
};
