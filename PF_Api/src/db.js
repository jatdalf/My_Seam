require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_PORT } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring

const { Product, Service, User, Questprod, Questserv, Cart, Cart_product, Review } = sequelize.models;

// Aca vendrian las relaciones

User.hasMany(Product, { foreignKey: "userid" });
Product.belongsTo(User, { foreignKey: "userid" });
User.hasMany(Service, { foreignKey: "userid" });
Service.belongsTo(User, { foreignKey: "userid" });

Product.hasMany(Questprod, { foreignKey: 'offer_id' });
Questprod.belongsTo(Product, { foreignKey: 'offer_id' });
User.hasMany(Questprod, { foreignKey: 'user_id' });
Questprod.belongsTo(User, { foreignKey: 'user_id' });

Service.hasMany(Questserv, { foreignKey: 'offer_id' });
Questserv.belongsTo(Service, { foreignKey: 'offer_id' });
User.hasMany(Questserv, { foreignKey: 'user_id' });
Questserv.belongsTo(User, { foreignKey: 'user_id' });

User.hasOne(Cart, { foreignKey: 'customer_id' });
Cart.belongsToMany(Product, { through: 'cart_product', foreignKey: 'cartid' });
Product.belongsToMany(Cart, { through: 'cart_product', foreignKey: 'productid' });

Product.hasMany(Review,{foreignKey: 'kind_id'});
Service.hasMany(Review, {foreignKey:'kind_id'});
Review.belongsTo(User, { foreignKey: 'customer_id' });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
