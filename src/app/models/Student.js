const db = require('../../config/db');
const { date, grade } = require('../../lib/util');

module.exports = {
    all(callback) {
        db.query(`
            SELECT * FROM students
        `, (err, results) => {
            if(err) throw `database error! ${err}`;

            results.rows.map((subject) => {
                return subject.scholar_year = grade(subject.scholar_year);
            })

            callback(results.rows);
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                birth_date,
                email,
                scholar_year,
                workload
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `;

        
        
        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.email,
            data.scholar_year,
            Number(data.workload),
        ];

        

        db.query(query, values, (err, results) => {
            if(err) throw `database error! ${err}`;
            
            callback(results.rows[0]);
        })
    },
    find(id, callback) {
        db.query(`
        SELECT *
        FROM students
        WHERE id = $1`, [id], (err, results) => {
            if(err) throw `database error! ${err}`;

            callback(results.rows[0]);
        })
    },
    update(data, callback) {
        const query = `
        UPDATE students SET
            avatar_url=($1),
            name=($2),
            birth_date=($3),
            email=($4),
            scholar_year=($5),
            workload=($6)
        WHERE id = $7
        `;

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.email,
            data.scholar_year,
            Number(data.workload),
            data.id
        ];

        db.query(query, values, (err, results) => {
            if(err) throw `database error! ${err}`;

            callback();
        })
    },
    delete(id, callback) {
        
        db.query(`DELETE FROM students WHERE id = $1`, [id], (err) => {
            if(err) throw `database error! ${err}`;

            return callback();
        })
    }
};