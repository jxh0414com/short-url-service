const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const shortid = require("shortid");

const regex = /([A-Za-z0-9\-\_]+)/;

const Short = sequelize.define("shorts", {
  id: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  fullURL: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: {
        msg: "Please enter a valid url",
      },
    },
  },
  shortURL: {
    type: DataTypes.STRING,
    allowNull: {
      msg: "Your input cannot be used",
    },
    defaultValue: shortid.generate,
    unique: true,
    validate: {
      len: [6, 20],
      isValid(value) {
        if (!value.match(regex)) {
          throw new Error(
            "Custom Shortened URL can only be combination of letters, numbers, dash, and underscore"
          );
        }
      },
    },
  },
});

const Redirect = sequelize.define(
  "redirects",
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    shortId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      foreignKey: true,
      references: {
        model: "shorts",
        key: "id",
      },
    },
  },
  { timestamps: false }
);

const synchronize = async () => {
  await Short.sync()
    .then(() => console.log("shorts model synchronized"))
    .catch((err) => console.log(err));

  await Short.sync()
    .then(() => console.log("redirects model synchronized"))
    .catch((err) => console.log(err));
};
synchronize();

Short.hasMany(Redirect, {
  foreignKey: "shortId",
  onDelete: "CASCADE",
  onUpdate: "NO ACTION",
});

Redirect.belongsTo(Short, { foreignKey: "shortId" });

module.exports = { Short, Redirect };
