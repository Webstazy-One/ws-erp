const { user } = require("../models")
const User = require("../models/user.model")
const roles = require("../models/role.model")
var bcrypt = require("bcryptjs")

exports.allAccess = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { $regex: new RegExp(username), $options: "i" } } : {};

  User.find(condition)
    .populate('roles')
    .then(data => {
      res.send(data)
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




exports.DeleteFromUser = (req, res) => {
  const username = req.params.username;
  if (User.find({
    username: "zeus"
  })) {
    res.status(500).send({
      message: `Cannot Delete zeus as inactive.`,
    }
    )
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

exports.DeleteUser = (req, res) => {
  const username = req.params.username;

  User.findOneAndUpdate({ username: username }, { $set: { _active: false } })
    .then(data => {

      if (!data) {
        res.status(404).send({
          message: `Cannot inactive user=${username}.`,
        });
      } else res.send(true);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error inactivating user =" + username,
      });
    });
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
  User.find({ _active: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user."
      })
    })
}
