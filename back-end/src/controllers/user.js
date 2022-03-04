const { user } = require("../../models");

exports.users = async (req, res) => {
  try {
    let data = await user.findAll();

    res.send({
      status: "success",
      data: data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.myProfile = async (req, res) => {
  try {
    let data = await user.findOne({
      where: {
        id: req.user.id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });
    const patch = "http://localhost:5000/uploads/";
    res.status(200).send({
      status: "success",
      data: {
        profile: {
          id: data.id,
          avatar: data.avatar ? patch + data.avatar : null,
          email: data.email,
          fullName: data.fullName,
          phone: data.phone,
          status: data.status,
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

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await user.update(
      {
        avatar: req?.file?.filename,
        fullName: req.body.fullName,
        phone: req.body.phone,
      },
      {
        where: {
          id,
        },
      }
    );
    const newData = await user.findOne({
      where: {
        id,
      },
    });
    const patch = "http://localhost:5000/uploads/";

    res.send({
      status: "success",
      data: {
        user: {
          id: parseInt(id),
          fullName: newData.fullName,
          avatar: patch + newData.avatar,
          phone: newData.phone,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "error",
      message: "server error",
    });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const data = await user.update(
      {
        status: "admin",
      },
      {
        where: {
          id: req.user.id,
        },
      }
    );
    res.send({
      status: "success",
      data,
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};
