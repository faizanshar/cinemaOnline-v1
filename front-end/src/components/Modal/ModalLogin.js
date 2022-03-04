import { useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ModalCss from "./Modal.module.css";
import { API } from "../../config/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { userContext } from "../../context/userContext";

toast.configure();
export default function ModalLogin(props) {
  const { show, handleCloseLogin, handleShowRegister } = props;
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [state, dispatch] = useContext(userContext);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(form);
      const response = await API.post("/login", body, config);
      // console.log(response.data.data.user.token);
      if (response.data.status == "success") {
        toast.success("success!");
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data.user,
        });
        handleCloseLogin();
        setForm({
          email: "",
          password: "",
        });
      } else {
        toast.error(response.data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal centered show={show} onHide={handleCloseLogin}>
      <Modal.Header className={ModalCss.ModalHeader}>
        <Modal.Title style={{ color: "rgba(205, 46, 113, 1)" }}>
          Login
        </Modal.Title>
      </Modal.Header>

      <FormLogin
        form={form}
        handleShowRegister={handleShowRegister}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Modal>
  );
}

function FormLogin(props) {
  const { handleShowRegister, form, handleChange, handleSubmit } = props;
  return (
    <Modal.Body className={ModalCss.BodyModal}>
      <Form onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          onChange={handleChange}
          value={form.email}
          name="email"
          className={ModalCss.input}
          placeholder={"Email"}
        />
        <Form.Control
          type="text"
          onChange={handleChange}
          value={form.password}
          name="password"
          className={ModalCss.input}
          placeholder={"Password"}
        />
        <Button type="submit">Login</Button>
        <div>
          Don't have an account ? Klik <a onClick={handleShowRegister}>Here</a>
        </div>
      </Form>
    </Modal.Body>
  );
}
