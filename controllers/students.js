const fs = require('fs');
const data = require('../data.json');
const { date, grade } = require('../util');


exports.create = (req, res) => {
    return res.render("students/create");
};

exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for (let key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields.')
        }
    }

    birth = Date.parse(req.body.birth);
    

    let id = 1;
    const lastStudent = data.students[data.students.length - 1];

    if (lastStudent) {
        id = lastStudent.id + 1;
    };

    data.students.push({
        id,
        ...req.body,
        birth,
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write file error!");

        return res.redirect("/students");
    })

    
};

exports.show = (req, res) => {
    const { id } = req.params;

    const foundStudent = data.students.find((student) => {
        return id == student.id;
    })

    if(!foundStudent) return res.send("O aluno solicitado não foi encontrado.");

    const student = {
        ...foundStudent,
        birthday: date(foundStudent.birth).birthday,
        scholar_year: grade(foundStudent.scholar_year)
    }

    return res.render('students/show', {student} );

}

exports.edit = (req, res) => {
    const { id } = req.params;

    const foundStudent = data.students.find((students) => {
        return id == students.id;
    })

    if(!foundStudent) return res.send("O aluno solicitado não foi encontrado.")
    
    const student = {
        ...foundStudent,
        date: date(foundStudent.birth).iso,
    }

    
    
    
    
    res.render('students/edit', {student});
};

exports.put = (req, res) => {
    const { id } = req.body;

    
    
    let index = 0;

    const foundStudent = data.students.find((student, foundIndex) => {
        if (id == student.id) {
            index = foundIndex;
            return true;
        }
    })

    if(!foundStudent) return res.send("Aluno não encontrado.");

    const student = {
        id: Number(req.body.id),
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
    }

    data.students[index] = student;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Falha na escrita.")

        return res.redirect(`students/${id}`)
    })
};

exports.delete = (req, res) => {
    const { id } = req.body;

    const filteredStudents = data.students.filter((student) => {
        return student.id != id;
    })

    

    data.students = filteredStudents;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Erro ao deletar o professor.");

        return res.redirect("/students");
    })
}

exports.index = (req, res) => {
    
    const copyStudents = [
        ...data.students
    ];

    const emptyArr = [];

    for (let i = 0; i < copyStudents.length; i++) {
        let schoolYear = copyStudents[i].scholar_year;
        let copycopyStudents = {
            ...copyStudents[i],
            scholar_year2: grade(schoolYear)
        }

        emptyArr.push(copycopyStudents);
    };


    return res.render('students/index', { students: emptyArr } );
}



module.exports