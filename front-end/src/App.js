import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import "bootstrap/dist/css//bootstrap.min.css";
import { useEffect } from "react";

// pages
import Home from "./pages/Home/Home";
import DetailFilm from "./pages/DetailFilm/DetailFilm";
import Profile from "./pages/Profile/Profile";
import MyFilm from "./pages/MyFilm/MyFilm";
import AddFilm from "./pages/AddFilm/AddFilm";
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:id" element={<DetailFilm />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/profile/edit-profile" element={<EditProfile />} />
      <Route path="/my-film" element={<MyFilm />} />
      <Route path="/add-film" element={<AddFilm />} />
    </Routes>
  );
}

export default App;
