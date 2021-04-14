import garbageManager from './garbageManager.js';
const collisionDetector = {
	detect(canvasContext, ship, asteroids) {
		ship.bullets.forEach(bullet => {
			asteroids.forEach(asteroid => {
				if (canvasContext.isPointInPath(asteroid.path, 
					bullet.position.x - asteroid.position.x, 
					bullet.position.y - asteroid.position.y)) {
						console.log('is in path');
						
				}
			});
		});
	}
}

export default collisionDetector;