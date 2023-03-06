'use strict';


//buttons
const roll=document.querySelector('.btn--roll');
const hold=document.querySelector('.btn--hold');
const newGame=document.querySelector('.btn--new');

//scores at screen
const player0Score=document.getElementById('score--0');
const player1Score=document.getElementById('score--1');
const curr0Score=document.getElementById('current--0');
const curr1Score=document.getElementById('current--1');

const dice=document.querySelector('.dice');
const player0=document.querySelector('.player--0');
const player1=document.querySelector('.player--1');



let scores,playing,activePlayer,currScore;

//refresh the game/new game
const init=function(){
    scores=[0,0];
    activePlayer=0;
    playing=true;
    currScore=0;

    //display all scores as 0
    player0Score.textContent=0;
    player1Score.textContent=0;
    curr0Score.textContent=0;
    curr1Score.textContent=0;

    //hide the dice
    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
};
init();

//switch player
const switchPlayer=function(){
    document.getElementById(`current--${activePlayer}`).textContent=0;
    currScore=0;
    activePlayer = activePlayer === 0 ? 1 : 0;

    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};

//roll the dice
roll.addEventListener("click",function(){

    if(playing){

        //Generate random dice
        let num=Math.floor(Math.random()*10)%6+1;
        console.log(num);
        //Display dice image
        dice.classList.remove('hidden');
        dice.src=`dice-${num}.png`;

        if(num!==1){
            currScore+=num;
            document.getElementById(`current--${activePlayer}`).textContent=currScore;
        }else{
            switchPlayer();
        }
    }
});

//hold the game
hold.addEventListener("click",function(){

    if(playing){
        scores[activePlayer]+=currScore;
        document.getElementById(`score--${activePlayer}`).textContent=scores[activePlayer];

        if(scores[activePlayer]>=100){
            playing=false;
            dice.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
            document.querySelector(`.player--${activePlayer}`).classList.add("player--active");
        }else{
            switchPlayer();
        }
    }
});


newGame.addEventListener('click',init);