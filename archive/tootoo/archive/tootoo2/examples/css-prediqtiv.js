	CSS = {};

	CSS.setCSS = function() {

		let css;

		css = document.body.appendChild( document.createElement('style') );
		css.innerHTML =
			'html, body { font: 12pt monospace; height: 100%; margin: 0; }' +
			'a { color: blue; text-decoration: none; }' +
			'a:hover { text-decoration: underline; }' +
			'button, input[type=button] { background-color: #ccc; border: 2px #fff solid; color: #322; }' +
			'pre, blockquote { background-color: #eee; padding: 10px; }' +
			'summary { outline: none; }' +
			'summary h3 { display: inline; }' +

			'.popUp { background-color: white; border: 1px solid red; left: 180px; opacity: 1.0; padding: 5px; position: absolute; width: 120px; z-index: 10; }' +

			'#bars { color: blue; cursor: pointer; font-size: 24pt; text-decoration: none; }' +

			'#container {  height: 100%; left: 0;overflow-x: hidden; position: absolute; transition: left 1s; width: 100%; }' +

			'#contents { border: 0px #ccc solid; height: 100%; left: 325px; position: absolute; width: ' + ( window.innerWidth - 325 ) + 'px; }' +

			'#editButton { background-color: #555; color: #fff; opacity: 0.5; padding: 8px; position: fixed; right: 20px; top: 20px; }' +
			'#editButton:hover { cursor: pointer; opacity: 1; }' +
			'#editButton a { text-decoration: none; color: #fff; }' +

			'#hamburger { background-color: #eee; left: 325px; position: absolute; top: 20px;  z-index: 1 }' +
			'#hamburger h2 { margin: 0;}' +

			'#menu { background-color: #eee; border: 1px #ccc solid; box-sizing: border-box; height: 100%; overflow-x: hidden; overflow-y: auto; padding: 0 10px; position: fixed; width: 325px; }' +
			'#menu h2, #menu h4 {margin: 0; }' +
			'#menu ul { margin:0; padding-left:20px; }' +
			'#menuBreadcrumbs h2, #menuBreadcrumbs h3 { font-size: 14pt; margin: 0; }' +

			'#nextFile { color: #888; font-size: 36pt; opacity: 0.5; padding: 8px; position: fixed; right: 20px; top: ' + (0.5 * window.innerHeight ) + 'px; }' +
			'#nextFile:hover { cursor: pointer; opacity: 1; }' +
			'#nextFile a { text-decoration: none; color: #888; }' +

			'#previousFile { color: #888; font-size: 36pt; opacity: 0.5; padding: 8px; position: fixed; margin-left: 350px; top: ' + (0.5 * window.innerHeight ) + 'px; }' +
			'#previousFile:hover { cursor: pointer; opacity: 1; }' +
			'#previousFile a { text-decoration: none; color: #888; }' +

		'';

	}