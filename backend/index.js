const express = require("express");
const path = require("path");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const wrapResponse = require("./helpers/response");
const mongoose = require("./helpers/db-connect");
const getRoutes = require("./routes");
const config = path.resolve(__dirname, "env", "local.json");
const PORT = config.PORT || 7000;

app.use(
  cors({
    origin: "https://help-desk-li7l.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json());
app.use((req, res, next) => {
  res = wrapResponse(req, res);
  next();
});
let routes = getRoutes(express.Router());
app.use(routes);

mongoose();

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
