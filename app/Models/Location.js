"use strict";

const Model = use("Model");

class Location extends Model {
  user() {
    return this.belongsTo("App/Models/User");
  }

  evaluations() {
    return this.hasMany("App/Models/Evaluation");
  }
}

module.exports = Location;
