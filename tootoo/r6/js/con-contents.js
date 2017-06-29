
	let CON = {};


	CON.editor = undefined;


	CON.initContents = function() {

		mnuContents.innerHTML =

			'<div id=mnuUserTitle ></div>' +
			'<div id=mnuUserTagline ></div>' + b +

			'<details mnuContentsDetais open >' +

				'<summary><h3 id=mnuContentsTitle >Contents</h3></summary>' +

				'<div id=mnuBreadcrumbs ></div>' +
				'<div id=mnuItems ></div>' +

			'</details>' + b +

		'';
	}

	CON.setDefaultContents = function() {

		let txt, start, path, p;

		if ( !location.hash && user.defaultFile ) {

			location.hash = user.defaultFile;

			return;

		}

		for ( var i = 0; i < TYP.files.length; i++ ) {

			path = TYP.files[ i ];
			p = path.toLowerCase();

//			if ( p.endsWith( 'readme.md' ) ) { CON.getFileSetContents( path ); return; }
//			if ( p.endsWith( 'index.html' ) || p.endsWith( 'index.htm') ) { CON.getFileSetContents( path ); return; }

			if ( p.endsWith( 'readme.md' ) ) { location.hash = path; return; }
			if ( p.endsWith( 'index.html' ) || p.endsWith( 'index.htm') ) { location.hash = path; return; }

		}

// nothing found, so just display the first file found

		path = TYP.files[ 0 ];
		location.hash = path;

	}




	CON.getFileSetContents = function( path ) {

//		let url, u;

		if ( path === undefined ) {

			contents.innerHTML = '<center style=top:50%; >No files in this folder</center>';

			return;

		}

		if ( location.protocol === 'file:' ) {

			CON.urlGHPages = user.path; // user.path; // + user.anchor;


//console.log( 'path', path, user.defaultFile, path === user.defaultFile );

			if ( path === user.defaultFile && user.anchor ) {

				aa = document.getElementById( user.anchor )
//console.log( 'aa', aa );

				aa.scrollIntoView();
				return;
			}

		} else {

			CON.urlGHPages = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/' ;
		}

		url = CON.urlGHPages + path;

		u = url.toLowerCase();

		if ( u.endsWith( '.md' ) ){

			CON.getFileMD( url );

		} else if ( u.endsWith( '.html' ) || u.endsWith( '.htm' ) ) {

			CON.getFileHTML( url );

		} else if ( u.endsWith( '.gif' ) || u.endsWith( '.ico' ) || u.endsWith( '.jpg' ) || u.endsWith( '.jpeg' ) || u.endsWith( '.png' ) ||  u.endsWith( '.svg' ) ) {

			CON.getFileImage( url );

		} else if ( u.includes( '!' ) ) {

//console.log( 'getFileSetContents u',  url, 'p', path );
			CON.createPageOfImages( url );

		} else {

			CON.getFileCode( url );

		}

		CON.setButtons( path );
		TYP.highlightMenuItem();

//		menu.scrollTop = 0;

	}


	CON.getFileHTML = function( url ){

		contents.innerHTML = '<iframe id=ifrHTML src=' + url + ' > ' + '<iframe>';

	}


	CON.massageText = function( response ){

		showdown.setFlavor( 'github' );
		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};


	CON.getFileMD = function( url ) {

// https://github.com/showdownjs/showdown
//console.log( 'urlmd', url );
		let text, response;

		showdown.setFlavor('github');

		TYP.requestFile( url, callbackMD );

		function callbackMD( xhr ) {

			response = xhr.target.response;

			if ( response.includes( 'DOCTYPE') ) {

// console.log( '', response  );

				contents.innerHTML = '<h1 style=text-align:center; >file not found</h1>';

				return;

			}


			text = CON.massageText( response );

			contents.innerHTML =

			'<div id=divMD >' + text + '</div>';

			contents.scrollTop = 0;

		}

	}


	CON.getFileImage = function( url ){

		contents.innerHTML = '<img src="' + url + '" style="border: 0px solid gray; margin: 25px 0 0 50px; max-width: 800px; " >';

	}


	CON.getFileCode = function( url ) {

// try embed gist

		contents.innerHTML =
			'<div id=contentsCode style="border: 0px red solid; height: 100%; margin: 0 auto; width: 900px; position: relative;" >' +
			' item will appear here ' +
		'</div>';

		if ( CON.editor !== undefined ) {

			setEditContents();

		} else {

// check here for latest: https://cdnjs.com/libraries/ace/
// Anyway to get latest automatically?
// use GitHub code embed??

			CON.editor = document.body.appendChild( document.createElement( 'script' ) );
			CON.editor.onload = setEditContents;
			CON.editor.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js';

		}


		function setEditContents() {

			editor = ace.edit( 'contentsCode' );
			editor.$blockScrolling = Infinity;
			editor.getSession().setMode( 'ace/mode/markdown' );

			TYP.requestFile( url, callback );

			function callback( xhr ) {

				editor.setValue( xhr.target.response.slice( 0, 10000 ), -1 );

			}

		}

	}


	CON.createPageOfImages = function( path ) {

			let page, url, items, item, source;

			page = '';

			ppath = path.slice( path.indexOf( '!') + 1 );
			url = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/contents/' + ppath;

console.log( 'url', url, 'p',  path );

			TYP.requestFile( url, callbackGalleryContents );

			function callbackGalleryContents( xhr ){

				response = xhr.target.response;
				items = JSON.parse( response );

				for ( let i = 0; i < items.length; i++ ) {

					item = items[ i ];

					source = item.download_url;

					if ( source.includes( '.thumb' ) || source.includes( '.highlight' ) || source.endsWith( '.dat' )  ||
						source.endsWith( '.lock' ) ) { continue; }

					page += '<div style=display:inline-block;margin:10px; >' +
						'<a href=JavaScript:CON.getFileSetContents("' + item.path +'"); ><img src=' + source + ' height=200; title="' + url.slice( 0, -4 ) + '" ></a>' +
					'</div>';

				}

				contents.innerHTML = page;

//				CON.setButtons( path, true );

//				location.hash = '!' + path;

			}

	}



	CON.setButtons = function( path ) {

		var index, folder, indexNext, indexPrevious;

		if ( butEditFile ) {

			folder = user.path ? user.path + '/' : '';

			butEditFile.innerHTML = '<a href="https://github.com/' + user.user + '/' + user.repo + '/blob/' + user.branch + '/' + folder + path + '" target="_blank"> Edit </a>';

		}

		index = TYP.files.indexOf( path );

		indexNext = index + 1;
		if ( indexNext >= TYP.files.length ) { indexNext = 0; }

		indexPrevious = index - 1;
		if ( indexPrevious < 0 ) { indexPrevious = TYP.files.length - 1; }

		if ( butNextFile || butPreviousFile ) {

			butNextFile.innerHTML = '<a href="#' + TYP.files[ indexNext ] + '" > &gt; </a>';
			butPreviousFile.innerHTML = '<a href="#' + TYP.files[ indexPrevious ] + '" > &lt; </a>';

		}

	}
