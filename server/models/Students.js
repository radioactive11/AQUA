const mongoose = require("mongoose");
const schema = mongoose.Schema;

const { ObjectId } = mongoose.Schema.Types;

const studentSchema = new schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    email: {
        type: String,
        required: [true, "Please enter an email!"],
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please enter a valid email",
        ],
    },
    photo:{
        type:String
    },  
    assignments: [
        {
            type: ObjectId,
            ref: "Assignments",
        },
    ],
    notices: [
        {
            type: ObjectId,
            ref: "Notice",
        },
    ],
    type: {
        type: String,
        default: "user",
    },
});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;
