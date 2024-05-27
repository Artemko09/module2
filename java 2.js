const questionsData = [
    {
        "question": "Яка найвища гора у світі?",
        "answers": ["Еверест", "К2", "Аннапурна", "Кіліманджаро"],
        "correctAnswer": 0
    },
    {
        "question": "Яка країна має найбільшу кількість острівів?",
        "answers": ["Індонезія", "Японія", "Філіппіни", "Греція"],
        "correctAnswer": 0
    },
    {
        "question": "Який метал є найбільш поширеним на Землі?",
        "answers": ["Залізо", "Алюміній", "Мідь", "Свинець"],
        "correctAnswer": 0
    },
    {
        "question": "Який океан найбільший за площею?",
        "answers": ["Тихий океан", "Атлантичний океан", "Індійський океан", "Північний Льодовитий океан"],
        "correctAnswer": 0
    },
    {
        "question": "Яке єдине супутникове небесне тіло, на якому були люди, крім Землі?",
        "answers": ["Місяць", "Марс", "Юпітер", "Венера"],
        "correctAnswer": 0
    }
];

// Знаходимо необхідні DOM-елементи
const questionsContainer = document.getElementById('questions');
const resultsContainer = document.getElementById('results');
const scoreElement = document.getElementById('score');
const submitBtn = document.getElementById('submitBtn');

let currentQuestionIndex = 0;
let score = 0;

function generateQuestion(questionData) {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question');

    const questionText = document.createElement('p');
    questionText.classList.add('question-text');
    questionText.textContent = questionData.question;

    const answersList = document.createElement('ul');
    answersList.classList.add('answers');

    for (let i = 0; i < questionData.answers.length; i++) {
        const answerDiv = document.createElement('li');
        answerDiv.classList.add('answer');
        answerDiv.textContent = questionData.answers[i];
        answerDiv.dataset.index = i;

        answerDiv.addEventListener('click', function() {
            const selectedAnswer = parseInt(answerDiv.dataset.index);
            const isCorrect = selectedAnswer === questionData.correctAnswer;

            if (isCorrect) {
                score++;
                answerDiv.style.backgroundColor = 'lightgreen';
            } else {
                answerDiv.style.backgroundColor = 'lightcoral';
            }

            for (const answer of answersList.children) {
                answer.removeEventListener('click', answerClickHandler); // Видаляємо обробник події, щоб уникнути подвійного кліку
            }

           
        });

        answersList.appendChild(answerDiv);
    }

    questionDiv.appendChild(questionText);
    questionDiv.appendChild(answersList);
    questionsContainer.appendChild(questionDiv);
}

function displayResults() {
    resultsContainer.style.display = 'block';
    scoreElement.textContent = score + ' з 5';
}

function startTest() {
    generateQuestion(questionsData[currentQuestionIndex]);
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questionsData.length) {
        questionsContainer.innerHTML = ''; // Очищуємо попереднє питання
        generateQuestion(questionsData[currentQuestionIndex]);
    } else {
        displayResults();
        submitBtn.disabled = true;
    }
}


submitBtn.addEventListener('click', nextQuestion);

startTest();
