var connect = require("trilogy").connect;
const production_cost = require("./model_schemes").production_cost

async function load_model(db, table_name, schema) {
  const model = await db.model(table_name, schema);
  return model;
}

async function write_to_table(model, value) { }

const db = connect("/../database.db", {
  client: "sqlite3"
});

async function test() {
  const production_cost_model = await load_model(db, 'production_cost', production_cost)
  const breed = await production_cost_model.findIn('seed_price')
  console.log(breed)
}

test()

module.exports = {
  load_model: load_model,
  db: db
};
