const Student = require('../models/Student');

// Create new student
exports.createStudent = async (req, res) => {
    try {
        const { name, age, course } = req.body;
        const student = new Student({ name, age, course });
        await student.save();
        res.status(201).json({ message: 'Student created successfully', student });
    } catch (error) {
        res.status(500).json({ error: 'Failed to create student' });
    }
};

// Get all students
exports.getStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch students' });
    }
};

// Get single student by ID
exports.getStudentById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json(student);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch student' });
    }
};

// Update student
exports.updateStudent = async (req, res) => {
    try {
        const { name, age, course } = req.body;
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            { name, age, course },
            { new: true }
        );
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student updated successfully', student });
    } catch (error) {
        res.status(500).json({ error: 'Failed to update student' });
    }
};

// Delete student
exports.deleteStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);
        if (!student) return res.status(404).json({ message: 'Student not found' });
        res.status(200).json({ message: 'Student deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete student' });
    }
};
