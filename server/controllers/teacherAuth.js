const Teacher = require("../models/Teachers");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcrypt");
const sendResponse = require("../utils/sendResponse");
const jwt = require("jsonwebtoken");

// @desc login teacher
// @route POST /signin
// @access PUBLIC

module.exports.signin = asyncHandler(async(req,res) => {
    const {name,email} = req.body;
    const secret = process.env.JWT_SECRET;

    const teacher = await Teacher.findOne({
        email
    }).populate({
            path: "assignments",
            populate: {
                path: "assignmentsSubmitted.givenBy",
            },
        })
        .populate("notices");

    if(teacher){
        const token = jwt.sign({
            _id:teacher._id
        },
        secret);

        res.status(200).json({
            teacher,
            token
        })
    }
    else{
        //If loginning first time then save the user in the db

        const newTeacher = new Teacher({
            name,
            email,
        });

        newTeacher
        .save()
        .then((teacher) => {
            const token = jwt.sign(
            {
                _id: teacher._id,
            },  
                secret
            );

            res.status(200).json({
                user:teacher,
                token
            })
        })
        .catch((err) => {
            console.log(err);
        });
    
    }    
})


// @desc dashboard
// @route GET /dashboard
// @access Private

module.exports.dashboard = asyncHandler(async (req, res) => {
    const teacher = await Teacher.findById(req.teacher._id);
    sendResponse(teacher, "Protected Page", res);
});
