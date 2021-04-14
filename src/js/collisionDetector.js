import garbageManager from './garbageManager.js';
const collisionDetector = {
	detect(canvasContext, ship, asteroids) {
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
	}
}

export default collisionDetector;