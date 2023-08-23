const express = require("express");
const routes = require("./routes");
const sequelize = require("./config/connection"); // Assuming your Sequelize connection setup is in this file

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware for handling JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use the defined routes
app.use(routes);

// Sync Sequelize models to the database
sequelize.sync({ force: false }).then(() => {
  // force: false avoids dropping and re-creating tables on every app start
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
