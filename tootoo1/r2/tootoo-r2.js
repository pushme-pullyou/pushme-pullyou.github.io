// Copyright © 2016 Jaanga authors. MIT license.

	var b = '<br>';
	var editor;

	function requestAPIContents() {

		var xhr, response, paths, path, treeNode, newNode, keys;

		requestFile( TRE.url, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );

			paths = [];

			for ( var i = 0; i < response.tree.length; i++ ) {

				path = response.tree[ i ].path;

				if ( path.startsWith( '.' ) ) { continue; }

				if ( TRE.folder !== '' && !path.includes( TRE.folder ) ) { continue; }

				paths.push( path );

			}

			if ( TRE.folder === '' ) {

				TRE.data = { 'children' : {} };
				obj = TRE.data.children;

			} else {

				TRE.data = {};
				obj = TRE.data

			}

/*
			for ( var i = 0 ; i < paths.length; i++ ) {

				buildTree( paths[ i ].split( '/' ), TRE.data.children );

			}
*/

			paths = paths.map( function( path ) { return buildTree( path.split( '/' ), obj ) } );

//debugger;

			function buildTree( parts, treeNode ) {

				if ( parts.length === 0 ) { return; }

				keys = Object.keys( treeNode );

				for ( var i = 0 ; i < keys.length; i++ ) {

					if ( parts[ 0 ] === treeNode[ keys[ i ] ].text ) {

						buildTree( parts.splice( 1, parts.length ), treeNode[ keys[ i ] ].children );

						return;
					}

				}

				newNode = { 'text' : parts[ 0 ], 'children' : {} };

				treeNode[ newNode.text ] = newNode;

				buildTree( parts.splice( 1, parts.length ), newNode.children );

			}

			menuInfo.innerHTML = '<p> Number of items found: ' + paths.length + b +
			
				'<a href="https://github.com/' + TRE.user + '/' + TRE.repo + '" target="_blank"> View repository on GitHub </a>' +
			'</p>';

			setMenu();

		}

	}


	function setMenu( path ) {

		var folders, obj, keys;
		var foldersText, filesText;

		folders = path ? path.split( '/' ) : [] ;

		obj = TRE.folder ? TRE.data[ TRE.folder ] : TRE.data;

// very curious things going on here, but it works...

		for ( var i = 0; i < folders.length; i++ ) {

			obj = obj.children[ folders[ i ] ];

		}

		keys = Object.keys( obj.children );
		foldersText = '';
		filesText = '';

		p = path ? path + '/': '';

		for ( var i = 0; i < keys.length; i++ ) {

			key = keys[ i ];

			if ( Object.keys( obj.children[ key ].children ).length > 0 ) {

				foldersText += ' &#x1f4c1; <a href=JavaScript:setMenu("' + p + encodeURI( key ) + '"); >' + key + '</a>'+ b;

			} else {

				filesText += '<a href=JavaScript:getFileSetContents("' + p + encodeURI( key ) + '"); >' + key + '</a>'+ b;

			}

		}

		TRE.menu.innerHTML = foldersText + filesText;

		setBreadcrumbs( path );

		setDefaultContents( path, filesText );

	}


	function setBreadcrumbs( path ) {

		var name, txt, folders, str;

		name = TRE.folder ? TRE.folder : TRE.repo;

		txt = '<h2><a href=JavaScript:setMenu(); >' + name + '</a> &raquo; </h2>';
		folders = path ?  path.split( '/' ) : [] ;
		str = '';

		for ( var i = 0; i < folders.length; i++ ) {

			str += folders[ i ] + '/';

			txt += '<h3><a href=JavaScript:setMenu("' + str.slice( 0, -1 ) + '"); >' + folders[ i ] + '</a> &raquo; </h3>';

		}

		TRE.breadcrumbs.innerHTML = txt;

	}


	function setDefaultContents( path, filesText ) {

		var p, txt, start, file;

		p = path ? path + '/': '';

		txt = filesText.toLowerCase();

		if ( txt.includes( 'index.html' ) ) {

			start = txt.indexOf( 'index.html' );

			file =  filesText.slice( start, start + 10 );

			getFileHTML( TRE.urlGHPages + p + file );

		} else if ( txt.includes( 'readme.md' ) ) {

			start = txt.indexOf( 'readme.md' );

			file =  filesText.slice( start, start + 9 );

			getFileMD( TRE.urlGHPages + p + file );

		} else {

			contents.innerHTML = '<h2 style="margin:200px 0 0 50px;" > Select a file to view from the menu </h2>';

		}

	}

// formats to consider adding: PDF
// https://mozilla.github.io/pdf.js/

	function getFileSetContents( path ){

		var p = path.toLowerCase();

		if ( p.endsWith( '.md' ) ){

			getFileMD( TRE.urlGHPages + encodeURI( path ) );

		} else if ( p.endsWith( '.html' ) || p.endsWith( '.htm' ) ) {

			getFileHTML( TRE.urlGHPages + encodeURI( path ) );

		} else if ( p.endsWith( '.gif' ) || p.endsWith( '.ico' ) || p.endsWith( '.jpg' ) || p.endsWith( '.png' ) ||  p.endsWith( '.svg' ) ) {

			getFileImage( TRE.urlGHPages + encodeURI( path ) );

		} else {

			getFileCode( TRE.urlGHPages + encodeURI( path ) );

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

		menuFileData.innerHTML =
			'URL: ' + url.slice( 8 ).link( url ) + b +
		b;

	}


	function getFileImage( url ){

		contents.innerHTML = 
			'<img id=image src=' + url + 
			' style="border:2px solid gray; margin: 25px 0 0 50px;" >';

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

			var lastMod = xhr.target.getResponseHeader ( "Last-Modified" );

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
