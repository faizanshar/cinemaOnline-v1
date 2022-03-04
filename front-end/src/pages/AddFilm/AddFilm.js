import { useEffect, useState } from "react";
import AddCss from "./Add.module.css";
import { useNavigate } from "react-router-dom";
import { Container, Form, Row } from "react-bootstrap";
import { API } from "../../config/api";

// components
import Header from "../../components/Header/Header";

// icons/images
import pin from "../../public/icons/pin.png";

export default function AddFilm() {
  const navigate = useNavigate();
  const [categorys, setCategorys] = useState();
  const [thumbnailpre, setThumbnailpre] = useState();
  const [posterpre, setPosterpre] = useState();
  const [filmpre, setFilmre] = useState();
  const [form, setForm] = useState({
    title: "",
    categoryId: "",
    price: "",
    filmUrl: "",
    description: "",
    thumbnail: "",
    poster: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });

    if (e.target.type === "file" && e.target.name === "thumbnail") {
      let url = URL.createObjectURL(e.target.files[0]);
      setThumbnailpre(url);
    } else if (e.target.type === "file" && e.target.name === "poster") {
      let url = URL.createObjectURL(e.target.files[0]);
      setPosterpre(url);
    } else if (e.target.type === "file" && e.target.name === "filmUrl") {
      let url = URL.createObjectURL(e.target.files[0]);
      console.log(e.target.files[0]);
      setFilmre(url);
    }

    console.log(e.target.value);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.token}`,
        },
      };

      const formData = new FormData();
      if (form.thumbnail) {
        formData.set("thumbnail", form?.thumbnail[0], form?.thumbnail[0]?.name);
      }
      if (form.filmUrl) {
        formData.set("filmUrl", form?.filmUrl[0], form?.filmUrl[0]?.name);
      }
      if (form.poster) {
        formData.set("poster", form?.poster[0], form?.poster[0]?.name);
      }
      formData.set("title", form.title);
      formData.set("categoryId", form.categoryId);
      formData.set("price", parseInt(form.price));
      formData.set("description", form.description);

      const response = await API.post("/film", formData, config);
      console.log(response.data);
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const getCategorys = async () => {
    try {
      const response = await API.get("/categorys");
      console.log(response.data.data);
      setCategorys(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCategorys();
    console.log(thumbnailpre);
  }, [localStorage.token]);

  return (
    <div className={AddCss.Container}>
      <Header logOut={logOut} />
      <FormAdd
        categorys={categorys}
        form={form}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        thumbnailpre={thumbnailpre}
        posterpre={posterpre}
        filmpre={filmpre}
      />
    </div>
  );
}

const FormAdd = (props) => {
  const {
    categorys,
    form,
    handleChange,
    thumbnailpre,
    posterpre,
    filmpre,
    handleSubmit,
  } = props;
  return (
    <Container>
      <h3 className="mt-3">Add Film</h3>
      <Form onSubmit={handleSubmit}>
        {thumbnailpre ? (
          <div className={AddCss.GroupThumbnail}>
            <img src={thumbnailpre} className={AddCss.thumbnailpre} />
          </div>
        ) : (
          <div></div>
        )}

        <div className={AddCss.Content1}>
          <Form.Control
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className={AddCss.input}
          />
          <div style={{ width: "20px" }}></div>
          <div>
            <input
              type="file"
              name="thumbnail"
              onChange={handleChange}
              id="imageInput"
              hidden
            />
            <label className={AddCss.label1} htmlFor="imageInput">
              Attach Thumbnail
              <img src={pin} />
            </label>
          </div>
        </div>

        <select
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
        >
          {categorys?.map((item, index) => {
            return <option value={item.id}>{item.name}</option>;
          })}
        </select>
        <Form.Control
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className={AddCss.input}
        />
        {form.filmUrl ? (
          <label htmlFor="videoFile" className={AddCss.label2}>
            {filmpre}
          </label>
        ) : (
          <label htmlFor="videoFile" className={AddCss.label2}>
            Link Film
          </label>
        )}

        <input
          name="filmUrl"
          onChange={handleChange}
          type="file"
          id="videoFile"
          hidden
        />
        <label htmlFor="posterFile" className={AddCss.label2}>
          Attach Poster
          <img src={pin} />
        </label>
        <input
          name="poster"
          onChange={handleChange}
          type="file"
          id="posterFile"
          hidden
        />
        {posterpre ? (
          <img src={posterpre} className={AddCss.posterpre} />
        ) : (
          <div></div>
        )}

        <Form.Control
          as="textarea"
          name="description"
          onChange={handleChange}
          value={form.description}
          className={AddCss.input}
          placeholder="Description"
          rows={3}
        />
        <div className={AddCss.buttonGroup}>
          <button type="submit">Add Film</button>
        </div>
      </Form>
    </Container>
  );
};
