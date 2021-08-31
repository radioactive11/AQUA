const mongoose = require("mongoose");
const schema = mongoose.Schema;

const { ObjectId } = mongoose.Schema.Types;

const teacherSchema = new schema({
    name: {
        type: String,
        required: true,
    },
    // phone: {
    //     type: Number,
    //     required: [true, "Please enter a phone number"],
    //     match: [
    //         /^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/,
    //         "Please enter a valid phone number",
    //     ],
    // },
    photo:{
        type:String,
    },
    email: {
        type: String,
        required: [true, "Please enter an email!"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email",
        ],
    },
    // password: {
    //     type: String,
    //     required: [true, "Please add a password"],
    //     min: [6, "Password should be of atleast 6 charachters"],
    // },
    notices: [
        {
            type: ObjectId,
            ref: "Notice",
        },
    ],
    assignments: [
        {
            type: ObjectId,
            ref: "Assignments",
        },
    ],
    type: {
        type: String,
        default: "teacher",
    },
});

const Teacher = mongoose.model("Teacher", teacherSchema);
module.exports = Teacher;
