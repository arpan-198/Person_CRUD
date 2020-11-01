const express = require('express');
const router = express.Router();

const person_op = require('../api/controller/person.controller');


router.get('/', person_op.getPerson);

router.post('/', person_op.postPerson);

router.put('/:id', person_op.putPerson);

router.delete('/:id', person_op.deletePerson);


module.exports = router;