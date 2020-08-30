/*********************************** Variables *******************************************/
var scores = 0;         //Based on the total number of right Answer  10 ptos for 1 right answer
var timer = 45          // 120 seconds, 8 questions x 15 seconds = 120
var interval;
var index = 0;          // access to the array of questions
var highOption;     
var saveHighScore = [];
var saveHighScoreObj;
var containerBtn = document.querySelector(".textAction");
var container = document.querySelector(".container");
var textQuestion = document.querySelector(".textCenter")
var answer = document.querySelector(".answer");
var remainTime = document.querySelector(".timer");
var linkScore = document.querySelector(".a-score");


var firstColor = "#252eda";
var textCnt = "left";
var secondColor = "#ffffff";
var thirdColor = "#8f7f7f"



initialContent();

// Questions taken from test modules and the mock up examples. 8 questions in total

var questions = [
    //Question #1
    {
        q : "True or False: DOM is built into a Javascript language",
        a : "True",
        b : "False",
        C : "None of Above",
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
        q : "String values must be enclosed within ___________ when being assigned to variables",
        a : "Coma",
        b : "Curly Brackets",
        c : "Parenthesis",
        answer: "B"
    },

    //Question #5
    {
        q : "The condition in an if / else statement is enclosed with _____________",
        a : "Curly Brackets",
        b : "Quotes",
        c : "Square Brackets",
        answer: "A"
    },

    //Question #6
    {
        q : "A very useful tools used during development and debbuging for printing content to the debugger is __________",
        a : "Javascript",
        b : "Termanl/Bash",
        c : "for loops",
        answer: "C"
    },

    //Question #7
    {
        q : "Commonly used data type Do NOT include: ",
        a : "Strings",
        b : "Booleans",
        c : "alerts",
        answer: "B"
    },

    //Question #8
    {
        q : "What does event.preventDefault() do?",
        a : "It stops the browser from allowing the page upon a form submission",
        b : "It stops the browser from reloading the form submission event to occur",
        c : "All of them",
        answer: "B"
    }

];

/*****************************************************************************************/

/*********************************** Functions *******************************************/

// Creating button for the answer of question
function creatButton (id, txt){
    var button = document.createElement("button");
    button.setAttribute("id", id);
    button.textContent =txt;
    button.style.background = firstColor;
    button.style.color = secondColor;
    button.style.borderRadius = "10px"
    containerBtn.appendChild(button);
}

// creating a button for the first time in container Div class name textAction
function initialContent()
{
   //creating the "Start Button" id value id = start, and content text 
   creatButton("start", "Start Quiz");

   //setting highOption as a flag
   highOption = 0;

   

}

//checking function for timer variables whether it reach 0 seconds
var checkingTimer = function(){
    var eval = false;
    if(timer <= 0){
        timer = 0;
        eval = true
    }
    return eval;
};

// checking answer and calling for the next question
var checkAnswer = function(str, x){

    // if index is less than question lenght then calling the showQuestion() for the next question 
    if(x < questions.length)
    {
        var showAnswer = "";

        if (str === questions[x].answer){
            if(!checkingTimer()){
                showAnswer = "Correct!"; 
                scores+=10;
            }
        }
        else{
                if(!checkingTimer()){
                    timer-=10; // subtract 10 seconds for the timer                    
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
        //deleteChildNode(answer);
        answer.textContent = "";

        // call initial function ending quiz when the timer reaches 0 seconds
        showInitialsScore();
    }
    
};

//Function to show the information of the questions and possible answers
var showQuestion = function(x) {
   
   if(x < questions.length)
   {
       textQuestion.textContent = questions[x].q;

        //creating the ordered list for the options
        var listUnOrdered = document.createElement("ul");
        listUnOrdered.setAttribute("id", "question-id");
        var op1 = document.createElement("li");
        var op2 = document.createElement("li");
        var op3 = document.createElement("li");

        //Styling the answer in each cuestion
        listUnOrdered.style.color = secondColor;
        listUnOrdered.style.justifyContent = "space-between";
        listUnOrdered.style.listStyle = "none";
        op1.style.background =  firstColor;
        op1.style.justifyContent = textCnt;
        op1.style.borderRadius = "10px";
        op2.style.background =  firstColor;
        op2.style.justifyContent = textCnt;
        op2.style.borderRadius = "10px";
        op3.style.background =  firstColor;
        op3.style.justifyContent = textCnt;
        op3.style.borderRadius = "10px";

        
        op1.innerHTML = "<a href='#' onclick=checkAnswer('A'," + x + 
        ") style = 'text-decoration: none; color: #ffffff; '><div style = 'text-align: left;'>1. " 
        + questions[x].a + "</div></a>";

        op2.innerHTML = "<a href='#' onclick=checkAnswer('B'," + x + 
        ") style = 'text-decoration: none; color: #ffffff; '><div style = 'text-align: left;'>2. " 
        + questions[x].b + "</div></a>";

        op3.innerHTML = "<a href='#' onclick=checkAnswer('C'," + x + 
        ") style = 'text-decoration: none; color: #ffffff; '><div style = 'text-align: left;'>3. " 
        + questions[x].c + "</div></a>";
        
        listUnOrdered.appendChild(op1);
        listUnOrdered.appendChild(op2);
        listUnOrdered.appendChild(op3);
        container.appendChild(listUnOrdered);

        //eliminating the inicial button and other possible buttons
        var button = document.querySelector("#start");
        deleteChildNode(button);
        deleteChildNode(document.querySelector("#go-back"));
        deleteChildNode(document.querySelector("#clear"));

        // increasing and returning to store it in index variable
        x++;
   }
   else{
       //this case is when you reach all question before the time is over
       showInitialsScore();
   }
    return x;
};

// function to delete element from de DOM to present a new and clean view
var deleteChildNode = function(elementNode){

    //checking if selected element exits
    if(elementNode){
        elementNode.parentNode.removeChild(elementNode);
    }
};

//showing a message 
var displayErrorMessage = function(msg){
    alert(msg);
};

// Function to retrieve values from key save in localStore 
var gettingArrayLocalStore = function(){
    var user = [];
    user = JSON.parse(localStorage.getItem("userScore"));
    return user;
};

//clear localStore
var clearLocalStore = function(){
    localStorage.clear();
};

// retrieving the High scores
var retrieveHighScore = function(){

    // getting the scores saved
    saveHighScore = gettingArrayLocalStore();
    timer = 0;

    // showing the information in the HTML
    //message for the submit form
    textQuestion.textContent = "High Scores";
    remainTime.textContent ="";
    linkScore.textContent = "";
    answer.textContent ="";

        //there are two option in order to call retrieveHighScore() method
        //1. if it was clicked on link "view High Score" in the "A" tag top-left of the screen
        //2. when it was submitted at the end of the quiz. 
        //highOption variable is set 0 

        if(!highOption){
            container.textContent = "";
            deleteChildNode(document.querySelector("#start"));
        }
        else{
            //eliminating nodeElements from class container before create in high score HTML in showInitialScore()
            deleteChildNode(document.querySelector(".p-store"));
            deleteChildNode(document.querySelector(".form-store"));
            deleteChildNode(document.querySelector("#score-id"));
        }
    
    //cheking if there is some key stored in localStore
    
    if(saveHighScore != null)
    {   
        //creating HTML element
        console.log(saveHighScore.length);
        var listUnOrdered = document.createElement("ul");
        //setting style
        listUnOrdered.style.background = secondColor;
        listUnOrdered.style,justifyContent = "space-between";
        listUnOrdered.style.listStyle = "none";

        // iterating through the array of values in localStore
        for(var i=0; i< saveHighScore.length; i++){
            var li = document.createElement("li");
            li.innerHTML = "<div style = 'text-align: left;'>" + (i+1) + ". " + 
                            JSON.stringify(saveHighScore[i].user) + " - " + JSON.stringify(saveHighScore[i].score) + 
                            "</div>";
            li.style.textAlign = textCnt;
            li.style.background = thirdColor;
            li.style.borderBottom = "10px";
            listUnOrdered.appendChild(li);
        }

        container.appendChild(listUnOrdered);

    }

    // creating button for "Go Back" and "Clear Local Store"
    creatButton("go-back", "Go Back"); 
    creatButton("clear", "Clear High Scores");
    var btn1 = document.querySelector("#go-back");
    var btn2 = document.querySelector("#clear");
    btn1.addEventListener("click", function() {
        location.reload();                                  // reload index.html
    });
    btn2.addEventListener("click", function() {
        clearLocalStore();                                  // clear from storage all key stored
    });

    deleteChildNode(document.querySelector("#question-id"));
};

//listener to Save and store data inicials
var saveScore = function(){

    event.preventDefault();

    //getting the input value
    var input = document.querySelector("#initials").value;

    //validating if the user enter at list a value
    if (input === "") {
        displayErrorMessage("You must bring your Initials for your Score");
    } else {
        displayErrorMessage( "Registered Your Score Successful");

        saveHighScore = gettingArrayLocalStore();

        //checking if the array is empty
        if(saveHighScore == null)
        {
            saveHighScore = [];
        }

        // Assigning input and score values to an object
        saveHighScoreObj ={
                user: input,
                score: scores
            };

        saveHighScore.push(saveHighScoreObj);

        //Saving data in localStore
        localStorage.setItem("userScore",JSON.stringify(saveHighScore));
        retrieveHighScore();
    }
};

// function to show the form when the game is over
var showInitialsScore = function () {

    //message for the submit form
    textQuestion.textContent = "All done!";
    remainTime.textContent = "Time left :"+ timer;
    answer.textContent = "";

    var msg = document.createElement("p");
    msg.setAttribute("id", "score-id");

    //note: Based on the total number of right Answer  10 ptos for 1 right answer
    msg.textContent = "Your final Score is: " + scores + " out of "+ (questions.length * 10);

    var span = document.createElement("span");
    span.setAttribute("id", "form-id");
    span.style.display = "flex";                    //
    span.style.flexWrap = "wrap";                   //  Tested and debugged with DevTool in Chrome
    span.style.justifyContent = "center";           //
    span.style.flex = "flex-wrap";
    span.innerHTML = "<p class='p-store' style ='text-align:left'> Enter Initials: </p>" +
                        "<form class='form-store' style='padding:12px'><input type='text' name='initials placeholder='Enter initials' id='initials'/>"+
                        "<button id='save' type='submit' onclick='saveScore()' style = 'background:" + firstColor + 
                        "; color:" + secondColor +"; border-radius:10px'>Submit</button></form>";
                                            // IMPORTANT 
                                            //in the form button I added onclick attribute instead adding listener
    

    // adding to container
    container.appendChild(msg);
    container.appendChild(span);
};

//setting the remaining time for the quiz
var clockTime = function () {
    
    if(checkingTimer()){
        clearInterval(interval);

        // call deletechilnode for cleaning purposes
        var elementNode = document.querySelector("#question-id");
        if(elementNode != null && answer != null){
            deleteChildNode(elementNode);
            //deleteChildNode(answer);
            answer.textContent ="";

        // call initial function ending quiz when the timer reaches 0 seconds
        showInitialsScore();
        }
    }else{
            if(index < questions.length){
                // calling questions array
                timer--;
                remainTime.textContent = "Time left :"+ timer;
            }
    }
};

// listener to handler the functionality whe the user clicked on button Start
var startHandler = function(){
    container.textContent = "";
    highOption = 1; //when the quiz starts
    
    // Setting the interval... calling the function
    interval = setInterval(clockTime,1000);

    // call function for questions
    index = showQuestion(index);
    
};

/*****************************************************************************************/

/*********************************** Execution *******************************************/

var button = document.querySelector("#start");
button.addEventListener("click", startHandler);
linkScore.addEventListener("click", retrieveHighScore);

/*****************************************************************************************/