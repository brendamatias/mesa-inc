"use strict";

const validateStore = use("App/Validators/UserStore");
const validateUpdate = use("App/Validators/UserUpdate");

const { validate } = use("Validator");

const User = use("App/Models/User");
const Hash = use("Hash");

class UserController {
  async store({ request, response }) {
    const data = request.only(["name", "email", "password"]);
    const err = await validateStore(data);

    if (err) {
      return response.status(400).json(err);
    }

    const user = await User.create(data);
    return user;
  }

  async update({ request, response, auth }) {
    const user = await User.findOrFail(auth.user.id);

    const data = request.only([
      "name",
      "email",
      "oldPassword",
      "password",
      "confirmPassword"
    ]);

    const err = await validateUpdate(data);

    if (err) {
      return response.status(400).json(err);
    }

    //VERIFICAR!!!!
    // if (data.email && data.email !== user.email) {
    //   console.log(data.email);
    //   console.log(user.email);
    //   const rules = {
    //     email: "unique:users"
    //   };

    //   const validation = await validate(data.email, rules);

    //   if (validation) {
    //     return response.status(400).json({
    //       error: { message: "E-mail já cadastrado." }
    //     });
    //   }
    // }

    if (data.oldPassword) {
      const checkPassword = await Hash.verify(data.oldPassword, user.password);

      if (!checkPassword) {
        console.log("oi");
        return response.status(400).json({
          error: {
            message: "Ops, senha antiga inválida."
          }
        });
      }
      if (data.password != data.confirmPassword) {
        return response.status(400).json({
          error: {
            message: "Ops, a confirmação de senha não corresponde à senha."
          }
        });
      }
    }

    const userUpdate = {
      name: data.name,
      email: data.email,
      password: data.password
    };

    user.merge(userUpdate);

    await user.save();

    return user;
  }
}

module.exports = UserController;
