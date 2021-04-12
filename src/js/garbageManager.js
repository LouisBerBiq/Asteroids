const garbageManager = {
	discard(thing, from) {
		from.splice(from.indexOf(thing), 1);
	}
}
//yes, that's the whole thing
export default garbageManager;