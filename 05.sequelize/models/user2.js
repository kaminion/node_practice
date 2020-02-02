'use strict';
module.exports = (sequelize, DataTypes) => {
  const User2 = sequelize.define('User2', {
    name: DataTypes.STRING
  }, {});
  User2.associate = function(models) {
    // associations can be defined here
  };
  return User2;
};