"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class EvaluationSchema extends Schema {
  up() {
    this.create("evaluations", table => {
      table.increments();
      table
        .integer("location_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("locations")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.integer("rating").notNullable();
      table.text("comment");
      table.timestamps();
    });
  }

  down() {
    this.drop("evaluations");
  }
}

module.exports = EvaluationSchema;
