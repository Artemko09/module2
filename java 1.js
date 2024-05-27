document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('surveyForm');
    const showCSStudentsBtn = document.getElementById('showCSStudents');
    const show_averageBal=document.getElementById('averageBal')
    const csStudentsList = document.createElement('div');
    csStudentsList.style.marginBottom='20px';
    csStudentsList.style.padding='20px';
    csStudentsList.style.border='2px solid #ccc';
    csStudentsList.style.borderRadius='2px';
    csStudentsList.id = 'csStudentsList';


    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        const surveyData = {};

        for (const [key, value] of formData.entries()) {
            if (key === 'bio') {
                surveyData[key] = `bio: "${value}"`;
            } else {
                if (surveyData[key]) {
                    if (!Array.isArray(surveyData[key])) {
                        surveyData[key] = [surveyData[key]];
                    }
                    surveyData[key].push(value);
                } else {
                    surveyData[key] = value;
                }
            }
        }

        let surveys = JSON.parse(localStorage.getItem('surveys')) || [];
        surveys.push(surveyData);
        localStorage.setItem('surveys', JSON.stringify(surveys));

        form.reset();
        alert('Дякуємо за участь у опитуванні!');
    });

    const storedData = localStorage.getItem('surveys') || [];
    const surveys = JSON.parse(storedData);

    showCSStudentsBtn.addEventListener('click', function() {
        const csStudents = surveys.filter(survey => survey.faculty === 'computerScience');
        document.body.append(csStudentsList);
        csStudentsList.innerHTML = ''; // Clear previous content

        if (csStudents.length > 0) {
            csStudentsList.innerHTML = '<h3>Студенти з факультету комп\'ютерних наук:</h3>';
            csStudentsList.innerHTML += '<ul>';
            for (const student of csStudents) {
                csStudentsList.innerHTML += `<li>Ім\'я: ${student.name}</li>`;
            }
            csStudentsList.innerHTML += '</ul>';
        } else {
            csStudentsList.innerHTML = 'Не знайдено студентів з факультету комп\'ютерних наук.';
        }
    });

    show_averageBal.addEventListener('click', function() {
        csStudentsList.innerHTML = ''; 

        if (surveys.length > 0) {
            csStudentsList.innerHTML = '<h3>Студенти з середнім балом 4-5:</h3>';
            csStudentsList.innerHTML += '<ul>';
            for (const student of surveys) {
                if (student.averageScore >= 4 && student.averageScore <= 5) {
                    csStudentsList.innerHTML += `<li>Ім\'я: ${student.name} (середній бал: ${student.averageScore})</li>`;
                }
            }
            csStudentsList.innerHTML += '</ul>';
        } else {
            csStudentsList.innerHTML = 'Не знайдено студентів.';
        }
    });
});