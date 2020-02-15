"use strict";

const User = use("App/Models/User");

class UserController {
  async store({ request, response }) {
    const data = request.only(["name", "email", "password"]);

    const userExists = await User.query()
      .where("email", data.email)
      .fetch();

    if (userExists) {
      return response.status(400).send({
        error: { message: "Email já cadastrado." }
      });
    }

    const user = await User.create(data);

    return user;
  }

  async update({ request, response, auth }) {
    const user = await User.findOrFail(auth.user.id);
    const data = request.only(["name", "email", "password"]);
    const email = data.email;

    if (email && email !== user.email) {
      const userExists = await User.query()
        .where("email", email)
        .fetch();

      if (userExists) {
        return response.status(400).send({
          error: { message: "Email já cadastrado." }
        });
      }
    }

    user.merge(data);

    await user.save();

    return user;
  }
}

module.exports = UserController;
