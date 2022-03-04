import { Modal, Button, Form } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import ModalCss from "./Modal.module.css";
import convertRupiah from "rupiah-format";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API } from "../../config/api";

// icons/images
import attach from "../../public/icons/attach.png";

toast.configure();
export default function ModalTransaction(props) {
  const { handleCloseTransaction, handleShowSuccess, show, data } = props;
  const [image, setImage] = useState(null);
  const [form, setForm] = useState({
    orderDate: "",
    accountNumber: "",
    transferProof: "",
  });

  const getTime = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    var dayIndex = new Date().getDay();
    const getDayName = (dayIndex) => {
      const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      return days[dayIndex];
    };
    const getMonthName = (monthIndex) => {
      const month = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      return month[monthIndex];
    };
    const dayName = getDayName(dayIndex);
    const monthName = getMonthName(month);
    setForm({ orderDate: dayName + "," + date + " " + monthName + " " + year });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setImage(url);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (localStorage.token == undefined) {
        toast.warn("Please login before pay!");
      } else {
        const config = {
          headers: {
            "Content-type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.token}`,
          },
        };

        const formData = new FormData();

        JSON.stringify(form);
        if (form.transferProof) {
          formData.set(
            "transferProof",
            form?.transferProof[0],
            form?.transferProof[0]?.name
          );
        }
        formData.set("accountNumber", parseInt(form.accountNumber));
        formData.set("orderDate", form.orderDate);

        const response = await API.post(
          `/transaction/${data.id}`,
          formData,
          config
        );
        console.log(response);
        handleShowSuccess({ setForm, setImage });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTime();
  }, [localStorage.token]);

  return (
    <Modal
      centered
      show={show}
      onHide={() => handleCloseTransaction({ setForm, setImage })}
    >
      <Modal.Header className={ModalCss.ModalHeaderTrans}>
        <Modal.Title style={{ display: "flex" }}>
          <h6>Cinema</h6>
          <h6 style={{ color: "rgba(205, 46, 113, 1)" }}>Online</h6>
          <h6> : 28017912</h6>
        </Modal.Title>
      </Modal.Header>

      <FormTransaction
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        image={image}
        data={data}
      />
    </Modal>
  );
}

const FormTransaction = (props) => {
  const { data, form, handleChange, handleSubmit, image } = props;
  return (
    <Modal.Body className={ModalCss.BodyModal}>
      <Form onSubmit={handleSubmit}>
        <h5>{data?.title}</h5>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "10px",
            justifyContent: "flex-start",
          }}
        >
          <h6 className="me-2">Total :</h6>
          <h6 style={{ color: "rgba(205, 46, 113, 1)" }}>
            {convertRupiah.convert(data?.price)}
          </h6>
        </div>
        <Form.Control
          type="text"
          onChange={handleChange}
          value={form.accountNumber}
          name="accountNumber"
          className={ModalCss.input2}
          placeholder={"Input Your Account Number"}
        />
        <label htmlFor="formFile" className={ModalCss.ButtonPickImage}>
          Attach Payment
          <img src={attach} />
        </label>
        <input
          type="file"
          name="transferProof"
          onChange={handleChange}
          id="formFile"
          hidden
        />
        {image ? (
          <img src={image} className={ModalCss.ContentImgSend} />
        ) : (
          <div></div>
        )}
        <Button type="submit">Pay</Button>
      </Form>
    </Modal.Body>
  );
};
