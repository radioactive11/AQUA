const Student = require("../models/Students");
const ErrorResponse = require("../utils/ErrorResponse");
const asyncHandler = require("../middlewares/asyncHandler");
const bcrypt = require("bcrypt");
const sendResponse = require("../utils/sendResponse");
const jwt = require("jsonwebtoken");
const Assignments = require("../models/Assignments");
const Notice = require("../models/Notices");


// @desc login student
// @route POST /signin
// @access PUBLIC

module.exports.signin = asyncHandler(async(req,res,next) => {
    const {name,email} = req.body;
    const secret = process.env.JWT_SECRET;

    const student = await Student.findOne({
        email
    }).populate({
            path: "assignments",
            populate: {
                path: "givenBy",
            },
        })
        .populate({
            path: "notices",
            populate: {
                path: "givenBy",
            },
        });

    if(student){
        const token = jwt.sign({
            _id:student._id
        },secret);

        res.status(200).json({
            student,
            token
        })
    }
    else{
        //If loginning first time then save the user in the db
        let assignments = [];
        let notices = [];

        const savedAssignments = await Assignments.find({});
        const savedNotices = await Notice.find({});

        savedAssignments.map((assignment) => {
            assignments.push(assignment._id);
        });

        savedNotices.map((notice) => {
            notices.push(notice._id);
        });

        const newStudent = new Student({
            name,
            email,
            assignments,
            notices,
        });

        newStudent
            .save()
            .then((student) => {
                const token = jwt.sign(
                {
                    _id: student._id,
                },  
                    secret
                );

                res.status(200).json({
                    user:student,
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
    const student = await Student.findById(req.student._id);
    sendResponse(student, "Protected Page", res);
});
