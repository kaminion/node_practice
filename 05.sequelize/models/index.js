'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/**
 * 파일 시스템에 대해 비동기/동기가 존재함
 */
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  }); // 여기서 db.model이름으로 치환

  // 여기서  자동으로 현재 models에 있는 파일들 include
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// 관계 설정
// 1대 다 관계, 서로 설정해주어야함 
db.Member.hasMany(db.Post);
db.Post.belongsTo(db.Member);

// 다대다 관계 설정
db.Post.belongsToMany(db.Hash, {through: 'post_hash'});
db.Hash.belongsToMany(db.Post, {through: 'post_hash'});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
