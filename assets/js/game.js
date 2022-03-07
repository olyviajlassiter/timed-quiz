const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];


let questions = [
{
  question: 'What house does Harry Potter belong to?',
  choice1: 'Slytherin',
  choice2: 'Hufflepuff',
  choice3: 'Ravenclaw',
  choice4: 'Gryffindor',
  answer: 4,
},
{
  question: 'What position does Harry Potter play on his Quidditch team?',
  choice1: 'Seeker',
  choice2: 'Keeper',
  choice3: 'Bludger',
  choice4: 'Chaser',
  answer: 1,
},
{
  question: 'What does the Imperius Curse do?',
  choice1: 'Tortures',
  choice2: 'Kills',
  choice3: 'Controls',
  choice4: 'Turns the person into a wolf',
  answer: 3,
},
{
  question: 'How does Harry Potter catch his first snitch?',
  choice1: 'In his hat',
  choice2: 'With his feet',
  choice3: 'In his mouth',
  choice4: 'With his broom',
  answer: 3,
},
{
  question: 'What magical talent does Harry Potter share with Voldemort?',
  choice1: 'They are both aurors',
  choice2: 'They both speak parselmouth',
  choice3: 'They are both animagus',
  choice4: 'They are both evil wizards',
  answer: 2,
}
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};


getNewQuestion = () => {
  if(availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem('mostRecentScore', score);
    return window.location.assign('endgame.html');
  };

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;
  progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset['number'];
    choice.innerText = currentQuestion['choice' + number];

  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;

};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if(!acceptingAnswers)
    return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];
  
    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

      selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
      
  

  if(classToApply === 'correct') {
    incrementScore(SCORE_POINTS)
  }

  })
})

incrementScore = num => {
  score +=num
  scoreText.innerText = score
}





startGame ()