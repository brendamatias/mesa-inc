"use strict";

const Model = use("Model");

class Evaluation extends Model {
  evaluation() {
    return this.belongsTo("App/Models/Evaluation");
  }

  user() {
    return this.belongsTo("App/Models/User");
  }
}

module.exports = Evaluation;
