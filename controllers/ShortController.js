const { Short, Redirect } = require("../models/Short");
const { validateShort } = require("../utils/shortValidation");
require("dotenv").config();

exports.shorten = async (req, res) => {
  console.log(validateShort(req.body));
  const { isValid, errors } = validateShort(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  await Short.create(req.body)
    .then((short) => {
      res.status(201).json(short);
    })
    .catch((err) => res.status(422).json(err));
};

exports.redirect = async (req, res) => {
  await Short.findOne({ where: { shortURL: req.params.short } })
    .then(async (short) => {
      if (!short) {
        return res.status(404).json({ errors: ["Invalid ShortURL"] });
      }
      await Redirect.create({ shortId: short.id }).catch((err) =>
        res.status(400).json(err)
      );

      res.status(200).json({ redirect: short.fullURL });
    })
    .catch((err) => res.json(400).json(err));
};

exports.shorts = async (req, res) => {
  await Short.findAll({
    include: [{ model: Redirect }],
  })
    .then(async (shorts) => {
      if (!shorts) {
        return res.status(404).json({ errors: ["You have no shorten urls"] });
      }
      res.status(200).json({ shorts });
    })
    .catch((err) => res.status(400).json(err));
};

exports.deleteShort = async (req, res) => {
  await Short.findByPk(req.query.id)
    .then(async (short) => {
      if (!short) {
        return res
          .status(400)
          .json({ errors: [{ message: "Shorten link id is not valid" }] });
      }
      await short
        .destroy()
        .then(() => {
          res.status(200).json({ message: "OK!" });
        })
        .catch((err) => res.status(400).json(err));
    })
    .catch((err) => res.status(400).json(err));
};
