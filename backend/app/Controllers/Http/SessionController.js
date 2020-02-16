"use strict";

const User = use("App/Models/User");

class SessionController {
  async store({ request, response, auth }) {
    const { email, password } = request.all();

    const user = await User.findBy("email", email);

    if (!user) {
      return response.status(400).send({
        error: { message: "Email não cadastrado." }
      });
    }

    const { id, name } = user;

    const token = await auth.attempt(email, password);

    return {
      user: {
        id,
        name,
        email
      },
      token
    };
  }
}

module.exports = SessionController;
