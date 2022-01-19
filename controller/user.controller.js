const db = require("../models");
const User = db.user;

// Create and Save a new Tutorial
exports.create = (req, res) => {

    if (!req.body.user) {
        res.status(400).send({ message: "Content can not be empty!"});
        return;
    }

    const user = new User({
        name: req.body.user,
        age: req.body.age,
        cargo: req.body.cargo
    });

    user.save(user)
        .then( (data) => {
            res.send(data);
        })
        .catch(err =>  {
            res.staus(500).send({
                message: err.message || "Something bad occurs!"
            });
        });

};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

    const name = req.query.name;
    var condition = name ? { title: { $regex: new RegExp(name), $options: "i" } } : {};

    User.find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving users."
            });
        });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {

    const id = req.params.id;

    User.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found Tutorial with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving Tutorial with id=" + id });
      });

};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {

    if (!req.body) {
        return res.status(400).send({
          message: "Data to update can not be empty!"
        });
      }
    
    const id = req.params.id;
    
    User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else res.send({ message: "Tutorial was updated successfully." });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Tutorial with id=" + id
            });
        });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
    
    const id = req.params.id;

    User.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
                });
            } else {
                res.send({
                    message: "Tutorial was deleted successfully!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  
};