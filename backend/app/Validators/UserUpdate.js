"use strict";

const { validate } = use("Validator");

const UserUpdate = async data => {
  const rules = {
    email: "required|email",
    name: "required",
    password: "min:6",
    confirmPassword: "min:6"
  };

  const messages = {
    "email.required": "O campo de e-mail não pode estar vazio.",
    "email.unique": "E-mail já cadastrado.",
    "name.required": "O campo de nome não pode estar vazio.",
    "password.min": "O campo de senha deve ter pelo menos 6 caracteres.",
    "confirmPassword.min": "O campo de senha deve ter pelo menos 6 caracteres."
  };

  const validation = await validate(data, rules, messages);

  if (validation) {
    return validation.messages();
  }
};

module.exports = UserUpdate;
