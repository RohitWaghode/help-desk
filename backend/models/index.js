const fs = require("fs");

exports.setup = function (database) {
  const promise = new Promise((resolve, reject) => {
    let models = {};
    fs.readdir(__dirname, function (err, files) {
      for (let i in files) {
        if (files[i] === "index.js") {
          continue;
        }
        if (files[i].split(".").length > 2) {
          continue;
        }
        try {
          let m = require("./" + files[i]);
          models[m.name] = database.model(m.name, m.schema);
        } catch (err) {
          console.log("error while setting models", err);
        }
      }
      global._models = models;
      resolve("promise resolved");
    });
  });

  return promise;
};
