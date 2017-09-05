	let TOO = {};

	const b = '<br>';



	TOO.initUser = function() {

// if not, then overwrites. Fix this!


		if ( location.protocol === 'vvvfile:' ) { // can help with local testing. Needs work.

			pathFull1 = user.path.replace( /-/g, '' ).replace( /\w+/g, '..' ) + '/';
			pathFull = pathFull1 === '/' ? './' : pathFull1;
			TOO.urlGHPages = pathFull;
			TOO.urlGHPages = './';

		} else if ( user.rawgit ) {

			TOO.urlGHPages = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/' ;

		} else if ( user.repo === user.user + '.github.io' ) {

			TOO.urlGHPages = 'https://' + user.user + '.github.io/';

		} else {

			TOO.urlGHPages = 'https://' + user.user + '.github.io/' + user.repo + '/';

		}

//		if ( MNU.tableOfContents ) { TOO.getFiles(); }

//		MNU.init();

//		TOO.setMenu = MNU.tableOfContents !== undefined ? TOO.setMenuContents : TOO.setMenuDefault;
//		TOO.setMenu( user.path );



	}



	TOO.setMenuDefault = function ( path ) {

		let url;

		TOO.path = path;

		url = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/contents/' + ( path ? path : '' );
//console.log( 'url', url );
		menuTitle.innerHTML = 'All Files';
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
					'<a href=JavaScript:location.hash="";TOO.setMenuDefault("' + item.path  + '"); style=width:100%;  > 🗀 ' + item.name  + '</a>' + b +
//					'<a href=JavaScript:TOO.setMenuDefault("' + item.path  + '"); style=width:100%;  > 🗀 ' + item.name  + '</a>' + b +

				'';

			}

		}

		for ( i = 0; i < items.length; i++ ) {

			item = items[ i ];

			if ( item.type === 'file' ) {

				menuItems.innerHTML +=
					'<a id=file' + count++ + ' href=#' + encodeURI( item.path ) + ' style=width:100%;  > ' + item.name + '</a>' + b +
				'';

				TOO.files.push( item.path );

			}

		}



// move to TOO.setDefaultContents

		if ( location.hash !== '' && ( location.hash.includes( '/' ) || location.hash.includes( '.' ) ) )  {

			CON.getFileSetContents( location.hash.slice( 1 ) );

		} else if ( user.defaultFile !== undefined && user.path === TOO.path ) {

			CON.getFileSetContents( user.defaultFile );

		} else {

			TOO.setDefaultContents();

		}

	}


	TOO.setMenuContents = function() { // we have a table of contents / TOO.tableOfContents somewhere

		var text, fNames, fName;
		var index, ReadMe;

		TOO.files = [];

//		if ( mnuSelectItem.innerHTML.includes( 'mnuUserTitle' ) ) {

			mnuUserTitle.innerHTML = '<h3>' + ( user.title ? user.title : user.user ) + '</h3>';
			mnuUserTagline.innerHTML = user.tagLine? user.tagLine : '';
//		}

		showdown.setFlavor( 'github' );

		TOO.converter = new showdown.Converter();

		text = CON.massageText( MNU.tableOfContents );

		menuItems.innerHTML = text;

		fNames = MNU.tableOfContents.replace( / /g, '' ).replace( /(.*)\((.*)\)(.*)/gi, '$2' ).split( '\n' );

		for ( var i = 1; i < fNames.length - 1; i++ ) {

			fName = fNames[ i ];
			if ( fName.includes( '###' ) || fName === '' || fName.length < 5 ) { continue; }

			TOO.files.push( fName.slice( 1 ) );

		}

// not needed??
		index = TOO.files.indexOf( 'readme.md');
		readMe = index > -1 ? TOO.files[ index ] : '';
		index = TOO.files.indexOf( 'README.md');
		readMe = index > -1 ? TOO.files[ index ] : readMe;

		menuTitle.innerHTML = 'Table of Contents';
		breadcrumbs.innerHTML = '';


// move to TOO.setDefaultContents

		if ( location.hash.length > 1 ) {

			CON.getFileSetContents( location.hash.slice( 1 )  );

//		} else if ( user.defaultFile !== undefined && user.path === TOO.path ) {
		} else if ( user.defaultFile !== undefined ) {

			CON.getFileSetContents( user.defaultFile );

		} else {

			CON.getFileSetContents( readMe ); ///

		}

	}


	TOO.setDefaultContents = function() {

		let txt, start, path, p;

// change to: TOO.files.includes( 'readme.md' )

		for ( var i = 0; i < TOO.files.length; i++ ) {

			path = TOO.files[ i ];
			p = path.toLowerCase();

// uppercase README gets selected before lower case index

			if ( p.endsWith( 'index.html' ) || p.endsWith( 'index.htm') ) { CON.getFileSetContents( path ); return; }
			if ( p.endsWith( 'readme.md' ) ) { CON.getFileSetContents( path ); return; }

		}

		path = TOO.files[ 0 ];
		CON.getFileSetContents( path  );

	}


	TOO.setBreadcrumbs = function( path ) {

		let name, txt, folders, str;

		name = user.repo;

//		name = user.path ? user.path : user.repo;

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


/*
		if ( location.hash.slice( 1,2 ) === '!' ) {

			CON.createPageOfImages( location.hash.slice( 2 ) );

		} else {

//			CON.getFileSetContents( location.hash.slice( 1 ) );

		}
*/

		if ( TOO.files ) {
console.log( '', 23 );
			file = location.hash;

			links = document.getElementsByTagName( 'a' );

			for ( var i = 0; i < links.length; i++ ) {

				link = links[ i ];

				if ( link.hash === location.hash ) {

					link.style.backgroundColor = 'lightgreen';

				} else {

					link.style.backgroundColor = '';

				}


			}
		}

/*
			links = document.getElementsByTagName( 'li' );

			for ( let i = 0; i < links.length; i++ ) {

				link = links[ i ];
				text = link.firstChild.hash;

				if ( link.hash === location.hash ) {

					link.style.backgroundColor = 'lightgreen';

				} else {

					link.style.backgroundColor = '';

				}

			}

		}
*/

	}





	TOO.getFiles = function() {

		TOO.files = MNU.tableOfContents.replace( / /g, '' ).replace( /(.*)\((.*)\)(.*)/gi, '$2' ).split( '\n' );

	};


	TOO.requestFile = function ( fileName, callback ) {

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', fileName, true );
		xhr.onerror = function( xhr ) { console.log( 'error', xhr  ); };
		xhr.onload = callback;
		xhr.send( null );

	}

