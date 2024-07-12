const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scorecard = document.querySelector('.scorecard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');


//Make an array of objects that stores, questions and answers
const quiz = [
    {
        question:"What is the Capital of Manipur?",
        choices:["Imphal" , "Itanagar" , "Aizwal" , "Shillong"],
        answer:"Imphal"
    },
 
    {
        question:"Who is the Prime Minister of India?",
        choices:["Sonia Gandhi" , "Manmohan Singh" , "Rajnath Singh " , "Narendra Modi"],
        answer:"Narendra Modi"
    },

    {
        question:" Which planet is known as the Red Planet?",
        choices:["Venus" , "Mars" , "Jupiter" , "Saturn"],
        answer:"Mars"
    },

    {
        question:"Who wrote the play 'Romeo and Juliet'?",
        choices:["William Shakespeare " , "Charles Dickens" , "Jane Austen" , "J.K.Rowling"],
        answer:"William Shakespeare"
    },

    {
        question:"How many continents are there in the world?",
        choices:["5" , "6" , "7" , "8"],
        answer:"7"
    },
    
    
];


//making variables 
let currentQuestionIndex=0;
let score=0;
let quizOver= false;
let timeLeft = 15;
let TimerId = null;

//Arrow function to show questions
const showQuestions=()=>{
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent= questionDetails.question;
    choicesBox.textContent="";
    for(let i=0;i<questionDetails.choices.length; i++){
        const currentChoice = questionDetails.choices[i];
        const choiceDiv=document.createElement('div');
        choiceDiv.textContent= currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click',()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected');
            }
            else{
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex<quiz.length){
        startTimer();
    }
}

// function to check answers
const checkAnswer=()=>{
    const selectedChoice= document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[currentQuestionIndex].answer){
       displayAlert("correct answer");
        score++;
    }
    else{
        displayAlert("Wrong answer."  +quiz[currentQuestionIndex].answer +" " +"is the Correct Answer." );
    }
    timeLeft = 15;
   currentQuestionIndex++;
    if(currentQuestionIndex<quiz.length){
         
         showQuestions();
    }
    else{
        showScore();
        stopTimer();
        
       
    }
}


// Function to show score
const showScore=()=>{
    questionBox.textContent="";
    choicesBox.textContent="";
    scorecard.textContent="You Score" +score  +"out of"   +quiz.length;
    displayAlert("You have completed the Quiz.")
    nextBtn.textContent="Play Again!";
    quizOver = true;
    timer.style.display="none";
    
}


//Function to show Alert
const displayAlert=(msg)=>{
    
     alert.style.display ="block";
     alert.textContent=msg;
     setTimeout(()=>{
        alert.style.display="none";
     }, 2000);
}


//Function to start timer
const startTimer=()=>{
    clearInterval(TimerId); //check for any exist timer.
    timer.textContent = timeLeft;
    
    const countDown = ()=>{
    timeLeft--;
    timer.textContent = timeLeft;
    if(timeLeft===0){
       const confirmUser = confirm("Time Up!! Do you want to play the quiz again?");
       if(confirmUser){
        timeLeft =15;
        startQuiz();
     
       }
       else{
        startBtn.style.display="block";
        container.style.display="none";
        return;
       }
    }
    }
     TimerId = setInterval(countDown,1000);
}

const startQuiz =()=>{
    currentQuestionIndex=0;
    score=0;
    quizOver =false;
    timeLeft =15;
    timer.style.display ="flex";
    showQuestions();
}

startBtn.addEventListener('click',()=>{
    startBtn.style.display="none";
    container.style.display="block";
    startQuiz();
});





nextBtn.addEventListener('click',()=>{
    if(quizOver){
        startQuiz();
    }
    else{
        const selectedChoice = document.querySelector('.choice.selected');
        if(!selectedChoice){
            displayAlert("Select Your Answer");
            return;
        }
        checkAnswer();
    }
    
    
    
});





//function to stop time
const stopTimer = ()=>{
   clearInterval (TimerId);
}