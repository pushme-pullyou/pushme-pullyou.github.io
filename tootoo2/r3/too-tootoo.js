	let TOO = {};
	var MNU = MNU || {};

	const b = '<br>';


	MNU.getFiles = function() {

		MNU.files = MNU.tableOfContents.replace( / /g, '' ).replace( /(.*)\((.*)\)(.*)/gi, '$2' ).split( '\n' );

	};


	TOO.setContentsWidth = function() {

		contents.style.width = ( window.innerWidth - 325 ) + 'px';

	}

	TOO.initUser = function( usr ) {

		if ( window.self !== window.top ) { container.style.left = '-325px'; }

		window.addEventListener( 'resize', TOO.setContentsWidth(), false );

		TOO.setContentsWidth();

		window.addEventListener ( 'hashchange', TOO.onHashChange, false );

		user = usr;

		mnuContents.innerHTML =

			'<details open >' +

				'<summary><h3 id=menuTitle >Contents</h3></summary>' +

				'<div id=breadcrumbs ></div>' +
				'<div id=menuItems ></div>' +

			'</details>' + b +

		'';


		if ( location.hash.includes( '@@@' ) ) { // read local files ~ used by readme.html to help you view local files while you edit them

			TOO.urlGHPages = './';
			location.hash = location.hash.replace( '@@@', '' );

		} else if ( user.rawgit ) {

			TOO.urlGHPages = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/' ;

		} else {

			TOO.urlGHPages = 'https://' + user.user + '.github.io/' + user.repo + '/';

		}

		if ( MNU.tableOfContents ) { MNU.getFiles(); }

		TOO.setMenu = MNU.tableOfContents !== undefined ? TOO.setMenuContents : TOO.setMenuDefault;
		TOO.setMenu( user.folder );

	}


	TOO.setMenuDefault = function ( path ) {

		let url;
		TOO.path = path;
		url = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/contents/' + ( path ? path : '' );

		TOO.setBreadcrumbs( path );

		TOO.requestFile( url, TOO.callbackFolderContents );

	}


	TOO.callbackFolderContents = function( xhr ) {

		let response, items, item, count;

		response = xhr.target.response;
		items = JSON.parse( response );

		MNU.files = [];
		count = 0;
		menuItems.innerHTML = '';

		for ( let i = 0; i < items.length; i++ ) {

			item = items[ i ];

			if ( item.type === 'dir' ) {

				menuItems.innerHTML +=
					'<a href=JavaScript:location.hash="";TOO.setMenuDefault("' + item.path  + '"); style=width:100%;  > 🗀 ' + item.name  + '</a>' + b +
//					'<a href=JavaScript:TOO.setMenuDefault("' + item.path  + '"); style=width:100%;  > 🗀 ' + item.name  + '</a>' + b +

				'';

			}

		}

		for ( i = 0; i < items.length; i++ ) {

			item = items[ i ];

			if ( item.type === 'file' ) {

				menuItems.innerHTML +=
					'<a id=file' + count++ + ' href=#' + item.path + ' style=width:100%;  > ' + item.name + '</a>' + b +
				'';

				MNU.files.push( item.path );

			}

		}


		if ( location.hash === '' && ( location.hash.includes( '/' ) || location.hash.includes( '.' ) ) )  {

			CNT.getFileSetContents( location.hash.slice( 1 ) );

		} else if ( user.defaultFile !== undefined && user.folder === TOO.path ) {

			CNT.getFileSetContents( user.defaultFile );

		} else {

			TOO.setDefaultContents();

		}

	}


	TOO.setMenuContents = function() { // we have a table of contents / TOO.tableOfContents somewhere

//		var text;

		showdown.setFlavor( 'github' );

		TOO.converter = new showdown.Converter();

		text = CNT.massageText( MNU.tableOfContents );

		menuItems.innerHTML = text;

		MNU.files = [];
		menuTitle.innerHTML = 'Table of Contents';
		breadcrumbs.innerHTML = '';


		if ( location.hash.length > 1 ) {

			CNT.getFileSetContents( location.hash.slice( 1 )  );

		} else if ( user.defaultFile !== undefined && user.folder === TOO.path ) {

			CNT.getFileSetContents( user.defaultFile );

		} else {

			CNT.getFileSetContents( 'README.md' );

		}

	}


	TOO.setDefaultContents = function() {

		let txt, start, path, p;

		for ( var i = 0; i < MNU.files.length; i++ ) {

			path = MNU.files[ i ];
			p = path.toLowerCase();

			if ( p.endsWith( 'index.html' ) || p.endsWith( 'index.htm') ) { CNT.getFileSetContents( path ); return; }
			if ( p.endsWith( 'readme.md' ) ) { CNT.getFileSetContents( path ); return; }

		}

		path = MNU.files[ 0 ];
		CNT.getFileSetContents( path  );

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


	TOO.onHashChange = function() {

		if ( location.hash.slice( 1,2 ) === '!' ) {

			CNT.createPageOfImages( location.hash.slice( 2 ) );

		} else {

			CNT.getFileSetContents( location.hash.slice( 1 ) );

		}

		if ( MNU.files ) {

			links = document.getElementsByTagName( 'li' );

			for ( let i = 0; i < links.length; i++ ) {

				link = links[ i ];
				text = link.firstChild.hash;

				if ( text === location.hash ) {

					link.style.backgroundColor = 'lightgreen';

				} else {

					link.style.backgroundColor = '';

				}

			}

		}

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

