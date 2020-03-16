"use strict";

const { validate } = use("Validator");

const UserStore = async data => {
  const rules = {
    email: "required|email|unique:users",
    name: "required",
    password: "required|min:6"
  };

  const messages = {
    "email.required": "O campo de e-mail não pode estar vazio.",
    "email.unique": "E-mail já cadastrado.",
    "name.required": "O campo de nome não pode estar vazio.",
    "password.required": "O campo de senha não pode estar vazio.",
    "password.min": "O campo de senha deve ter pelo menos 6 caracteres."
  };

  const validation = await validate(data, rules, messages);

  if (validation) {
    return validation.messages();
  }
};

module.exports = UserStore;
