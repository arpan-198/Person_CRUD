const persons = require('../../db/database').person_model;
const mongoose = require('mongoose');


exports.getPerson = async (req, res) => {
    persons.find({}, (err, result) => {
        if (err) {
            console.log(err);
            res.status(401).json({
                message: "Something Is Wrong"
            });
        }
        else {

            // console.log(result.length);
            // console.log(result);

            if (result.length == 0) {
                res.status(400).json({
                    message: "No Data Available",
                    data: result
                });
            }
            else {
                res.status(200).json({
                    message: "Successfull",
                    data: result
                });
            }
        }
    })
}





exports.postPerson = async (req, res) => {
    // console.log(req.body);
    let name = req.body.name.trim();
    let age = parseInt(req.body.age);
    let gender = req.body.gender.trim();
    let mno = req.body.mno;

    persons.find({ mno: `${mno}` }, async (err, result) => {
        if (err) {
            res.status(401).json({
                message: "Something Is Wrong"
            });
        }
        else if (result.length > 0) {
            res.status(401).json({
                message: "Mobile Number Already Exist"
            });
        }
        else {

            let new_person = new persons({ name: `${name}`, age: `${age}`, gender: `${gender}`, mno: `${mno}` });
            new_person.save((err, result) => {
                if (err) {
                    console.log(err);
                    res.status(401).json({
                        message: "Invalid"
                    });
                }
                else {
                    // console.log(result);
                    res.status(200).json({
                        message: "Successfull"
                    });
                }
            });


        }
    })



}



exports.putPerson = async (req, res) => {
    let query_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(query_id)) {
        res.status(401).json({
            message: "Invalid Id"
        });
    }
    else {
        // console.log("oiii");

        const id = mongoose.Types.ObjectId(query_id);
        persons.find({ mno: req.body.mno, _id: { $ne: id } }, async (err, res1) => {
            if (err) {
                res.status(401).json({
                    message: "Something Is Wrong"
                });
            }
            else if (res1.length > 0) {
                res.status(401).json({
                    message: "Mobile No Already Exists"
                });
            }
            else {
                persons.findOneAndUpdate({ _id: id }, req.body, (err, result) => {
                    if (err) {

                        res.status(401).json({
                            message: "Something Is Wrong"
                        });
                    }
                    else {
                        // console.log(result);
                        if (!result) {
                            res.status(400).json({
                                message: "No Data Available",
                                data: result
                            });
                        }
                        else {
                            res.status(200).json({
                                message: "Successfull",
                                data: result
                            });
                        }

                    }
                })
            }
        })



    }


}




exports.deletePerson = (req, res) => {
    let query_id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(query_id)) {
        res.status(401).json({
            message: "Invalid Id"
        });
    }
    else {

        const id = mongoose.Types.ObjectId(query_id);

        // console.log(id);
        persons.findOneAndRemove({ _id: id }, (err, result) => {
            if (err) {

                res.status(401).json({
                    message: "Something Is Wrong"
                });
            }
            else {
                // console.log("oii");
                // console.log(result);
                if (!result) {
                    res.status(400).json({
                        message: "No Data Available",
                        data: result
                    });
                }
                else {
                    res.status(200).json({
                        message: "Successfull",
                        data: result
                    });
                }

            }
        })


    }
}


