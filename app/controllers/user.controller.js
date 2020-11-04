const { user } = require("../models")
const User = require("../models/user.model")
const roles = require("../models/role.model")
var bcrypt = require("bcryptjs")

exports.allAccess = (req, res) => {
  let userar = {}
  let userDet = []
  const username = req.query.username
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {}

  User.find(condition)
    .populate('roles')
    .then(data => {
      data.forEach(user => {
        userar = {
          roles : user.roles[0].name,
          username: user.username,
          password: user.password,
          name: user.name,
          _active: user._active
        }

        userDet.push(userar)
      })
      res.send(userDet)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving stock."
      })
    })
}

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.overrideUserBoard = (req, res) => {
  res.status(200).send("Override User Content.");
};




exports.DeleteUser = (req, res) => {
  const username = req.params.username;
  if (username === "zeus"){
    res.status(404).send({
      message: `Cannot Delete zeus.`,
    });
  } else {

    User.findOneAndUpdate({ username: username }, { $set: { _active: false } })
      .then(data => {

        if (!data) {
          res.status(404).send({
            message: `Cannot change user as inactive=${username}.`,
          });
        } else res.send(true);
      })
      .catch((err) => {
        res.status(500).send({
          message: err,
        });
      });
  }

}


exports.updatePasswordByUserName = (req, res) => {
  const username = req.params.username;
  const password = req.params.password;

  User.findOneAndUpdate({ username: username }, { $set: { password: bcrypt.hashSync(password, 8) } })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot update password=${password}.`,
        });
      } else res.send(true);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating password=" + password,
      });
    });
}


exports.findAllActive = (req, res) => {
  let userar = {}
  let userDet = []
  User.find({ _active: true })
  .populate('roles')
    .then(data => {

      data.forEach(user => {
        userar = {
          roles : user.roles[0].name,
          username: user.username,
          password: user.password,
          name: user.name,
          _active: user._active
        }
        userDet.push(userar)
      })
      res.send(userDet)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      })
    })
}
