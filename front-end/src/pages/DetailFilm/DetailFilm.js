import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../config/api";
import DetailCss from "./Detail.module.css";
import { useNavigate } from "react-router-dom";

// components
import Header from "../../components/Header/Header";
import ContentDetail from "../../components/Content/ContentDetail";

export default function DetailFilm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState();

  const getDetail = async () => {
    try {
      const response = await API.get(`/film/${id}`);
      console.log(response.data.data.book);
      setData(response.data.data.book);
    } catch (error) {
      console.log(error);
    }
  };

 

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  useEffect(() => {
    getDetail();
  }, [id, localStorage.token]);

  return (
    <div className={DetailCss.Container}>
      <Header logOut={logOut} />
      <ContentDetail data={data} id={id}/>
    </div>
  );
}
