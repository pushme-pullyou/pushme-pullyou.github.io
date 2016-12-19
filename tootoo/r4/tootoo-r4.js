// Copyright © 2016 Jaanga authors. MIT license.

	var TOO = { release: 'r4' };

	var b = '<br>';
	var editor;

	function requestAPIContents() {

		var xhr, response, paths, path, TOOeNode, newNode, keys;

		requestFile( TOO.url, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );

			paths = [];

			for ( var i = 0; i < response.tree.length; i++ ) {

				path = response.tree[ i ].path;

				if ( path.startsWith( '.' ) ) { continue; }

				if ( TOO.folder !== '' && !path.includes( TOO.folder ) ) { continue; }

				paths.push( path );

			}

			if ( TOO.folder === '' ) {

				TOO.data = { 'children' : {} };
				obj = TOO.data.children;

			} else {

				TOO.data = {};
				obj = TOO.data

			}

/*
			for ( var i = 0 ; i < paths.length; i++ ) {

				buildTree( paths[ i ].split( '/' ), TOO.data.children );

			}
*/

			paths = paths.map( function( path ) { return buildTree( path.split( '/' ), obj ) } );

//debugger;

			function buildTree( parts, TOOeNode ) {

				if ( parts.length === 0 ) { return; }

				keys = Object.keys( TOOeNode );

				for ( var i = 0 ; i < keys.length; i++ ) {

					if ( parts[ 0 ] === TOOeNode[ keys[ i ] ].text ) {

						buildTree( parts.splice( 1, parts.length ), TOOeNode[ keys[ i ] ].children );

						return;
					}

				}

				newNode = { 'text' : parts[ 0 ], 'children' : {} };

				TOOeNode[ newNode.text ] = newNode;

				buildTree( parts.splice( 1, parts.length ), newNode.children );

			}

			menuInfo.innerHTML = '<p> Number of items found: ' + paths.length + b +

				'<a href="https://github.com/' + TOO.user + '/' + TOO.repo + '" target="_blank"> View repository on GitHub </a>' +
			'</p>';

			setMenu();

		}

	}


	function setMenu( path ) {

		var folders, obj;
		var foldersText, filesText;

		folders = path ? path.split( '/' ) : [] ;

		obj = TOO.folder ? TOO.data[ TOO.folder ] : TOO.data;

// very curious things going on here, but it works...

		for ( var i = 0; i < folders.length; i++ ) {

			obj = obj.children[ folders[ i ] ];

		}

		TOO.keys = Object.keys( obj.children );
		foldersText = '';
		filesText = '<small> Use tag and shift-tab to browse files quickly </small>' + b;
		count = 0;

		p = path ? path + '/': '';
		history.replaceState( '', document.title, window.location.pathname );

		for ( var i = 0; i < TOO.keys.length; i++ ) {

			key = TOO.keys[ i ];

			if ( Object.keys( obj.children[ key ].children ).length > 0 ) {

				foldersText += ' &#x1f4c1; <a href=JavaScript:setMenu("' + p + encodeURI( key ) + '"); >' + key + '</a>'+ b;

			} else {

				filesText += '<a id=file' + ( count++ ) + ' href=JavaScript:getFileSetContents("' + TOO.urlGHPages + p + encodeURI( key ) + '"); ' +
				' onfocus=getFileSetContents("' + TOO.urlGHPages + p + encodeURI( key ) + '"); >' +
				key +
				'</a>'+ b;

			}

		}

		TOO.menu.innerHTML = foldersText + filesText;

		setBreadcrumbs( path );

		setDefaultContents( path, filesText );

//		if ( p !== '' ) { file0.focus(); }

	}


	function setBreadcrumbs( path ) {

		var name, txt, folders, str;

		name = TOO.folder ? TOO.folder : TOO.repo;

		txt = '<h2><a href=JavaScript:setMenu(); >' + name + '</a> &raquo; </h2>';
		folders = path ?  path.split( '/' ) : [] ;
		str = '';

		for ( var i = 0; i < folders.length; i++ ) {

			str += folders[ i ] + '/';

			txt += '<h3><a href=JavaScript:setMenu("' + str.slice( 0, -1 ) + '"); >' + folders[ i ] + '</a> &raquo; </h3>';

		}

		TOO.breadcrumbs.innerHTML = txt;

	}


	function setDefaultContents( path, filesText ) {

		var p, txt, start, file;

		p = path ? path + '/': '';

		txt = filesText.toLowerCase();

		if ( location.hash ) { return; }

		if ( txt.includes( 'index.html' ) && TOO.noIndex !== 'true' ) {

			start = txt.indexOf( 'index.html' );

			file =  filesText.slice( start, start + 10 );

			getFileHTML( TOO.urlGHPages + p + file );

		} else if ( txt.includes( 'readme.md' ) ) {

			start = txt.indexOf( 'readme.md' );

			file =  filesText.slice( start, start + 9 );

			getFileMD( TOO.urlGHPages + p + file );

			file1.focus();

		} else if ( txt.includes( 'toogallery') ) {

			createPageOfImages( TOO.urlGHPages + p , TOO.keys );

		} else {

//			if ( p !== '' ) { file0.focus(); }

//			contents.innerHTML = '<h2 style="margin:200px 0 0 50px;" > Select a file to view from the menu </h2>';

		}

	}

// formats to consider adding: PDF
// https://mozilla.github.io/pdf.js/

	function getFileSetContents( url ){

		var u = url.toLowerCase();

		if ( u.endsWith( '.md' ) ){

			getFileMD( url );

		} else if ( u.endsWith( '.html' ) || u.endsWith( '.htm' ) ) {

			getFileHTML( url );

		} else if ( u.endsWith( '.gif' ) || u.endsWith( '.ico' ) || u.endsWith( '.jpg' ) || u.endsWith( '.png' ) ||  u.endsWith( '.svg' ) ) {

			getFileImage( url );

		} else {

			getFileCode( url );

		}

	}


	function getFileMD( url ) {

		var converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });

		requestFile( url, callbackMD );

		function callbackMD( xhr ) {

			contents.innerHTML =
				'<div style=margin-left:50px;max-width:800px; >' +
				converter.makeHtml( xhr.target.response ) +
			'<div>';

			getFileDataXHR( xhr );

		}

	}


	function getFileHTML( url ){

		contents.innerHTML =
			'<iframe id=ifr src=' + url + ' width=' + ( window.innerWidth - 325 ) + ' height=' + ( window.innerHeight - 5 ) +
			' style="border:0px solid red"; >' +
		'<iframe>';

// how to catch and display errors loading iframes?

		menuFileData.innerHTML =
			'URL: ' + url.slice( 8 ).link( url ) + b +
		b;

		if ( p !== '' ) { file0.focus(); }

	}


	function getFileImage( url ){

		contents.innerHTML =
			'<img id=image src="' + url +
			'" style="border:2px solid gray; margin: 25px 0 0 50px; max-width: 800px; " >';

		menuFileData.innerHTML =
			'URL: ' + url.slice( 8 ).link( url ) + b +
		b;

	}


	function getFileCode( url ) {

		contents.innerHTML =
			'<div id=contentsCode style=margin-left:50px;width:800px;height:' + window.innerHeight + 'px; >' +
			' item will appear here ' +
		'</div>';

		if ( editor ) {

			setEditContents();

		} else {

// https://cdnjs.com/libraries/ace/

			editor = document.body.appendChild( document.createElement( 'script' ) );
			editor.onload = setEditContents;
			editor.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.5/ace.js';

		}

		function setEditContents() {

			editor = ace.edit( 'contentsCode' );
			editor.$blockScrolling = Infinity;
			editor.getSession().setMode( 'ace/mode/markdown' );

			requestFile( url, callback );

			function callback( xhr ) {

				getFileDataXHR( xhr );
				editor.setValue( xhr.target.response.slice( 0, 10000 ), -1 );

			}

		}

	}

	function createPageOfImages( path, photos ) {

//		var page, item, item2, fileName;

		page = '';

		for ( var i = 0; i < photos.length; i++ ) {

			item = photos[ i ];
//			item2 = item.split( '/' )

//			fileName = item2.pop();
			fileName = item.replace( /[-_]/g, ' ' );
//console.log( 'item', item );

			page += '<div style=display:inline-block;margin:10px; >' +
				'<a href=JavaScript:getFileSetContents("' + path + item +'"); ><img src=' + path + encodeURI( item ) + ' height=200; title="' + fileName.slice( 0, -4 ) + '" ></a>' +
				'</div>';

		}

//console.log( 'page', page  );

		contents.innerHTML = page;

	}


	function getFileDataXHR( xhr ) {

		var lastMod = xhr.target.getResponseHeader ( "Last-Modified" );

		menuFileData.innerHTML =
			'URL: ' + xhr.target.responseURL.slice( 8 ).link( xhr.target.responseURL ) + b +
			'Size: ' + xhr.total.toLocaleString() + ' ~ last modified: ' + lastMod + b +
		b;

	}



// may not be needed

	function callbackUnPretty( xhr ) {

		if ( xhr.target.readyState === 4  ) {

			var lastMod = xhr.target.geTOOsponseHeader ( "Last-Modified" );

			contentsHeader.innerHTML =
				'URL: ' + xhr.target.responseURL.link( xhr.target.responseURL ) + b +
				'size: ' + xhr.total.toLocaleString() + ' ~ last modified: ' + lastMod + b +
				'Loaded maximum first 10,000 characters.' + b +
			b;

			contentsText.innerText =  xhr.target.response.slice( 0, 10000 );

		} else {

		}

	}


// not in use

	function stringify( items ) {

		var item, subLines;
		var lines = [];
		var keys = Object.keys( items );

		for ( var i = 0; i < keys.length; i++ ) {

			item = items[ keys[ i ] ];

			lines.push( item.text );

			subLines = stringify( item.children );

			for ( var j = 0; j < subLines.length; j++ ) {

				lines.push( '&nbsp;  ' + subLines[ j ] );

			}

		}

		return lines;

	}


// requestFile( 'http://analyticphysics.com/robots.txt' , function( xhr ){ console.log( 'xhr', xhr.target.response ); } );

	function requestFile( url, callback ) {

		var xhr;
		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onload = callback;
		xhr.send( null );

	}
