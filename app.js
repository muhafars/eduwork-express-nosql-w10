// import
const logger = require("morgan");
const express = require("express");
const app = express();
const path = require("path");
// ? Inisialisasi Server
const productRouterV1 = require("./app/productV1/routes");
const port = process.env.PORT ? process.env.PORT : 3001;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", productRouterV1);
app.use("/public/", express.static(path.join(__dirname, "./public/uploads")));
app.use((req, res, next) => {
  res.status(404);
  res.send({
    status: "failed",
    message: "Resource" + req.originalUrl + "Not Found",
  });
  next();
});

app.listen(port, () => {
  console.log(`server listening.. on port ${port}`);
});
