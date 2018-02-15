	var renderer, camera, controls, scene;
	var geometry, material, mesh, axesHelper;

	initThree();
	animate();

	function initThree() {

		divContainerThree.innerHTML = '';

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true } );
		renderer.setSize( window.innerWidth, window.innerHeight );

		divContainerThree.appendChild( renderer.domElement );

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
		camera.position.set( 100, 100, 100 );
		camera.up.set( 0, 0, 1 );

		controls = new THREE.OrbitControls( camera, renderer.domElement );

		scene = new THREE.Scene();

		window.addEventListener( 'resize', onWindowResize, false );
		window.addEventListener( 'orientationchange', onWindowResize, false );
		window.addEventListener( 'keyup', function() { controls.autoRotate = false; }, false );
		renderer.domElement.addEventListener( 'click', function() { controls.autoRotate = false; }, false );

		axesHelper = new THREE.AxesHelper( 50 );
		scene.add( axesHelper );

		geometry = new THREE.BoxGeometry( 50, 50, 50 );
		material = new THREE.MeshNormalMaterial();
		mesh = new THREE.Mesh( geometry, material );
		scene.add( mesh );

	}



	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize( window.innerWidth, window.innerHeight );

//console.log( 'onWindowResize  window.innerWidth', window.innerWidth );

	}



	function animate() {

		requestAnimationFrame( animate );
		renderer.render( scene, camera );
		controls.update();

	}
