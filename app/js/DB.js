var connect = require("trilogy").connect;

async function check() {
  const db = connect("database.db", { client: "sql.js" });
  const theModel = await db.hasModel("user");
  console.log(theModel);
}

module.exports = {
  create: check
};
