/*********************************** Variables *******************************************/
var scores = 0;
var timer = 45 // 120 seconds, 8 questions x 15 seconds = 120
var interval;
var index = 0;   // access to the array of questions
var saveHighScore = [];
var containerBtn = document.querySelector(".textAction");
var container = document.querySelector(".container");
var textQuestion = document.querySelector(".textCenter")
var answer = document.querySelector(".answer");
var remainTime = document.querySelector(".timer");


var firstColor = "#252eda";
var textCnt = "left";
var secondColor = "#ffffff";



initialContent();

var questions = [
    //Question #1
    {
        q : "True or False: DOM is built into a Javascript language",
        a : "True",
        b : "False",
        C : "ZZZZ",
        answer: "A"
    },

    //Question #2
    {
        q : "The Browser event submit allows us to do the Following ",
        a : "Submit a form using a button",
        b : "Submit a form using the Enter key",
        c : "Submit a form using a button and the Enter key",
        answer: "C"
    },

    //Question #3
    {
        q : "How do we use JavaScript to get the information entered into a form's input field",
        a : "We Can select the form's imput element and use the value property to read its data",
        b : "We Can select the form itself and use the value property to read all of its data",
        c : "We Can select the form's imput element and use the textcontent or innerHTML property to read its data",
        answer: "A"
    },

    //Question #4
    {
        q : "True or False: DOM is built into a Javascript language",
        a : "True",
        b : "False",
        answer: "A"
    },

    //Question #5
    {
        q : "True or False: DOM is built into a Javascript language",
        a : "True",
        b : "False",
        answer: "B"
    },

    //Question #6
    {
        q : "True or False: DOM is built into a Javascript language",
        a : "True",
        b : "False",
        answer: "C"
    },

    //Question #7
    {
        q : "True or False: DOM is built into a Javascript language",
        a : "True",
        b : "False",
        answer: "C"
    },

    //Question #8
    {
        q : "True or False: DOM is built into a Javascript language",
        a : "True",
        b : "False",
        answer: "A"
    }

];

/*****************************************************************************************/

/*********************************** Functions *******************************************/

// Creating button for the answer of question
function creatButton (){
    var button = document.createElement("button");
    button.setAttribute("id", "start");
    button.textContent ="Start Quiz";
    containerBtn.appendChild(button);
}

// creating a button for the first time in container Div class name textAction
function initialContent()
{
   creatButton();
}

// checking answer and calling for the next question
var checkAnswer = function(str, x){

    // if index is less than question lenght then calling the showQuestion for the next question 
    if(index < questions.length)
    {
        var showAnswer ="";

        if (str === questions[x].answer){
            scores = timer;  // store the time value as a score in the scores variable
            showAnswer = "Correct!";    
        }
        else{
            if(timer<0){
               timer = 0;
            }
            else{
                timer-=10; // subtract 10 seconds for the timer

                /* this code it was left due to test the timer vs wrong answers
                console.log("I'm in checkAnswer(); Timer: "+ timer); */
            }          
            showAnswer = "Wrong!";
        }

        //eliminating the precedent question
        var elementNode = document.querySelector("#question-id");
        deleteChildNode(elementNode);

    
        index = showQuestion(index);
        answer.textContent = showAnswer;
    }
    else{

        // call deletechilnode
        var elementNode = document.querySelector("#question-id");
        deleteChildNode(elementNode);
        
        deleteChildNode(answer);

        // call the function scoring 
    }
    
};

var showQuestion = function(x) {
   /*  console.log(x); */
    textQuestion.textContent = questions[x].q;

    //creating the ordered list for the options
    var listUnOrdered = document.createElement("ul");
    listUnOrdered.setAttribute("id", "question-id");
    var op1 = document.createElement("li");
    var op2 = document.createElement("li");
    var op3 = document.createElement("li");

    //listOrdered.style.background = firstColor;
    listUnOrdered.style.color = secondColor;
    listUnOrdered.style.justifyContent = "space-between";
    listUnOrdered.style.listStyle = "none";
    op1.style.background =  firstColor;
    op1.style.justifyContent = textCnt;
    op2.style.background =  firstColor;
    op2.style.justifyContent = textCnt;
    op3.style.background =  firstColor;
    op3.style.justifyContent = textCnt;

    
    op1.innerHTML = "<a href='#' onclick=checkAnswer('A'," + x + 
    ") style = 'text-decoration: none; color: #ffffff; '><div style = 'text-align: left;'>1. " 
    + questions[x].a + "</div></a>";

    op2.innerHTML = "<a href='#' onclick=checkAnswer('A'," + x + 
    ") style = 'text-decoration: none; color: #ffffff; '><div style = 'text-align: left;'>2. " 
     + questions[x].b + "</div></a>";

    op3.innerHTML = "<a href='#' onclick=checkAnswer('A'," + x + 
    ") style = 'text-decoration: none; color: #ffffff; '><div style = 'text-align: left;'>3. " 
     + questions[x].c + "</div></a>";
    
     listUnOrdered.appendChild(op1);
     listUnOrdered.appendChild(op2);
     listUnOrdered.appendChild(op3);
    container.appendChild(listUnOrdered);

    //eliminating the inicial button
    var button = document.querySelector("#start");
    deleteChildNode(button);

    // increasing and returning to store it in index variable
    x++;
    return x;
};

// function to delete element from de DOM to present a new and clean view
var deleteChildNode = function(elementNode){

    //checking if selected element exits
    if(elementNode){
        elementNode.parentNode.removeChild(elementNode);
    }
};

//listener to Save and store data inicials
var saveScore = function(){

    
}

// function to show the form when the game is over
var showInitialsScore = function () {
    //message for the submit form
    textQuestion.textContent = "All done!";
    remainTime.textContent = scores;

    var msg = document.createElement("p");
    msg.setAttribute("id", "score-id");
    msg.textContent = "Your final Score is: " + scores;

    var span = document.createElement("span");
    span.setAttribute("id", "form-id");
    span.style.display = "flex";
    span.style.flex = "flex-wrap";
    span.innerHTML = "<p style ='text-align:left'> Enter Initials: </p>" +
                        "<form ><input type='text' name='initials placeholder='Enter initials'/>"+
                        "<button id='save' type='submit'>Submit</button></form>";
    
    // adding to container
    container.appendChild(msg);
    container.appendChild(span);

    //adding listener for storing variables in localStore

    container.addEventListener("click", saveScore);
};

var clockTime = function () {
    
    if(timer === 0 || timer <  0){
        clearInterval(interval);

        // call deletechilnode for cleaning purposes
        var elementNode = document.querySelector("#question-id");
        deleteChildNode(elementNode);
        deleteChildNode(answer);
        // call initial function ending quiz

        showInitialsScore();


    }else{
        // calling questions array
        timer--;
        remainTime.textContent = "Time left :"+ timer;

        /* this code it was left due to test the timer vs wrong answers
         console.log("I'm in clockTime(); Timer: "+ timer) */
    }
};

// listener to handler the functionality whe the user clicked on button Start
var startHandler = function(){
   // alert("you have cliked in Start Button");
    container.textContent = "";
    
    // Setting the interval... calling the function
    interval = setInterval(clockTime,1000);

    // call function for questions
    index = showQuestion(index);
    
};


/*****************************************************************************************/

/*********************************** Execution *******************************************/

containerBtn.addEventListener("click", startHandler);