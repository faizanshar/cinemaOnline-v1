const { film, category } = require("../../models");

// import package
const joi = require("joi");
const cloudinary = require("../utils/cloudinary");

exports.addFilm = async (req, res) => {
  const schema = joi.object({
    title: joi.string().min(3).required(),
    categoryId: joi.number().required(),
    price: joi.number().required(),
    description: joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    // return console.log(req.files.filmUrl[0].path);
    console.log(req.user.id);
    const filmUrl = await cloudinary.uploader.upload(
      req.files.filmUrl[0].path,
      {
        use_filename: true,
        unique_filename: false,
      }
    );
    const thumbnail = await cloudinary.uploader.upload(
      req.files.thumbnail[0].path,
      {
        use_filename: true,
        unique_filename: false,
      }
    );
    const poster = await cloudinary.uploader.upload(req.files.poster[0].path, {
      use_filename: true,
      unique_filename: false,
    });

    const data = await film.create({
      title: req.body.title,
      categoryId: req.body.categoryId,
      price: req.body.price,
      filmUrl: filmUrl.public_id,
      description: req.body.description,
      userId: req.user.id,
      thumbnail: thumbnail.public_id,
      poster: poster.public_id,
    });

    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getFilms = async (req, res) => {
  try {
    let films = await film.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "categoryId"],
      },
      include: {
        model: category,
        as: "category",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        films,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.getFilmById = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await film.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "userId", "categoryId"],
      },
      include: {
        model: category,
        as: "category",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    res.status(200).send({
      status: "success",
      data: {
        book: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};
