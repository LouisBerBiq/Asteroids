import ship from "./ship.js";

const NoJsMessage = document.querySelector('#no-js');
document.body.removeChild(NoJsMessage);

const canvas = document.createElement('canvas');
document.body.insertAdjacentElement("afterbegin", canvas);

canvas.width = 640;
canvas.height = 480;

// TODO?: check if browser supports canvas in the first place
const canvasContext2D = canvas.getContext('2d');
canvasContext2D.strokeStyle = '#FFF';

const shipSize = 20;
const AsteroidSize = 20;
const shipSpeed = 1;
let shipPosition = {
	x: canvas.width / 2,
	y: canvas.height / 2
}

function shipUpdate() {
	shipPosition.x += shipSpeed;
	if (shipPosition.x > canvas.width) {
		
	}
	drawSpaceship();
}

function drawSpaceship() {
	// 30px high / 20px wide
	canvasContext2D.save();
	canvasContext2D.translate(shipPosition.x, shipPosition.y);
	canvasContext2D.beginPath();
	canvasContext2D.moveTo(0, -1.5 * (shipSize / 2));
	canvasContext2D.lineTo(shipSize / 2, 1.5 * (shipSize / 2));
	canvasContext2D.lineTo(-shipSize / 2, 1.5 * (shipSize / 2));
	canvasContext2D.closePath();
	canvasContext2D.stroke();
	canvasContext2D.restore();
}

function drawAsteroid() {
	canvasContext2D.save();
	canvasContext2D.translate(50, 50);
	canvasContext2D.strokeRect(50, 50, AsteroidSize, AsteroidSize)
	canvasContext2D.stroke();
	canvasContext2D.restore();
}


function update() {
	canvasContext2D.clearRect(0, 0, canvas.width, canvas.height)
	shipUpdate();
	
	window.requestAnimationFrame(update);
}

update();