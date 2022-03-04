const { user } = require("../../models");

// import package
const joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const schema = joi.object({
    email: joi.string().min(3).email().required(),
    password: joi.string().min(6).required(),
    fullName: joi.string().min(3).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const data = await user.create({
      email: req.body.email,
      password: hashedPassword,
      fullName: req.body.fullName,
      status: "user"
    });

    const dataToken = { id: req.body.id };
    const token = jwt.sign(dataToken, process.env.SECRET_KEY);

    res.status(200).send({
      status: "success",
      data: {
        user: {
          email: data.email,
          fullName: data.fullName,
          token,
        },
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

exports.login = async (req, res) => {
  const schema = joi.object({
    email: joi.string().email().min(3).required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.send({
      error: {
        message: error.details[0].message,
      },
    });
  }

  try {
    const userExist = await user.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!userExist) {
      return res.send({
        error: {
          message: "user not found",
        },
      });
    }

    const isValid = await bcrypt.compare(req.body.password, userExist.password);

    if (!isValid) {
      return res.send({
        status: "failed",
        error: {
          message: "password not match",
        },
      });
    }

    const dataUser = { id: userExist.id };
    const token = jwt.sign(dataUser, process.env.SECRET_KEY);

    res.status(200).send({
      status: "success",
      data: {
        user: {
          email: userExist.email,
          fullName: userExist.fullName,
          token,
        },
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
