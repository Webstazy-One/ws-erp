const db = require("../models");
const Tag = db.tag;


exports.create = (req, res) => {

  const tag = new Tag
    ({
      tag: req.body.tag
    });

  tag
    .save(tag)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send
        ({
          message: err.message || "Some error occurred while creating the Tag data"
        });
    });
};











