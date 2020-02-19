"use strict";

const Evaluation = use("App/Models/Evaluation");

class EvaluationController {
  async index({ params }) {
    const evaluations = await Evaluation.query()
      .where("location_id", params.locations_id)
      .with("user")
      .fetch();

    return evaluations;
  }

  async store({ params, request, auth }) {
    const data = request.only(["rating", "comment"]);

    // Para não ocorrer duplicidade //
    await Evaluation.query()
      .where("user_id", "=", auth.user.id)
      .where("location_id", "=", params.locations_id)
      .delete();

    const evaluation = await Evaluation.create({
      ...data,
      location_id: params.locations_id,
      user_id: auth.user.id
    });

    return evaluation;
  }

  async show({ params }) {
    const evaluation = await Evaluation.query()
      .where("location_id", "=", params.locations_id)
      .where("user_id", "=", params.id)
      .fetch();

    return evaluation;
  }

  async update({ params, request }) {
    const evaluation = await Evaluation.findOrFail(params.id);
    const data = request.only(["user_id", "rating", "comment"]);

    evaluation.merge(data);

    await evaluation.save();

    return evaluation;
  }

  async destroy({ params }) {
    const evaluation = await Evaluation.findOrFail(params.id);

    await evaluation.delete();
  }
}

module.exports = EvaluationController;
