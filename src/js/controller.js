// @ts-check
const controller = {
	keys: {
		'ArrowRight': 1,
		'ArrowLeft': -1,
		'ArrowUp': 1,
		'ArrowDown': -1,
		' ': 1,
	},
	activeKeys: [],
	init() {

		// press key //
		document.addEventListener('keydown', (e) => {
			if(Object.keys(this.keys).includes(e.key) && !this.activeKeys.includes(e.key)) {
				e.preventDefault();
				e.stopPropagation();
				this.activeKeys.push(e.key);
			}
		});

		// release key //
		document.addEventListener('keyup', (e) => {
			if(this.activeKeys.includes(e.key)) {
				e.preventDefault();
				e.stopPropagation();
				this.activeKeys.splice(this.activeKeys.indexOf(e.key), 1);
			}
		});
	},
}

export default controller