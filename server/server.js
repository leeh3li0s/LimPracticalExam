const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Student = require(".models/Students");
const Students = require("./models/Student");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
    })
    .catch((error) => {
        console.log("MongoDB connection error: ", error)
    });

let students = [
    {
        id: 1,
        name: "Juan Dela Cruz",
        course: "BSIT",
        age: 20
    },
    {
        id: 2,
        name: "Maria Santos",
        course: "BSCS",
        age: 19
    }
];

// app.get("/students", (req,res) => {
//     res.json(students);
// });

app.get("/", (req, res) =>{
res.send("server is running");
});

app.get("/students", async (req, res) =>{
    res.send("server is running");
});


app.get("/students", async (req, res) =>{
   const students = await Student.find();
   res.json(students);
});


app.post("/students", async (req, res) =>{
   const {name, course, age} = req.body;
   const newStudent = new Student ({ name, course, age});
    await newStudent.save();

   res.json(newStudent);
});

app.put("students/:id", async (req, res) => {
    const {id} = req.params;
    const {name, course, age} = req.body;
    const updateStudent = await Student.findByIdAndUpdate(id, {name, course, age}, {new: true});

    res.json(updateStudent);
});

app.delete("/students/:id", async (req, res) => {
    const {id} = req.params;
    await Student.findByIdAndDelete(id);

    res.json({message: "Deleted student."})
});

app.listen(5000, () => {
    console.log("server running on port 5000");
});


