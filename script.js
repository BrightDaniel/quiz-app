const questions = [
    {
        question: "Which Software Engineer is the best in the world?",
        answers: [
            {  text: "Kindness Isaac", correct: false},
            {  text: "Bright Daniel", correct: true},
            {  text: "Maxwell Business", correct: false},
            {  text: "Daniel Denyy", correct: false},
        ]
    },
    {
        question: "Does Bright Daniel Teaches Software Engineering?",
        answers: [
            {  text: "No", correct: false},
            {  text: "Yes, always", correct: true},
            {  text: "Yes sometimes", correct: false},
            {  text: "He doesnt know software engineering", correct: false},
        ]
    },
    {
        question: "Whats the best youtube channel for a nigerian to learn software engineering?",
        answers: [
            {  text: "Code 9ja", correct: false},
            {  text: "Bright Daniel", correct: false},
            {  text: "Bwave ICT", correct: true},
            {  text: "Daniel Denyy", correct: false},
        ]
    },
    {
        question: "What's the name of bright daniel software engineering software institution?",
        answers: [
            {  text: "Evy code", correct: false},
            {  text: "Bright codes", correct: false},
            {  text: "Code 9ja", correct: false},
            {  text: "Bwave ICT", correct: true},
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionnum = currentQuestionIndex + 1;
    questionElement.innerHTML = questionnum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML =  answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
         if(button.dataset.correct === "true"){
            button.classList.add("correct");
         }
         button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Restart Quiz";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    } else {
        showScore();
    }
}


nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();