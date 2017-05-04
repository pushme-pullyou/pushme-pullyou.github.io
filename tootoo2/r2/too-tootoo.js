	TOO = {};

	const b = '<br>';

	TOO.initUser = function( usr ) {

		user = usr;

		TOO.setMenu = TOO.tableOfContents !== undefined ? TOO.setMenuContents : TOO.setMenuDefault;

		mnuItems.innerHTML =

			'<details open >' +

				'<summary><h3 id=menuTitle >Contents</h3></summary>' +

				'<div id=breadcrumbs ></div>' +
				'<div id=menuItems ></div>' +

			'</details>' + b +

		'';

		if ( location.hash.includes( '@@@' ) ) {

			TOO.urlGHPages = './';
			location.hash = location.hash.replace( '@@@', '' );

		} else if ( user.rawgit ) {

			TOO.urlGHPages = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/' ;

		} else {

			TOO.urlGHPages = 'https://' + user.user + '.github.io/' + user.repo + '/';

		}

		TOO.setMenu( user.folder );

	}


	TOO.setMenuDefault = function ( path ) {

		let url;

		url = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/contents/' + ( path ? path : '' );

		TOO.setBreadcrumbs( path );

		TOO.requestFile( url, TOO.callbackFolderContents );

	}


	TOO.callbackFolderContents = function( xhr ) {

		let response, items, item, count;

		response = xhr.target.response;
		items = JSON.parse( response );

		TOO.files = [];
		count = 0;
		menuItems.innerHTML = '';

		for ( let i = 0; i < items.length; i++ ) {

			item = items[ i ];

			if ( item.type === 'dir' ) {

				menuItems.innerHTML +=
//					'<a href=JavaScript:location.hash="' + item.path + '";TOO.setMenuDefault("' + item.path  + '"); style=width:100%;  > 🗀 ' + item.name  + '</a>' + b +
					'<a href=JavaScript:TOO.setMenuDefault("' + item.path  + '"); style=width:100%;  > 🗀 ' + item.name  + '</a>' + b +

				'';

			}

		}

		for ( i = 0; i < items.length; i++ ) {

			item = items[ i ];

			if ( item.type === 'file' ) {

				menuItems.innerHTML +=
					'<a id=file' + count++ + ' href=#' + item.path + ' style=width:100%;  > ' + item.name + '</a>' + b +
				'';

				TOO.files.push( item.path );

			}

		}


		if ( location.hash === '' && ( location.hash.includes( '/' ) || location.hash.includes( '.' ) ) )  {

			TOO.getFileSetContents( location.hash.slice( 1 ) );

		} else if ( user.defaultFile !== undefined ) {

			TOO.getFileSetContents( user.defaultFile );

		} else {

			TOO.setDefaultContents();

		}

	}


	TOO.setMenuContents = function() { // we have a table of contents / TOO.tableOfContents somewhere

		var text;

		showdown.setFlavor( 'github' );

		TOO.converter = new showdown.Converter();

		text = TOO.massageText( TOO.tableOfContents );

		menuItems.innerHTML = text;

		TOO.files = [];
		menuTitle.innerHTML = 'Table of Contents';
		breadcrumbs.innerHTML = '';


		if ( location.hash.length > 1 ) {

			TOO.getFileSetContents( location.hash.slice( 1 )  );

		} else if ( user.defaultFile !== undefined ) {

			TOO.getFileSetContents( user.defaultFile );

		} else {

			TOO.getFileSetContents( 'README.md' );

		}

	}


	TOO.setDefaultContents = function() {

		let txt, start, path, p;

		for ( var i = 0; i < TOO.files.length; i++ ) {

			path = TOO.files[ i ];
			p = path.toLowerCase();

			if ( p.endsWith( 'index.html' ) || p.endsWith( 'index.htm') ) { TOO.getFileSetContents( path ); return; }
			if ( p.endsWith( 'readme.md' ) ) { TOO.getFileSetContents( path ); return; }

		}

		path = TOO.files[ 0 ];
		TOO.getFileSetContents( path  );

	}


	TOO.setBreadcrumbs = function( path ) {

		let name, txt, folders, str;

		name = user.folder ? user.folder : user.repo;
		name = user.repo;

		txt = '<h3><a href=JavaScript:TOO.setMenuDefault(); >' + name + '</a> &raquo; </h3>';

		folders = path ? path.split( '/' ) : [] ;

		str = '';

		for ( let i = 0; i < folders.length; i++ ) {

			str += folders[ i ] + '/';

			txt += '<h3><a href=JavaScript:TOO.setMenuDefault("' + str.slice( 0, -1 ) + '"); >' + folders[ i ] + '</a> &raquo; </h3>';

		}

		breadcrumbs.innerHTML = txt;

	}


	TOO.requestFile = function ( fileName, callback ) {

		var fileName, text, lines;

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', fileName, true );
		xhr.onerror = function( xhr ) { console.log( 'error', xhr  ); };
		xhr.onload = callback;
		xhr.send( null );

	}

