const {
  userCreator,
  getAUser,
  getUsers,
  deleteUser,
  editUser,
  enviarMail,
  getUserByEmail,
} = require("../controllers/userControllers");
const { User } = require("../db");

module.exports = {
  postUserHandler: async (req, res, next) => {
    const { name, password, birthdate, username, email, image } = req.body;
    console.log(req.body);
    let findEmail = await User.findAll({ where: { email: email } });
    try {
      //tengo pendiente aún hacer el envío de validación email
      if (!name || !email ) {
        return res
          .status(412)
          .send("Parameters name and email cant be null");
      } else if (findEmail.length) {
        return res.status(409).send("User already exist");
      } else {
        const user = await userCreator(
          name,
          password,
          birthdate,
          username,
          email,
          image
        );
      }
      // enviarMail(email, name).catch((e) => console.log(e));
      res.status(200).send(`Usuario creado exitosamente`);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  getUsersHandler: async (req, res) => {
    try {
      const { email } = req.query;
      // const allUsers = await getUsers();
      const results = email ? await getUserByEmail(email) : await getUsers();
      res.status(200).send(results);
    } catch (error) {
      res.status(400).send("User no encontrado");
    }
  },
  getAUserHandler: async (req, res, next) => {
    try {
      const { id } = req.params;
      const userInfo = await getAUser(id);
      res.send(userInfo);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteUserHandler: async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log("Eliminando el id " + id);
      await deleteUser(id);
      res.send("Successfully removed");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  setUserHandler: async (req, res, next) => {
    const update = req.body;
    const {name, email} = req.body;
    console.log(update);
    const { id } = req.params;
    console.log(update, id);
    try {
      await editUser(update, id);
      enviarMail(email, name).catch((e) => console.log(e));
      res.send("Successfully edited");
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
