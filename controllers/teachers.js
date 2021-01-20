const fs = require('fs');
const data = require('../data.json');
const Intl = require('intl');
const { age, graduation, date } = require('../util');


exports.create = (req, res) => {
    return res.render("teachers/create");
};

exports.post = (req, res) => {
    const keys = Object.keys(req.body);

    for (let key of keys) {
        if (req.body[key] == "") {
            return res.send('Please, fill all fields.')
        }
    }

    let {
        avatar_url,
        name,
        birth,
        graduation_level,
        class_type,
        subjects


    } = req.body;

    birth = Date.parse(birth);
    const since = Date.now();

    let id = 1;
    const lastTeacher = data.teachers[data.teachers.length - 1];

    if (lastTeacher) {
        id = lastTeacher.id + 1;
    };

    data.teachers.push({
        id,
        avatar_url,
        name,
        birth,
        graduation_level,
        class_type,
        subjects,
        since
    });

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if (err) return res.send("Write file error!");

        return res.redirect("/teachers");
    })

    
};

exports.show = (req, res) => {
    const { id } = req.params;

    const foundTeacher = data.teachers.find((teachers) => {
        return id == teachers.id;
    })

    if(!foundTeacher) return res.send("O professor solicitado não foi encontrado.")

    const classes = foundTeacher.subjects.split(",");

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        graduation: graduation(foundTeacher.graduation_level),
        subjects: classes,
        created_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.since), 
    }





    return res.render('teachers/show', {teacher} );

}

exports.edit = (req, res) => {
    const { id } = req.params;

    const foundTeacher = data.teachers.find((teachers) => {
        return id == teachers.id;
    })

    if(!foundTeacher) return res.send("O professor solicitado não foi encontrado.")
    
    const teacher = {
        ...foundTeacher,
        date: date(foundTeacher.birth).iso,
    }

    
    
    
    
    res.render('teachers/edit', {teacher});
};

exports.put = (req, res) => {
    const { id } = req.body;

    
    
    let index = 0;

    const foundTeacher = data.teachers.find((teacher, foundIndex) => {
        if (id == teacher.id) {
            index = foundIndex;
            return true;
        }
    })

    if(!foundTeacher) return res.send("Professor não encontrado.");

    const teacher = {
        ...foundTeacher,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id: Number(req.body.id)
    }

    data.teachers[index] = teacher;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Falha na escrita.")

        return res.redirect(`teachers/${id}`)
    })
};

exports.delete = (req, res) => {
    const { id } = req.body;

    console.log( {id} );

    const filteredTeachers = data.teachers.filter((teacher) => {
        return teacher.id != id;
    })

    

    data.teachers = filteredTeachers;

    fs.writeFile("data.json", JSON.stringify(data, null, 2), (err) => {
        if(err) return res.send("Erro ao deletar o professor.");

        return res.redirect("/teachers");
    })
}

exports.index = (req, res) => {
    
    const copyTeachers = [
        ...data.teachers
    ];


    let counter = 0;
    for (let teacher of copyTeachers) {
        copyTeachers[counter] = {
            ...teacher,
            subjects: teacher.subjects.split(',')
        }
        
        
        counter ++;
    }

    
    return res.render('teachers/index', { teachers: copyTeachers } );
}



module.exports