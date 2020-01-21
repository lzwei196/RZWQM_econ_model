var connect = require("trilogy").connect;
const db = connect("database.db", {
  client: "sqlite3"
});

async function check() {
  const project = await db.model("project", {
    name: String,
    date: String,
    location: String
  });

  const result = await project.find();
  console.log(result);
}

module.exports = {
  create: check
};
