

	init()

	function init(){

		if ( !window.divMenuItems ) {

			divMenu.innerHTML += '<div id=divMenuItems ></div>';

		}

		divMenuItems.innerHTML = 
			'<p>this is test 2</p>' +
			'<p><a href="#threejs-basic.html" >three js</a></p>' +
			'<p><a href="#script-readme.md" >Script Read Me</a></p>' +
		'';

	}