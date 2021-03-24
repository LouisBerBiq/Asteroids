const controller = {
	keys: {
		'ArrowRight': 1,
		'ArrowLeft': -1,
		'ArrowUp': -1,
		'ArrowDown': 1,
	},
	activeKeys: [],
	init() {
		// press key //
		document.addEventListener('keydown', (e) => {
			e.preventDefault();
			e.stopPropagation();
			if(Object.keys(this.keys).includes(e.key) && !this.activeKeys.includes(e.key)) {
				this.activeKeys.push(e.key);
			}
		});
		// release key //
		document.addEventListener('keyup', (e) => {
			e.preventDefault();
			e.stopPropagation();
			if(this.activeKeys.includes(e.key)) {
				this.activeKeys.splice(this.activeKeys.indexOf(e.key), 1);
			}
		});
	},
}

export default controller