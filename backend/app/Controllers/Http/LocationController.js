"use strict";

const Location = use("App/Models/Location");

class LocationController {
  async index() {
    const locations = await Location.query()
      .with("user")
      .fetch();

    return locations;
  }

  async store({ request, response, auth }) {
    const data = request.only(["name", "address", "latitude", "longitude"]);

    const locationExists = await Location.query()
      .where("latitude", data.latitude)
      .where("longitude", data.longitude)
      .fetch();

    //VERIFICAR
    // if (locationExists) {
    //   return response.status(400).send({
    //     error: { message: "Localidade já cadastrada." }
    //   });
    // }

    const location = await Location.create({
      ...data,
      user_id: auth.user.id
    });

    return location;
  }

  async show({ params }) {
    const location = await Location.findOrFail(params.id);

    await location.load("user");
    await location.load("evaluations");

    return location;
  }

  async update({ params, request }) {
    const location = await Location.findOrFail(params.id);
    const data = request.only(["name", "latitude", "longitude"]);

    location.merge(data);

    await location.save();

    return location;
  }

  async destroy({ params }) {
    const location = await Location.findOrFail(params.id);

    await location.delete();
  }
}

module.exports = LocationController;
