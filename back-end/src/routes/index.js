const express = require("express");
const router = express.Router();

// controllers
const { register, login } = require("../controllers/auth");
const { addCategory, getCategorys } = require("../controllers/category");
const { addFilm, getFilms, getFilmById } = require("../controllers/film");
const {
  myProfile,
  updateUser,
  users,
  updateStatus,
} = require("../controllers/user");
const {
  addTransaction,
  myFilm,
  getAllTransaction,
  updateApprove,
  updateCancel,
  checkData,
} = require("../controllers/transaction");

// middlewares
const { auth } = require("../middlewares/auth");
const { uploadMultiple } = require("../middlewares/uploadFile");
const { uploadImage } = require("../middlewares/uploadImage");

// auth
router.post("/register", register);
router.post("/login", login);

// category
router.post("/category", addCategory);
router.get("/categorys", getCategorys);

// film
router.post("/film", auth, uploadMultiple, addFilm);
router.get("/film", getFilms);
router.get("/film/:id", getFilmById);

// user
router.get("/profile", auth, myProfile);
router.get("/users", users);
router.patch("/profile/:id", uploadImage("avatar"), updateUser);
router.patch("/status", auth, updateStatus);

// transaction
router.post(
  "/transaction/:id",
  auth,
  uploadImage("transferProof"),
  addTransaction
);
router.get("/my-film", auth, myFilm);
router.get("/transactions", getAllTransaction);
router.get("/check-data/:id", auth, checkData);
router.patch("/approve/:id", updateApprove);
router.patch("/cancel/:id", updateCancel);

module.exports = router;
