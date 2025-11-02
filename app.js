  const firebaseConfig = {
    apiKey: "AIzaSyDgb2QA6y6hnbFLc8itPVWIEnvVu9GUocY",
    authDomain: "quiz-app-7ad12.firebaseapp.com",
    projectId: "quiz-app-7ad12",
    storageBucket: "quiz-app-7ad12.firebasestorage.app",
    messagingSenderId: "521340571055",
    appId: "1:521340571055:web:893110ac7959a41155335a",
    measurementId: "G-61J23V3VSX"
  };

  // Initialize Firebase
var app = firebase.initializeApp(firebaseConfig);
var db = firebase.database();

console.log(app);



var questions  = [
  {
    question: "Which of the following is used to define a block of code in JavaScript?",
    option1: "Curly braces {}",
    option2: "Square brackets []",
    option3: "Parentheses ()",
    corrAnswer: "Curly braces {}"
  },
  {
    question: "Which method adds one or more elements to the end of an array?",
    option1: "push()",
    option2: "pop()",
    option3: "shift()",
    corrAnswer: "push()"
  },
  {
    question: "What does DOM stand for?",
    option1: "Document Object Model",
    option2: "Data Object Management",
    option3: "Digital Ordinance Model",
    corrAnswer: "Document Object Model"
  },
  {
    question: "Which operator is used to compare both value and type?",
    option1: "==",
    option2: "===",
    option3: "=",
    corrAnswer: "==="
  },
  {
    question: "Which method is used to remove the last element of an array?",
    option1: "pop()",
    option2: "slice()",
    option3: "splice()",
    corrAnswer: "pop()"
  },
  {
    question: "Which of the following is a looping structure in JavaScript?",
    option1: "if-else",
    option2: "for",
    option3: "switch",
    corrAnswer: "for"
  },
  {
    question: "Which function is used to parse an integer from a string?",
    option1: "parseInt()",
    option2: "parseFloat()",
    option3: "Number()",
    corrAnswer: "parseInt()"
  },
  {
    question: "Which event occurs when a user clicks on an HTML element?",
    option1: "onchange",
    option2: "onclick",
    option3: "onmousehover",
    corrAnswer: "onclick"
  },
  {
    question: "Which built-in method returns the length of a string?",
    option1: "len",
    option2: "length",
    option3: "size",
    corrAnswer: "length"
  },
  {
    question: "Which symbol is used to make comments in JavaScript?",
    option1: "//",
    option2: "/* */",
    option3: "<!-- -->",
    corrAnswer: "//"
  }
];




var quesElement = document.getElementById("ques");
var option1 = document.getElementById("opt1");
var option2 = document.getElementById("opt2");
var option3 = document.getElementById("opt3");
var index = 0;
var nextBtn = document.getElementById("btn");
var score = 0;
var min = 1;
var sec = 59;


function timer() {
  var pElement = document.getElementById("time");

  pElement.innerHTML = min + ":" + sec;
  sec--;
  if (sec < 0) {
    min--;
    sec = 59;
    if (min < 0) {
      min = 1;
      sec = 59;
      nextQuestion();
    }
  }
}


setInterval(timer, 100);

function nextQuestion() {
  var allInputs = document.getElementsByTagName("input");

  for (var i = 0; i < allInputs.length; i++) {
    if (allInputs[i].checked) {
      allInputs[i].checked = false;
      var userSelectedValue = allInputs[i].value;

      var selectedOption = questions[index - 1]["option" + userSelectedValue];
     
      

      var correctAnswer = questions[index - 1]["corrAnswer"];

   

      

      if (correctAnswer === selectedOption) {
        score++;
        
      }
    }
    nextBtn.disabled = true;
     min = 1;
     sec = 59;

  }

if (index > questions.length - 1) {
  var percentage = ((score / questions.length) * 100).toFixed(2);

  var grade = "";
  if (percentage >= 90 && percentage <= 100) {
    grade = "Excellent ";
  } else if (percentage >= 80) {
    grade = " vary Good ";
  } else if (percentage >= 70) {
    grade = "Good ";
  } else if (percentage >= 60) {
    grade = "Fair ";
  } else {
    grade = "Try Again ";
  }

  Swal.fire({
    title: "Quiz Finished!",
    html: `
      <b>Result:</b> ${percentage}%<br>
      <b>Grade:</b> ${grade}
    `,
    icon: "success",
    confirmButtonText: "Restart Quiz"

  }).then(() => {
    
    resetQuiz();
  });
}

   else {
    quesElement.innerText = "Q"+ [index +1] + ": "+questions[index].question;
    option1.innerText = questions[index].option1;
    option2.innerText = questions[index].option2;
    option3.innerText = questions[index].option3;
    index++;

    
  }


   var obj ={
    question:questions[index -2].question,
    selectedOption:selectedOption,
    correctAnswer:correctAnswer,
    score:score,
   }
   console.log(obj);

   firebase.database().ref("userResponse").push(obj)
   .then(function(response){
    console.log(response);
   })

   .catch(function(error){
    console.log(error);
    
   })
   
   
}
function resetQuiz() {
  index = 0;
  score = 0;
  userResponses = [];
  min = 1;
  sec = 59;

  nextBtn.disabled = true; 
  nextQuestion();           

}
nextQuestion();

function trigger() {
  nextBtn.disabled = false;
}