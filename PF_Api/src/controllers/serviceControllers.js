const { Service, User } = require("../db.js");
const { Op } = require("sequelize");
const servicesJSON = require("../utils/services.json");

module.exports = {
  serviceCreator: async (data) => {
    const { name, description, price, userid } = data;
    // imagen dummy
    const image = [
      "https://www.objetivobienestar.com/uploads/s1/18/19/76/6/la-importancia-y-los-beneficios-de-la-costura.jpeg",
    ];
    // imagen dummy
    if (price <= 0) throw new Error("El precio debe ser mayor a 0");
    return await Service.create({
      name,
      description,
      price,
      image,
      userid,
    });
  },
  getAService: async (id) => {
    const service = await Service.findByPk(id, {
      include: User,
    });
    if (!service) throw new Error(`id ${id} not found`);
    return service;
  },
  getServices: async (name) => {
    if (!name) {
      servicesJSON.forEach(
        async (serv) =>
          await Service.findOrCreate({
            where: {
              name: serv.name,
              description: serv.description,
              price: serv.price,
              image: serv.image,
              userid: serv.userid,
            },
          })
      );
      return await Service.findAll();
    }
    const services = await Service.findAll({
      where: {
        name: {
          [Op.iLike]: "%" + name + "%",
        },
      },
      include: User,
    });
    return services;
  },
  deleteService: async (id) => {
    const service = await Service.destroy({
      where: {
        id: id,
      },
    });
    if (!service) throw new Error(`id ${id} not found`);
    return `id ${id} successfully deleted`;
  },
  updateService: async (id, data) => {
    const { name, description, price } = data;
    const service = await Service.update(
      { name, description, price },
      {
        where: {
          id: id,
        },
      }
    );
    if (!service[0]) throw new Error(`id ${id} not found`);
  },
};
