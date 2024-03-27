let boxes=document.querySelectorAll(".box");
let win_msg=document.querySelector(".win_msg");
let msg=document.querySelector("#msg");
let newGamebtn=document.querySelector(".new_game")
let resetBtn=document.querySelector("#reset");

let turnX=true; // Player 1 will play X and Player 2 will play O
let count=0;

let player1=prompt("Enter player 1's name:");
let player2=prompt("Enter player 2's name:");

// To store the winning patterns, we will use a 2D array
const winPatterns=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

// We need to make the X or O visible on the box as they are clicked, hence for each box, we add a event listener using forEach loop
boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(turnX){  // player 1's turn
            box.innerText="X";
            box.style.color="red";
            turnX=false;
        }
        else{  // player 2's turn
            box.innerText="O";
            box.style.color="pink";
            turnX=true;
        }
        box.disabled="true";  // after clicking a box, it should no longer be clickable
        box.style.cursor="auto";
        count++;

        let isWinner=checkWinner(); // It will check if there is any winner
        if(count===9 && !isWinner){
            gameDraw();
        }
    });
});

// Function to disable all boxes after there is a winner
const disable_boxes=()=>{
    for(let box of boxes){
        box.disabled=true;
        box.style.cursor="auto"
    }
}

// Function to enable all boxes after new game button is clicked
const enable_boxes=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText=""; // removing all X and O
        box.style.cursor="pointer";
    }
}

// Function to reset a new game
const resetGame=()=>{
    turnX=true;
    count=0;
    enable_boxes();
    win_msg.classList.add("hide"); // hide the winning msg again after the new game button is clicked
    newGamebtn.classList.add("hide"); // hide the new game button again
    // player1=prompt("Enter player 1's name:"); // After new game button is clicked, the players have to enter their names again
    // player2=prompt("Enter player 2's name:");
};

// Function to display the winner
const showWinner=(winner)=>{
    msg.innerText=`Congratulations, winner is ${winner}`;
    win_msg.classList.remove("hide"); // the class hide is removed so that the winning msg can be displayed on screen
    newGamebtn.classList.remove("hide"); // the new game button will be displayed
    disable_boxes(); // all boxes will be disabled
};

// If no player is winner
const gameDraw=()=>{
    msg.innerText="The game is drawn";
    win_msg.classList.remove("hide"); 
    newGamebtn.classList.remove("hide");
    disable_boxes();
};

// Function to check winner
const checkWinner=()=>{
    for(let pattern of winPatterns){  // we are traversing the boxes to look for winning patter
        let pos1=boxes[pattern[0]].innerText;  // the 0th index of a box
        let pos2=boxes[pattern[1]].innerText;  // the 1st index of a box
        let pos3=boxes[pattern[2]].innerText;  // the 2nd index of a box

        if(pos1!="" && pos2!="" && pos3!=""){  // if the boxes aren't empty only then winner will be checked
            if(pos1===pos2 && pos2===pos3){  // condition for winning
                if(pos1==="X"){
                    showWinner(player1); // Winner is displayed
                }
                else{
                    showWinner(player2);
                }
                playSound("winTune.wav");  // Winning tune is played
                return true;
            }
        }
    }
    
};

// Function to play winning sound for winner
const playSound = (audioName) => {
    let audio = new Audio(audioName);
    audio.play();
};

// new game btn will work after clicking
resetBtn.addEventListener("click",resetGame);