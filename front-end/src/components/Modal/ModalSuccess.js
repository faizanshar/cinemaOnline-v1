import { Modal, Button, Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";

export default function ModalSuccess(props) {
  const { handleCloseSuccess, show } = props;
  return (
    <Modal centered show={show} onHide={handleCloseSuccess}>
      <Modal.Body
        style={{
          color: "rgba(70, 159, 116, 1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        thank you for buying this film, please wait 1x24 hours because your
        transaction is in process
      </Modal.Body>
    </Modal>
  );
}
