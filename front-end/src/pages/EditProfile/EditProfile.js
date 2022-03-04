import { useEffect, useState } from "react";
import EditCss from "./Edit.module.css";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Form } from "react-bootstrap";
import { API } from "../../config/api";

// components
import Header from "../../components/Header/Header";

// icons/images
import pin from "../../public/icons/pin.png";

export default function EditProfile() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [form, setForm] = useState({
    avatar: "",
    fullName: "",
    phone: "",
  });
  const [imagePre, setImagePre] = useState();

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
    if (e.target.type === "file") {
      let url = URL.createObjectURL(e.target.files[0]);
      setImagePre(url);
      //   console.log(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };
      const formData = new FormData();
      if (form.avatar) {
        formData.set("avatar", form?.avatar[0], form?.avatar[0]?.name);
      }
      formData.set("fullName", form.fullName);
      formData.set("phone", form.phone);
      const response = await API.patch(
        `/profile/${state.id}`,
        formData,
        config
      );
      console.log(response.data);
      navigate("/profile")
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setForm({
      avatar: state.avatar,
      fullName: state.fullName,
      phone: state.phone,
    });
    setImagePre(state.avatar);
  }, [state]);

  return (
    <div className={EditCss.Container}>
      <Header logOut={logOut} />
      <FormDataInput
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        form={form}
        imagePre={imagePre}
      />
    </div>
  );
}

const FormDataInput = (props) => {
  const { handleChange, form, imagePre, handleSubmit } = props;
  return (
    <Container>
      <h3 className="mt-3">Edit Profile</h3>
      <Form onSubmit={handleSubmit}>
        {imagePre ? <img src={imagePre} /> : <div></div>}
        <label htmlFor="fileImage" className={EditCss.label}>
          Attach Avatar <img src={pin} />
        </label>
        <input
          onChange={handleChange}
          name="avatar"
          type="file"
          hidden
          id="fileImage"
        />
        <Form.Control
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          className={EditCss.input}
          placeholder="FullName"
        />
        <Form.Control
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className={EditCss.input}
          placeholder="Phone"
        />
        <div className={EditCss.groupButton}>
          <button type="submit">Submit</button>
        </div>
      </Form>
    </Container>
  );
};
