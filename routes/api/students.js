const express = require("express");
const router = express.Router();
const students = require("../../data/Students");
const { check, validationResult } = require("express-validator");

// @route GET api/students
// @desc  Get all students
router.get("/", (req, res) => {
  res.json(students);
});

// @route GET api/students/:id
// @desc  Get student by id
router.get("/:id", (req, res) => {
  const student = students.find(student => student.id === parseInt(req.params.id));
  if (!student) {
    res.status(404).json({ msg: `No student found with id ${req.params.id}` });
  }
  res.send(student);
});

// @route POST api/students
// @desc create a student
router.post(
  "/",
  [
    check("name", "Name is required")
      .not()
      .isEmpty(),
    check("email", "Enter a valid email").isEmail()
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const { name, email } = req.body;
    const newStudent = {
      id: students.length + 1,
      name: name,
      email: email
    };

    students.push(newStudent);
    res.json({ msg: "Student created", students });
  }
);

// @route PUT api/students/:id
// @desc update a student
router.put("/:id", (req, res) => {
  const student = students.find(student => student.id === parseInt(req.params.id));
  if (!student) {
    res.status(404).send(`No student found with id ${req.params.id}`);
  }
  const { name, email } = req.body;
  students.forEach(student => {
    if (student.id === parseInt(req.params.id)) {
      if (name) student.name = name;
      if (email) student.email = email;
      res.json({ msg: "Student updated", student });
    }
  });
});

// @route DELETE api/students/:id
// @desc delete a student
router.delete("/:id", (req, res) => {
  const student = students.find(student => student.id === parseInt(req.params.id));
  if (!student) {
    res.status(404).send(`No student found with id ${req.params.id}`);
  }
  const index = students.indexOf(student);
  students.splice(index, 1);
  res.send("Student deleted");
});
module.exports = router;
