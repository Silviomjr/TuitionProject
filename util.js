module.exports = {
    age: (timestamp) => {
        const today = new Date();
        const birthDate = new Date(timestamp);

        let age = today.getFullYear() - birthDate.getFullYear();
        const month = today.getMonth() - birthDate.getMonth();

        if (month < 0 || month == 0 && today.getDate() <= birthDate.getDate()) {
            age = age - 1;
        }

        return age;
    },
    graduation: (graduation) => {
        if(graduation == "high_school") {
            return graduation = 'Ensino Médio Completo';
        } else if (graduation == "graduation") {
            return graduation = 'Ensino Superior Completo'; 
        } else if (graduation == "mastership") {
            return graduation = 'Mestrado';
        } else if (graduation == 'doctorship') {
            return graduation = 'Doutorado';
        }
    },
    date: (timestamp) => {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);
        
        return {
            day,
            month,
            year,
            birthday: `${day}/${month}`,
            iso: `${year}-${month}-${day}`,
            };
    },
    grade: (year) => {
        if (year == "5ef") {
            return year = "5º ano do ensino Fundamental";
        } else if (year == "6ef") {
            return year = "6º ano do ensino Fundamental";
        } else if (year == "7ef") {
            return year = "7º ano do ensino Fundamental";
        } else if (year == "8ef") {
            return year = "8º ano do ensino Fundamental";
        } else if (year == "9ef") {
            return year = "9º ano do ensino Fundamental";
        } else if (year == "1em") {
            return year = "1º ano do ensino Médio";
        } else if (year == "2em") {
            return year = "2º ano do ensino Médio";
        } else if (year == "3em") {
            return year = "3º ano do ensino Médio";
        }
    }
}