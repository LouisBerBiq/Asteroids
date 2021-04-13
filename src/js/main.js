// @ts-check
import ship from "./ship.js";
import Asteroid from "./asteroid.js";

const main = {
	NoJsMessageElt: null,
	canvasElt: null,
	canvasEltDimensions: { // reason: to prevent recalling this.canvasElt.width whole object everytime
		width: 640,
		height: 480,
	},
	canvasEltContext2D: null,

	asteroids: [],
	asteroidsCount: 0,
	init() {
		this.NoJsMessageElt = document.querySelector('#no-js');
		document.body.removeChild(this.NoJsMessageElt);

		this.canvasElt = document.createElement('canvas');
		document.body.insertAdjacentElement("afterbegin", this.canvasElt);
		this.canvasElt.width = this.canvasEltDimensions.width;
		this.canvasElt.height = this.canvasEltDimensions.height;


		// TODO?: check if browser supports canvas in the first place
		this.canvasEltContext2D = this.canvasElt.getContext('2d');
		this.canvasEltContext2D.strokeStyle = '#FFF';

		for (let i = 0; i < 4; i++) {
			this.asteroidsCount++;
			this.asteroids.push(new Asteroid(this.canvasEltContext2D, this.canvasElt));
		}
		ship.init(this.canvasElt, this.canvasEltContext2D);
		this.update();
	},
	update() {
		this.canvasEltContext2D.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height)
		ship.update();

		this.asteroids.forEach((asteroid) => {
			asteroid.update();
		});

		window.requestAnimationFrame(() => {
			this.update(); // I think I still don't understand how arrow func work
		});
	},
};
main.init();

const AsteroidSize = 20;

// function drawAsteroid() {
// 	canvasEltContext2D.save();
// 	canvasEltContext2D.translate(50, 50);
// 	canvasEltContext2D.strokeRect(50, 50, AsteroidSize, AsteroidSize)
// 	canvasEltContext2D.stroke();
// 	canvasEltContext2D.restore();
// }
