const { transaction, film, user } = require("../../models");

exports.addTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await transaction.create({
      userId: req.user.id,
      filmId: id,
      status: "pending",
      accountNumber: req.body.accountNumber,
      transferProof: req.file.filename,
      orderDate: req.body.orderDate,
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

exports.getAllTransaction = async (req, res) => {
  try {
    const data = await transaction.findAll({
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: [
        {
          model: film,
          as: "film",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
        {
          model: user,
          as: "user",
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
        },
      ],
    });

    res.send({
      status: "success",
      data: {
        transaction: data,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({
      status: "failed",
      message: "server error",
    });
  }
};

exports.myFilm = async (req, res) => {
  try {
    const data = await transaction.findAll({
      where: {
        userId: req.user.id,
        status: "approve",
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
      include: {
        model: film,
        as: "film",
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      },
    });

    res.send({
      status: "success",
      data: {
        myFilms: data,
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

exports.updateApprove = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await transaction.update(
      {
        status: "approve",
      },
      {
        where: {
          id: id,
        },
      }
    );

    const newData = await transaction.findOne({
      where: {
        id: id,
      },
    });

    res.send({
      status: "success",
      data: {
        newData,
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

exports.updateCancel = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await transaction.update(
      {
        status: "cancel",
      },
      {
        where: {
          id,
        },
      }
    );

    res.send({
      status: "success",
      data: {
        id,
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

exports.checkData = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await transaction.findOne({
      where: {
        filmId: id,
        userId: req.user.id,
        status: "approve",
      },
    });

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
