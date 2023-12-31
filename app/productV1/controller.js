const { ObjectID } = require("bson");
const db = require("../../config/mongodb");
const path = require("path");
const fs = require("fs");

const index = (req, res) => {
  db.collection("products")
    .find()
    .toArray()
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

const filterView = (req, res) => {
  const { id } = req.params;
  db.collection("products")
    .findOne({ _id: ObjectID(id) })
    .then(result => res.send(result))
    .catch(error => res.send(error));
};
const storeView = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../public/uploads", image.originalname);
    fs.renameSync(image.path, target);
    db.collection("products")
      .insertOne({
        name,
        price,
        stock,
        status,
        image_url: `http:localhost:3001/public/${image.originalname}`,
      })
      .then(result => res.send(result))
      .catch(error => res.send(error));
  }
};

const updateView = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  const { id } = req.params;
  console.log(req.params);
  if (image) {
    const target = path.join(__dirname, "../../public/uploads", image.originalname);
    fs.renameSync(image.path, target);
    db.collection("products")
      .updateOne(
        { _id: ObjectID(id) },
        {
          $set: {
            name,
            price,
            stock,
            status,
            image_url: `http:localhost:3001/public/${image.originalname}`,
          },
        }
      )
      .then(result => res.send(result))
      .catch(error => res.send(error));
  }
};

const destroyView = (req, res) => {
  const { id } = req.params;
  db.collection("products")
    .deleteOne({ _id: ObjectID(id) })
    .then(result => res.send(result))
    .catch(error => res.send(error));
};

module.exports = { index, filterView, storeView, updateView, destroyView };
