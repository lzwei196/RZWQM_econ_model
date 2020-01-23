var connect = require("trilogy").connect;

async function load_model(db, table_name, schema) {
  const model = await db.model(table_name, schema);
  return model;
}

async function write_to_table(model, value) {}

const db = connect("database.db", {
  client: "sqlite3"
});

module.exports = {
  load_model: load_model,
  db: db
};
