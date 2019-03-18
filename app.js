/*
	author: edoroskevic
	date: 21/06/2018
	description: a besic 'guess the number' app using skeletoncss and plain javascript. the aim of this project
				 is to demonstrate basic DOM manipulation, function creation and event handling. the user is 
				 presented with an input field where s/he has to enter a number between min and max. The user is
				 given an arbitrary number of lives. If user does guess the number, the app displays appropriate
				 message notifying the user. otherwise, the user is notified what is the correct answer, and the user
				 is offered to restart the game.
	license: MIT 
*/

let color;
let message;

let min = 0;
let max = 10;

let lives = 3;
let secret = Math.floor(Math.random() * (max - min + 1) + min);

const game = document.querySelector('#game');
const smin = document.querySelector('#min');
const smax = document.querySelector('#max');
const play = document.querySelector('#submit'); 
const answ = document.querySelector('#answer');
const prmt = document.querySelector('#prompt');

smin.textContent = min;
smax.textContent = max;

function setMessage(text, color){
	prmt.style.color = color;
	prmt.textContent = text;	
}

function setInputField(status, color){
	answ.disabled = status;
	answ.style.borderColor = color;
}

function chkUserLives(){
	if(lives === 0){
		color = 'red';
		message = `game over... the correct answer was ${secret}...`;

		setMessage(message, color);
		setInputField(false, color);	

		restart();
	}
}

function restart(){
	play.value = 'play again';
	play.className = 'play-again';
}

function chkUserInput(guess){
	if(guess === secret){
		color = 'green';
		message = 'victory... you won!';

		setMessage(message, color);
		setInputField(true, color);	
		
		restart();
	}
	else if(guess >= min && guess <= max){
		lives -= 1;
		color = 'red';
		message = `try again.. you have ${lives} more lives available`;
		
		setMessage(message, color);
		setInputField(false, color);
	}
	else{
		color = 'red';
		message = 'check your input...';
	
		setMessage(message, color);
	}
}


game.addEventListener('mousedown', event => {
	let target = event.target;
	
	if( target.classList.contains('play-again') ){
		window.location.reload();
	}
});

play.addEventListener('click', event => {
		let guess = parseInt(answ.value);
		
		chkUserInput(guess);	
		chkUserLives();		
	}
);
