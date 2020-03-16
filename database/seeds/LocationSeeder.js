("use strict");

const Factory = use("Factory");
const fs = use("fs");

const User = use("App/Models/User");
const Location = use("App/Models/Location");

const passwordUser = "@123mudar";

class LocationSeeder {
  async run() {
    await User.create({
      id: 1,
      name: "João Gabriel",
      email: "joaogabriel@email.com",
      password: passwordUser
    });

    await User.create({
      id: 2,
      name: "Maria Eduarda",
      email: "mariaeduarda@email.com",
      password: passwordUser
    });

    await Location.create({
      user_id: 1,
      name: "O Pátio Café & Cozinha",
      address: "Av. Rui Barbosa, 141 - Graças, Recife - PE, 52011-040, Brasil",
      latitude: -8.0451741,
      longitude: -34.9020755
    });

    await Location.create({
      user_id: 2,
      name: "Porto Digital",
      address: "Cais do Apolo, 222 - Recife, PE, 50030-230, Brasil",
      latitude: -8.063128,
      longitude: -34.8739265
    });

    await Location.create({
      user_id: 1,
      name: "Praça do Marco Zero",
      address: "Av. Alfredo Lisboa - Recife, PE, 50030-150, Brasil",
      latitude: -8.062885,
      longitude: -34.8713572
    });

    await Location.create({
      user_id: 2,
      name: "Paço Alfândega Shopping",
      address: "R. Alfândega, 35 - Recife, PE, 50030-030, Brasil",
      latitude: -8.0648287,
      longitude: -34.8738834
    });

    await Location.create({
      user_id: 1,
      name: "Restaurante APOLO",
      address: "R. do Apolo, 107 - Recife, PE, 50030-210, Brasil",
      latitude: -8.0616425,
      longitude: -34.8725049
    });

    await Location.create({
      user_id: 2,
      name: "Cais Do Porto",
      address: "Av. Alfredo Lisboa, 2A - Recife, PE, 50030-150, Brasil",
      latitude: -8.0651226,
      longitude: -34.8720359
    });

    await Location.create({
      user_id: 1,
      name: "Mercado de São José - Recife",
      address:
        "Praça Dom Vital, s/n - São José, Recife - PE, 50020-906, Brasil",
      latitude: -8.0682547,
      longitude: -34.8781609
    });

    await Location.create({
      user_id: 2,
      name: "Centro Cultural Cais do Sertão",
      address:
        "Armazen 10, Av. Alfredo Lisboa, s/n - Recife, PE, 50030-150, Brasil",
      latitude: -8.060009,
      longitude: -34.8699268
    });

    await Location.create({
      user_id: 1,
      name: "Sushi Digitall",
      address: "R. da Moeda, 122 - Recife, PE, 50030-040, Brasil",
      latitude: -8.064526,
      longitude: -34.8730318
    });

    await Location.create({
      user_id: 2,
      name: "Casarão das Artes",
      address: "Tv. Tiradentes, 122 - Recife, PE, 50030-380, Brasil",
      latitude: -8.0592139,
      longitude: -34.8714245
    });
  }
}

module.exports = LocationSeeder;
