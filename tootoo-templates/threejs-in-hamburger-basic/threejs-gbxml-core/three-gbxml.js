	const uriGbxmlDefault =
	location.protocol === 'file:' ? // for testing
	//		'https://rawgit.com/ladybug-tools/spider/master/gbxml-viewer/gbxml-sample-files/open-studio-seb.xml'
	//		'https://rawgit.com/GreenBuildingXML/Sample-gbXML-Files/master/ARCH_ASHRAE%20Headquarters%20r16_detached.xml'
	//'../../../read-gbxml/data-files/sam-live2.xml'
	'../golden-co-open-studio-seb.xml'
	:
	'../../gbxml-sample-files/bristol-clifton-down-road.xml';

	var gbxml;
	var gbjson;

	// add surface group to r9?
	var surfaceMeshes;
	var surfaceEdges;

	var surfaceAdjacencyDuplicates;
	var surfaceAdjacencyInvalids;
	var surfaceCoordinateDuplicates;

	var colors = {

		InteriorWall: 0x008000,
		ExteriorWall: 0xFFB400,
		Roof: 0x800000,
		InteriorFloor: 0x80FFFF,
		ExposedFloor: 0x40B4FF,
		Shade: 0xFFCE9D,
		UndergroundWall: 0xA55200,
		UndergroundSlab: 0x804000,
		Ceiling: 0xFF8080,
		Air: 0xFFFF00,
		UndergroundCeiling: 0x408080,
		RaisedFloor: 0x4B417D,
		SlabOnGrade: 0x804000,
		FreestandingColumn: 0x808080,
		EmbeddedColumn: 0x80806E

	}

	const v = function( x, y, z ){ return new THREE.Vector3( x, y, z ); };

	var renderer, camera, controls, scene;
	var lightAmbient, lightDirectional, lightPoint;
	var cameraHelper, axesHelper, gridHelper, groundHelper;

	function initThreeGbxml() {

		renderer = new THREE.WebGLRenderer( { alpha: 1, antialias: true }  );
		renderer.setSize( window.innerWidth, window.innerHeight );
		renderer.shadowMap.enabled = true;
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		renderer.shadowMap.renderReverseSided = false;
		renderer.shadowMap.renderSingleSided = false;
		document.body.appendChild( renderer.domElement );

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );
		camera.up.set( 0, 0, 1 );

		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.autoRotate = true;

		scene = new THREE.Scene();

		lightAmbient = new THREE.AmbientLight( 0x444444 );
		scene.add( lightAmbient );

		lightDirectional = new THREE.DirectionalLight( 0xffffff, 1 );
		lightDirectional.shadow.mapSize.width = 2048;  // default 512
		lightDirectional.shadow.mapSize.height = 2048;
		lightDirectional.castShadow = true;
		scene.add( lightDirectional );

		lightPoint = new THREE.PointLight( 0xffffff, 0.5 );
		lightPoint.position = new THREE.Vector3( 0, 0, 1 );
		camera.add( lightPoint );
		scene.add( camera );

		axesHelper = new THREE.AxesHelper( 1 );
		scene.add( axesHelper );

		window.addEventListener( 'resize', onWindowResize, false );
		window.addEventListener( 'orientationchange', onWindowResize, false );
		window.addEventListener( 'keyup', function() { controls.autoRotate = false; }, false );
		renderer.domElement.addEventListener( 'click', function() { controls.autoRotate = false; }, false );

		//window.addEventListener( 'load', onWindowLoad, false );

		const url = !location.hash ? uriGbxmlDefault : location.hash.slice( 1 );

		requestFile( url, callbackGbXML );

	}



	function requestFile( url, callback ) {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
		xhr.onprogress = onRequestFileProgress;
		xhr.onload = callback;
		xhr.send( null );

		function onRequestFileProgress( xhr ) {

			divLog.innerHTML = 'bytes loaded: ' + xhr.loaded.toLocaleString() + ' of ' + xhr.total.toLocaleString() ;

		}

	}



	function callbackGbXML( xhr ){

		gbxml = xhr.target.responseXML.documentElement;

		parseFileXML( gbxml );

	}



	function openFile( files ) {

		const reader = new FileReader();
		reader.onprogress = onRequestFileProgress;
		reader.onload = function( event ) {

			const parser = new DOMParser();

			const xmlDoc = parser.parseFromString( reader.result, "text/xml" );

			gbjson = parseFileXML( xmlDoc.children[ 0 ] );

			if ( files.files[ 0 ] ) { gbjson.name = files.files[ 0 ].name; }

		}

		reader.readAsText( files.files[ 0 ] );

		function onRequestFileProgress( event ) {

			divLog.innerHTML =
				'bytes loaded: ' + event.loaded.toLocaleString() +
				( event.lengthComputable ? ' of ' + event.total.toLocaleString() : '' ) +
			'';

		}

	}


// loads any text file - from file reader or location hash or wherever

	function parseFileXML( xmlNode ) {

		gbjson = XML2jsobj( xmlNode );
		//console.log( 'gbjson', gbjson );

		parseGbJson( gbjson );

		return gbjson;

	}


// https://www.sitepoint.com/how-to-convert-xml-to-a-javascript-object/
// http://blogs.sitepointstatic.com/examples/tech/xml2json/index.html

	function XML2jsobj( node ) {

		let data = {};

		function Add( name, value ) {

			if ( data[ name ] ) {

				if ( data[ name ].constructor !== Array ) {

					data[ name ] = [ data[ name ] ];

				}

				data[ name ][ data[ name ].length ] = value;

			} else {

				data[ name ] = value;

			}

		}

		let child, childNode;

		for ( child = 0; childNode = node.attributes[ child ]; child++ ) {

			Add( childNode.name, childNode.value );

		}

		for ( child = 0; childNode = node.childNodes[ child ]; child++ ) {

			if ( childNode.nodeType === 1 ) {

				if ( childNode.childNodes.length === 1 && childNode.firstChild.nodeType === 3 ) { // text value

					Add( childNode.nodeName, childNode.firstChild.nodeValue );

				} else { // sub-object

					Add( childNode.nodeName, XML2jsobj( childNode ) );

				}

			}

		}

		return data;

	}



	function parseGbJson( gbjson ) {

		//console.log( 'surfaces', gbjson.Campus.Surface );

		const surfaces = gbjson.Campus.Surface;

		let polyloops = [];
		let openings = [];

		for ( let surface of surfaces ) {

			if ( surface.Opening ) {

				if ( surface.Opening.PlanarGeometry ) {

					const polyloop = surface.Opening.PlanarGeometry.PolyLoop;
					const points = getPoints( polyloop );
					openings.push( [ points ] );

				} else {

					let arr = [];

					for ( let opening of surface.Opening ) {

						polyloop = opening.PlanarGeometry.PolyLoop;
						points = getPoints( polyloop );
						arr.push( points );

					}

					openings.push( arr );

				}

			} else {

				openings.push( [] );

			}

			polyloop = surface.PlanarGeometry.PolyLoop;

			points = getPoints( polyloop );

			polyloops.push( points );

		}

		scene.remove( surfaceMeshes, surfaceEdges );

		if ( surfaceMeshes ) {

			surfaceMeshes.traverse( function ( child ) {

				if ( child.geometry ) {

					child.geometry.dispose();
					child.material.dispose();

				}

				if ( child.texture ) { child.texture.dispose(); }

			} );

		}

		if ( surfaceEdges ) {

			surfaceEdges.traverse( function ( child ) {

				if ( child.geometry ) {

					child.geometry.dispose();
					child.material.dispose();

				}

			} );

		}

		surfaceMeshes = new THREE.Object3D();
		surfaceMeshes.name = 'surfaceMeshes';

		surfaceEdges = new THREE.Object3D();
		surfaceEdges.name = 'surfaceEdges';

		for ( let i = 0; i < polyloops.length; i++ ) {

			const material = new THREE.MeshPhongMaterial( { color: colors[ surfaces[ i ].surfaceType ], side: 2, opacity: 0.85, transparent: true } );

			const shape = drawShapeSinglePassObjects( polyloops[ i ], material, openings[ i ] );
			shape.userData.data = surfaces[ i ];
			shape.castShadow = shape.receiveShadow = true;
			surfaceMeshes.add( shape );

			const edgesGeometry = new THREE.EdgesGeometry( shape.geometry );
			const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x888888 } ) );
			surfaceEdge.rotation.copy( shape.rotation );
			surfaceEdge.position.copy( shape.position );
			surfaceEdges.add( surfaceEdge );

		}

		scene.add( surfaceMeshes, surfaceEdges );

		zoomObjectBoundingSphere( surfaceMeshes );

	}



	function getPoints( polyloop ) {

		const points = [];

		for ( let CartesianPoint of polyloop.CartesianPoint ) {

			const point = new THREE.Vector3().fromArray( CartesianPoint.Coordinate );

			points.push( point );

		}

		return points;

	}



	function drawShapeSinglePassObjects( vertices, material, holes ) {

		// let there be simpler ways to do this

		const v0 = vertices[ 0 ];
		const v1 = vertices[ 1 ]
		const v2 = vertices[ 2 ];

		let plane = new THREE.Plane().setFromCoplanarPoints ( v0, v1, v2 );

		if ( plane.constant === 0 ) { // check for errors in gbXML vertices

			if ( v0.x === v1.x && v1.x === v2.x ) {
				plane = new THREE.Plane().setFromCoplanarPoints ( v1, v2, vertices[ 3 ] );
			}

			if ( v0.y === v1.y && v1.y === v2.y ) {
				plane = new THREE.Plane().setFromCoplanarPoints ( v1, v2, vertices[ 3 ] );
			}

			if ( v0.x=== v1.x && v0.y === v1.y ) {
				plane = new THREE.Plane().setFromCoplanarPoints ( v1, v2, vertices[ 3 ] );
			}

			if ( v1.x=== v2.x && v1.y === v2.y ) {
				plane = new THREE.Plane().setFromCoplanarPoints ( v0, v1, vertices[ 3 ] );
			}

		}

		const obj = new THREE.Object3D();
		obj.lookAt( plane.normal );

		const obj2 = new THREE.Object3D();
		obj2.quaternion.copy( obj.clone().quaternion.conjugate() );
		obj2.updateMatrixWorld( true );


		for ( let vertex of vertices ) {

			obj2.localToWorld( vertex );

		}


		const shape = new THREE.Shape( vertices );

		shape.autoClose = true;

		for ( let verticesHoles of holes ) {

			for ( let vertex of verticesHoles ) {

				obj2.localToWorld( vertex );

			}

			const hole = new THREE.Path();

			hole.setFromPoints( verticesHoles );

			shape.holes.push( hole );

		}

		const geometryShape = new THREE.ShapeGeometry( shape );

		let shapeMesh = new THREE.Mesh( geometryShape, material );
		shapeMesh.quaternion.copy( obj.quaternion );
		shapeMesh.position.copy( plane.normal.multiplyScalar( - plane.constant ) );

		return shapeMesh;

	}



	function zoomObjectBoundingSphere( obj ) {

		if ( obj.geometry ) {
			// might not be necessary

			obj.geometry.computeBoundingSphere();
			const center = obj.geometry.boundingSphere.center;
			const radius = obj.geometry.boundingSphere.radius;

		} else {

			const bbox = new THREE.Box3().setFromObject( obj );
			const sphere = bbox.getBoundingSphere();
			center = sphere.center;
			radius = sphere.radius;

		}

		obj.userData.center = center;
		obj.userData.radius = radius;

		controls.target.copy( center );
		controls.maxDistance = 5 * radius;

		camera.position.copy( center.clone().add( new THREE.Vector3( 1.0 * radius, - 1.0 * radius, 1.0 * radius ) ) );

		axesHelper.scale.set( radius, radius, radius );
		axesHelper.position.copy( center );

		camera.far = 10 * radius; //2 * camera.position.length();
		camera.updateProjectionMatrix();

		lightDirectional.position.copy( center.clone().add( new THREE.Vector3( 1.5 * radius, 1.5 * radius, 1.5 * radius ) ) );
		lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
		lightDirectional.target = axesHelper;

//		scene.remove( cameraHelper );
//		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
//		scene.add( cameraHelper );

	}



	function setAllVisible() {

		surfaceMeshes.visible = true;

		document.body.style.backgroundImage = '';
		divLog.innerHTML = '';

		for ( let child of surfaceMeshes.children ) {

			if ( !child.userData.data ) { continue; }

			child.material = new THREE.MeshPhongMaterial( {
				color: colors[ child.userData.data.surfaceType ], side: 2, opacity: 0.85, transparent: true }
			);
			child.material.wireframe = false;
			child.visible = true;

		};

		surfaceEdges.visible = true;

		for ( let child of surfaceEdges.children ) {

//			child.material.opacity = 0.85;
			child.material.wireframe = false;

		};

		camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 10000 );
		camera.up.set( 0, 0, 1 );

		controls = new THREE.OrbitControls( camera, renderer.domElement );
		controls.autoRotate = true;

		camera.add( lightPoint );
		scene.add( camera );

//		if ( parent.createReport ) { parent.createReport(); }

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
