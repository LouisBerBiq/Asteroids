import garbageManager from './garbageManager.js';
const collisionDetector = {
	detectBulletAsteroid(canvasContext, ship, asteroids) {
		for (let i = 0; i < ship.bullets.length; i++) {
			for (let j = 0; j < asteroids.length; j++) {
				const bullet = ship.bullets[i];
				const asteroid = asteroids[j];
				if (canvasContext.isPointInPath(asteroid.path, 
					bullet.position.x - asteroid.position.x, 
					bullet.position.y - asteroid.position.y)) {
						return {
							bullet: ship.bullets[i],
							asteroid: asteroids[j]
						}
				}
			}
		}
		return false
	},
	detectShipAsteroid(canvasContext, ship, asteroids) {
		for (let j = 0; j < asteroids.length; j++) {
				const asteroid = asteroids[j];
				for (let i = 0; i < ship.shape.length; i+=2) {
					if (canvasContext.isPointInPath(asteroid.path, 
						ship.position.x - asteroid.position.x, 
						ship.position.y - asteroid.position.y)) {
							/* basically, this checks if the ship is at 0,0 once substracted byt the asteroid coordinates position (both are in their respective space) */
							return true
					}
				}
			}
		return false
	}
}

export default collisionDetector;