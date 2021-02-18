const { date, grade } = require('../../lib/util');
const Student = require('../models/Student');

module.exports = {
    index(req, res) {
        Student.all((students) => {
            return res.render('students/index', { students });
        });
    },
    create(req, res) {

        Student.teacherSelectorsOptions((options) => {
            return res.render("students/create", { teacherOptions: options });

        })
    },
    post(req,res) {
        const keys = Object.keys(req.body);

        for (let key of keys) {
            if (req.body[key] == "") {
                return res.send('Please, fill all fields.')
            }
        }
    
        Student.create(req.body, (student) => {
            return res.redirect(`students/${student.id}`);
        });
        
    },
    show(req, res) {
        Student.find(req.params.id, (student) => {
            if(!student) return res.send('student not found!');

            student.birth_date = date(student.birth_date).birthday;
            student.scholar_year = grade(student.scholar_year);
            
            return res.render('students/show', { student });
        })
    },
    edit(req, res) {
        Student.find(req.params.id, (student) => {
            student.birth_date = date(student.birth_date).iso;

            Student.teacherSelectorsOptions((options) => {
                return res.render("students/edit", { student, teacherOptions: options });
            })
        });
    },
    put(req, res) {
        const keys = Object.keys(req.body);

        for (let key of keys) {
            if (req.body[key] == "") return res.send('Please fill all the fields above.');
        }

        Student.update(req.body, () => {
            return res.redirect(`students/${req.body.id}`);
        });
    },
    delete(req, res) {
        Student.delete(req.body.id, () => {
            return res.redirect('students');
        })
    },
};
