const { category } = require("../../models");

exports.addCategory = async (req, res) => {
  try {
    const data = await category.create({
      name: req.body.name,
    });

    res.status(200).send({
      status: "success",
      data: {
        id: data.id,
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

exports.getCategorys = async (req, res) => {
  try {
    const data = await category.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    res.status(200).send({
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
