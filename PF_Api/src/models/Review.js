const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "review",
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey: true,
            autoIncrement: true,
          },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        },
    },
    {
      paranoid: true,
    }
  )
}