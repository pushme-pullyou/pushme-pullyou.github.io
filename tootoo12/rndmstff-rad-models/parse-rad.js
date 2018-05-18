
	function parseFile( text ) {

		const arr = location.hash.slice( 1 ).split( '/');
		const file = arr.pop();
		const path = arr.join( '/' );

		//console.log( 'path', path );

		const lines = text.split(/\r\n|\n/);
		//console.log( 'lines', lines );

		const items = [ 'header'];
		const data = [];
		let tmp = [];


		for ( let line of lines ) {

			if ( line[0] === '#') { continue; }

			if ( line.search( /[abcdfghijklmnopqrstuvwxyz]/ ) >= 0) {


				if ( line.match( '!xform' ) ) {

					let url = line.trim().replace( /  /g, ' ' ).split( /\s/)[ 1 ];
					url = url.slice( 1 );
					console.log( 'path + url', path + url );

					requestFile( path + url );

				}

				items.push( line );
				data.push( tmp );
				tmp = [];

			} else {

				tmp.push( line );

			}

		}

		data.push( tmp );

		rad.items = items;
		rad.data = data;

		//console.log( 'rad', rad );

		setVerts();

		divContents.innerHTML =
			`<p>length: ${text.length.toLocaleString()}</p>
			<p>lines: ${lines.length.toLocaleString()}</p>
			<p>faces: ${(items.length - 1).toLocaleString()}</p>
		`;

	}



	function setVerts() {

		const material = new THREE.MeshNormalMaterial( { opacity: 0.85, side: 2, transparent: true } );


		//for ( let item of rad.items ) {
		for ( let i = 1; i < rad.items.length; i++ ) {

			//console.log( 'item', rad.items[ i ] );

			if ( rad.items[ i ] === '' ) { continue; }
			if ( rad.items[ i ].includes( 'polygon') === false ) { console.log( 'voided rad', i, rad.items[ i ] ); continue; }
			//console.log( 'line', line );

			line = rad.data[ i ];
			//console.log( 'line', line[ 2 ] );

			const length = parseInt( line[ 2 ], 10 ) / 3 + 3;

			//console.log( 'length', length );

			const points = [];

			for ( let j = 3; j < length; j++ ) {

				//console.log( 'line', i, line[ i ]);

				arr = line[ j ].trim().replace( / {2,}/g, ' ' ).replace( /\t/g, '' ).split( /\s/).map( str => parseFloat( str ) );
				//console.log( 'arr', arr );


				//line[ i ] = line[ i ].replace( /  /g, ' ' ); // use regex??
				//const arr = line[ i ].split( ' ' ).map( item => parseFloat( item ) );

				//const pt = line[ i ].map( item => item.split( /\s/).slice( 0, 3 ).map( str => parseFloat( str ) ) );
				//console.log( 'pt', pt );

				const vertex = new THREE.Vector3().fromArray( arr );
				//console.log( 'vertex', vertex );

				points.push( vertex );

				//if ( length === 3 ) { points.push( line[ 3 ] ); }

			}
			//console.log( 'points', points );


			if (points.length === 0 ) {

				continue;

			} else {

				const shape = drawShapeSinglePassObjects( points, material, []);

				const edgesGeometry = new THREE.EdgesGeometry( shape.geometry );
				const surfaceEdge = new THREE.LineSegments( edgesGeometry, new THREE.LineBasicMaterial( { color: 0x333333 } ) );
				surfaceEdge.rotation.copy( shape.rotation );
				surfaceEdge.position.copy( shape.position );

				rad.meshes.add( shape );
				rad.edges.add( surfaceEdge )

			}


		}

		scene.add( rad.meshes, rad.edges );

		//zoomObjectBoundingSphere ( rad.meshes );


	}



	function drawShapeSinglePassObjects ( vertices, material, holes ) {

		const plane = getPlane( vertices );

		const obj = new THREE.Object3D();
		obj.lookAt( plane.normal );  // copy the rotation of the triangle
		obj.quaternion.conjugate();
		obj.updateMatrixWorld();

		vertices.map( vertex => obj.localToWorld( vertex ) );

		const shape = new THREE.Shape( vertices );
		//shape.autoClose = true;

		for ( let verticesHoles of holes ) {

			const hole = new THREE.Path();

			verticesHoles.map( vertex => obj.localToWorld( vertex ) );

			hole.setFromPoints( verticesHoles );

			shape.holes.push( hole );

		}

		const geometryShape = new THREE.ShapeGeometry( shape );

		// material to here
		const shapeMesh = new THREE.Mesh( geometryShape, material );

		shapeMesh.lookAt( plane.normal );
		shapeMesh.position.copy( plane.normal.multiplyScalar( - plane.constant ) );

		return shapeMesh;

	};


	function getPlane( points, start = 0 ) {

		const triangle = new THREE.Triangle();
		triangle.set( points[ start ], points[ start + 1 ], points[ start + 2 ] );
		const pl = new THREE.Plane();
		plane = triangle.plane( pl );

		if ( triangle.area() === 0 ) {

			start++;
			getPlane( points, start );

		}

		return plane;

	};





	function zoomObjectBoundingSphere ( obj ) {

		const bbox = new THREE.Box3().setFromObject( obj );

		const sphere = bbox.getBoundingSphere( new THREE.Sphere() );
		const center = sphere.center;
		const radius = sphere.radius;

		controls.target.copy( center );
		controls.maxDistance = 5 * radius;

		camera.position.copy( center.clone().add( new THREE.Vector3( 1.0 * radius, - 1.0 * radius, 1.0 * radius ) ) );
		camera.far = 10 * radius; //2 * camera.position.length();
		camera.updateProjectionMatrix();

		lightDirectional.position.copy( center.clone().add( new THREE.Vector3( -1.5 * radius, -1.5 * radius, 1.5 * radius ) ) );
		lightDirectional.shadow.camera.scale.set( 0.2 * radius, 0.2 * radius, 0.01 * radius );
		lightDirectional.target = axesHelper;

		axesHelper.scale.set( radius, radius, radius );
		axesHelper.position.copy( center );

		obj.userData.center = center;
		obj.userData.radius = radius;

		//		scene.remove( cameraHelper );
		//		cameraHelper = new THREE.CameraHelper( lightDirectional.shadow.camera );
		//		scene.add( cameraHelper );

	}



	function updateOpacity() {

		const opacity = parseInt( rngOpacity.value, 10 );
		outOpacity.value = opacity + '%';

		scene.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {

				child.material.opacity = opacity / 100;

			}

		} );


	};

