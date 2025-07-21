const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection");

const app = express();
const PORT = process.env.PORT || 3001;

const path = require("path");
app.use("/seed", express.static(path.join(__dirname, "seed")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

if (require.main === module) {
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
      console.log(`App listening on PORT ${PORT}`);
    });
  });
}

module.exports = app;
