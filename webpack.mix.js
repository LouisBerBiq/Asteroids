let mix = require('laravel-mix');
mix.disableNotifications();

mix .setPublicPath('dist/')
	.copy('src/index.html', 'dist/index.html') 
	.copy('src/js/main.js', 'dist/js') 
	// .js('src/js/main.js', 'dist/js') 
	.sass('src/scss/main.scss', 'dist/css');