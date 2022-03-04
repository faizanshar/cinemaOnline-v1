import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { API } from "../../config/api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ModalCss from "./Modal.module.css";

toast.configure();
export default function ModalRegister(props) {
  const { show, handleCloseRegister, handleShowLogin } = props;
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullName: "",
  });

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
      const response = await API.post("/register", body, config);
      console.log(response.data);
      if (response.data.status == "success") {
        toast.success("success!");
        handleCloseRegister();
        setForm({
          email: "",
          password: "",
          fullName: "",
        });
      } else {
        toast.error(response.data.error.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal centered show={show} onHide={handleCloseRegister}>
      <Modal.Header className={ModalCss.ModalHeader}>
        <Modal.Title style={{ color: "rgba(205, 46, 113, 1)" }}>
          Register
        </Modal.Title>
      </Modal.Header>

      <FormRegister
        form={form}
        handleShowLogin={handleShowLogin}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </Modal>
  );
}

function FormRegister(props) {
  const { handleShowLogin, form, handleChange, handleSubmit } = props;
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
        <Form.Control
          type="text"
          onChange={handleChange}
          value={form.fullName}
          name="fullName"
          className={ModalCss.input}
          placeholder={"Full Name"}
        />
        <Button type="submit">Login</Button>
        <div>
          Don't have an account ? Klik <a onClick={handleShowLogin}>Here</a>
        </div>
      </Form>
    </Modal.Body>
  );
}
