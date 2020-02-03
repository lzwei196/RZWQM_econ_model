var connect = require("trilogy").connect;
const production_cost = require("./model_schemes").production_cost

async function load_model(db, table_name, schema) {
  const model = await db.model(table_name, schema);
  return model;
}

async function write_to_table(model, value) {}

const db = connect("database.db", {
  client: "sqlite3"
});

function if_null(object) {

}

module.exports = {
  load_model: load_model,
  db: db
};