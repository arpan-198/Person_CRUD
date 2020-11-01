const mongoose = require('mongoose');


const person = require('../schema');



mongoose.connect('mongodb://localhost/Person', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then(() => {
        console.log("db connected");
    }).catch((err) => {
        console.log(err);
    })

const person_model = mongoose.model('persons', person);

module.exports = {
    person_model
}