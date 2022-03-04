import { Modal, Button, Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

export default function ModalWarn(props) {
  const { handleCloseWarn, show } = props;
  return (
    <Modal centered show={show} onHide={handleCloseWarn}>
      <Modal.Body
        style={{
          color: "rgba(70, 159, 116, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        please buy this film if you want to watch
      </Modal.Body>
    </Modal>
  );
}
