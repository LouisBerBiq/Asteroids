const NoJsMessage = document.querySelector('#no-js');
document.body.removeChild(NoJsMessage);

const canvas = document.createElement('canvas');
document.body.insertAdjacentElement("afterbegin", canvas);

canvas.width = 640;
canvas.height = 480;

// TODO?: check if browser supports canvas in the first place
const CanvasContext2D = canvas.getContext('2d');
CanvasContext2D.strokeStyle = '#FFF';

const shipSize = 20;

CanvasContext2D.translate(canvas.width / 2, canvas.height / 2)

// spaceship model
CanvasContext2D.beginPath();
CanvasContext2D.moveTo(0, -1.5 * (shipSize / 2));
CanvasContext2D.lineTo(shipSize / 2, 1.5 * (shipSize / 2));
CanvasContext2D.lineTo(-shipSize / 2, 1.5 * (shipSize / 2));
CanvasContext2D.closePath();

CanvasContext2D.stroke();

function update() {

	window.requestAnimationFrame((update()));
}