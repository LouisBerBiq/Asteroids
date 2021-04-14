// @ts-check
import garbageManager from './garbageManager.js';
import ship from "./ship.js";
import Asteroid from "./asteroid.js";
import collisionDetector from "./collisionDetector.js";

const main = {
	NoJsMessageElt: null,
	canvasElt: null,
	canvasEltDimensions: { // reason: to prevent recalling this.canvasElt.width whole object everytime
		width: 640,
		height: 480,
	},
	canvasEltContext2D: null,
	requestId: 0,

	asteroids: [],

	// difficulty settings
	asteroidsCount: 4,
	asteroidSizeBeforeFullDestruction: 4,
	totalNumberOfAsteroids: 8,
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

		ship.init(this.canvasElt, this.canvasEltContext2D);
		this.update();
	},
	decomposeAsteroid(parentAsteroid) {
		const childrenToSpawn = Math.floor(2 + Math.random() * 4);
		for (let i = 0; i < childrenToSpawn; i++) {
			this.asteroids.push(new Asteroid(this.canvasEltContext2D, this.canvasElt, parentAsteroid, childrenToSpawn))
		}
	},
	update() {
		this.requestId = window.requestAnimationFrame(() => {
			this.update() // I think I still don't understand how arrow func work
		});

		this.canvasEltContext2D.clearRect(0, 0, this.canvasElt.width, this.canvasElt.height)
		ship.update();
		
		let i = this.asteroids.length
		while (i < this.asteroidsCount) {
			this.asteroids.push(new Asteroid(this.canvasEltContext2D, this.canvasElt));
			i++
		}
		this.asteroids.forEach((asteroid) => {
			asteroid.update();
		});
		if (ship && this.asteroids.length) {
			if (collisionDetector.detectShipAsteroid(this.canvasEltContext2D, ship, this.asteroids)) {
				window.cancelAnimationFrame(this.requestId)
			}
		}
		if (ship.bullets.length) {
			const colliders = collisionDetector.detectBulletAsteroid(this.canvasEltContext2D, ship, this.asteroids);
			if (colliders) {
				if (colliders.asteroid.scale > this.asteroidSizeBeforeFullDestruction) {
					garbageManager.discard(colliders.bullet, ship.bullets);
					this.decomposeAsteroid(colliders.asteroid);
					garbageManager.discard(colliders.asteroid, this.asteroids);
				} else {
					garbageManager.discard(colliders.asteroid, this.asteroids);
				}
			}
		}
	}
}
main.init();