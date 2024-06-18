// Simulated data - replace with dynamic data fetching from backend
const quizzes = [
  {
    id: 1,
    question: "What is the capital of France?",
    answers: ["London", "Paris", "Berlin", "Madrid"],
    correctAnswer: 2
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: 1
  }
];

// Function to display quizzes dynamically
function displayQuizzes() {
  const quizList = document.getElementById('quizList');

  quizzes.forEach(quiz => {
    const quizDiv = document.createElement('div');
    quizDiv.classList.add('quiz');

    const questionHeading = document.createElement('h3');
    questionHeading.textContent = quiz.question;

    const answersList = document.createElement('ul');
    quiz.answers.forEach((answer, index) => {
      const answerItem = document.createElement('li');
      answerItem.textContent = answer;
      if (index + 1 === quiz.correctAnswer) {
        answerItem.classList.add('correct-answer');
      }
      answersList.appendChild(answerItem);
    });

    quizDiv.appendChild(questionHeading);
    quizDiv.appendChild(answersList);
    quizList.appendChild(quizDiv);
  });
}

// Display quizzes on page load
document.addEventListener('DOMContentLoaded', () => {
  displayQuizzes();
});

// Handle form submission (add quiz question)
const quizForm = document.getElementById('quizForm');

quizForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const question = document.getElementById('question').value;
  const answer1 = document.getElementById('answer1').value;
  const answer2 = document.getElementById('answer2').value;
  const answer3 = document.getElementById('answer3').value;
  const answer4 = document.getElementById('answer4').value;
  const correctAnswer = document.querySelector('input[name="correctAnswer"]:checked').value;

  const newQuiz = {
    id: quizzes.length + 1,
    question: question,
    answers: [answer1, answer2, answer3, answer4],
    correctAnswer: parseInt(correctAnswer)
  };

  quizzes.push(newQuiz);
  quizForm.reset();
  displayQuizzes();
});