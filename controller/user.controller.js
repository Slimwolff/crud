const db = require("../models");
const User = db.user;


exports.create = (req, res) => {

    // console.log('front-end reach this route');

    if (!req.body.user) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
    let user, age, cargo;

    user = req.body.user;
    age = req.body.age;
    cargo = req.body.cargo;

    console.log(`User is: ${user} - age is: ${age} - cargo is: ${cargo}`);

    

    const userObj = new User({
        name: user,
        age: age,
        cargo: cargo
    });

    userObj.save(userObj)
        .then( (data) => {
            res.status(201).send({ message: "User was created successfully!"});
        })
        .catch(err =>  {
            res.staus(500).send({
                message: err.message || "Something bad occurs!"
            });
        });
};


exports.findAll = (req, res) => {

    const name = req.query.name;
    console.log(name);
    var condition = name ? { title: { $regex: new RegExp(name), $options: "i" } } : {};

    User.find(condition)
        .then(data => {
            console.log(data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving users."
            });
        });
};


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
