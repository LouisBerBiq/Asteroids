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

ship.init(canvas, canvasContext2D);

const AsteroidSize = 20;

function drawAsteroid() {
	canvasContext2D.save();
	canvasContext2D.translate(50, 50);
	canvasContext2D.strokeRect(50, 50, AsteroidSize, AsteroidSize)
	canvasContext2D.stroke();
	canvasContext2D.restore();
}


function mainUpdate() {
	canvasContext2D.clearRect(0, 0, canvas.width, canvas.height)
	ship.update();
	
	window.requestAnimationFrame(mainUpdate);
}

mainUpdate();