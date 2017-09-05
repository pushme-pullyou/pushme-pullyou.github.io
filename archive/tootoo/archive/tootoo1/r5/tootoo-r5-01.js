// Copyright © 2017 Jaanga authors. MIT license.

	var TOO = { release: 'r4' };

	var b = '<br>';
	var editor;

	function requestAPIContents() {

		var xhr, response, path, paths, obj, treeNode;

		TOO.url = 'https://api.github.com/repos/' + TOO.user + '/' + TOO.repo + '/git/trees/' + TOO.branch + '?recursive=1';

//		TOO.urlGHPages = 'https://' + TOO.user + '.github.io/' + TOO.repo + '/' + TOO.folder + ( TOO.folder ? '/' : '' );

		requestFile( TOO.url, rFcallback );

		function rFcallback( xhr ) {

			response = JSON.parse( xhr.target.response );

			paths = [];

			for ( var i = 0; i < response.tree.length; i++ ) {

				path = response.tree[ i ].path;

				if ( path.startsWith( '.' ) ) { continue; } // .gitignore, gitattributes etc

				if ( !path.includes( TOO.folder ) && TOO.folder !== '' ) { continue; } // 'wanted folder not in path and not in root folder

				paths.push( path );

			}

			TOO.length = paths.length;

			if ( TOO.folder === '' ) { // we are in top folder

				TOO.data = { 'children' : {} };
				obj = TOO.data.children;

			} else {

				TOO.data = {};
				obj = TOO.data

			}

			paths.map( function( path ) { return buildTree( path.split( '/' ), obj ) } );


//debugger;

// http://stackoverflow.com/questions/17140711/how-to-show-a-list-or-array-into-a-tree-structure-in-javascript
// https://jsfiddle.net/z07q8omt/

			function buildTree( parts, treeNode ) {

				var keys, newNode;

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

			setMenu();

		}

	}


	function setMenu( path ) {

		var folders, obj;
//		var foldersText, filesText;
		var count, p;
		TOO. files = [];

		folders = path ? path.split( '/' ) : [] ;

		obj = TOO.folder ? TOO.data[ TOO.folder ] : TOO.data;

		TOO.keys = Object.keys( obj.children );
		foldersText = '';
		filesText = ''; // '<small> Use tag and shift-tab to browse files quickly </small>' + b;
		count = 0;

		p = path ? path + '/': '';

		for ( var i = 0; i < TOO.keys.length; i++ ) {

			key = TOO.keys[ i ];

			if ( Object.keys( obj.children[ key ].children ).length > 0 ) {

				foldersText += ' &#x1f4c1; <a href=JavaScript:setMenu("' + p + encodeURI( key ) + '"); >' + key + '</a>'+ b; // it's a folder

			} else {

				filesText += '<a id=file' + ( count++ ) + ' href=JavaScript:getFileSetContents("' + p + '","' + key + '"); >' +
					key +
				'</a>'+ b;
				TOO.files.push( key );
			}

		}

// console.log( 'files', TOO.files);

		history.replaceState( '', document.title, window.location.pathname );

		TOO.menu.innerHTML = foldersText + filesText;

		setBreadcrumbs( path );

		setDefaultContents( p, filesText );

		TOO.menuInfo.innerHTML = '<p> Number of files found: ' + TOO.length + b + b +

			'<a href="https://github.com/' + TOO.user + '/' + TOO.repo + '" target="_blank"> View repository on GitHub </a>' +

		'</p>';

		if ( TOO.button ) {

			TOO.button.innerHTML = '<a href="https://github.com/' + TOO.user + '/' + TOO.repo + '/blob/' + TOO.branch + '/' + p + key + '" target="_blank"> Edit </a>';
		}

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


	function setEditButton( path, file ) {

		if ( TOO.button ) {

			TOO.button.innerHTML = '<a href="https://github.com/' + TOO.user + '/' + TOO.repo + '/blob/' + TOO.branch + '/' + path + file + '" target="_blank"> Edit </a>';
		}

	}


	function getNextPreviousButtons() {

		nextFile = document.body.appendChild( document.createElement( 'div' ) );
		nextFile.id = 'nextFile';
		nextFile.innerHTML = '&gt;';
		nextFile.style.cssText = 'color: #888; font-size: 36pt; opacity: 0.5; padding: 8px; position: fixed; right: 20px; top: ' + (0.5 * window.innerHeight ) + 'px; ';


		previousFile = document.body.appendChild( document.createElement( 'div' ) );
		previousFile.id = 'previousFile';
		previousFile.innerHTML = '&lt;';
		previousFile.style.cssText = 'color: #888; font-size: 36pt; opacity: 0.5; padding: 8px; position: fixed; left: 350px; top: ' + (0.5 * window.innerHeight ) + 'px; ';

		TOO.nextFile = nextFile;
		TOO.previousFile = previousFile;

	}

	function setNextPreviousButtons( path, file ) {

		index = TOO.files.indexOf( file );

		el = document.getElementById( 'file' + index );

		for ( var i = 0; i < TOO.files.length; i++ ) {

			el = document.getElementById( 'file' + i );

			col = ( i === index )  ? 'orange' : '';

			el.style.backgroundColor = col;

		}

		indexNext = TOO.files.indexOf( file ) + 1;

		if ( indexNext >= TOO.files.length ) { indexNext = 0; }

		indexPrevious = TOO.files.indexOf( file ) - 1;

		if ( indexPrevious < 0 ) { indexPrevious = TOO.files.length - 1; }

		if ( TOO.nextFile ) {

	//		TOO.nextFile.innerHTML = '<a style=text-decoration;none; href=JavaScript:getFileSetContents("' + path + '","' + TOO.files[indexNext] + '"); > &gt; </a>';
			TOO.nextFile.innerHTML = '<a href=JavaScript:getFileSetContents("' + path + '","' + TOO.files[indexNext] + '"); > &gt; </a>';

			TOO.previousFile.innerHTML = '<a href=JavaScript:getFileSetContents("' + path + '","' + TOO.files[indexPrevious] + '"); > &lt; </a>';

		}

//		location.hash = 'https://github.com/' + TOO.user + '/' + TOO.repo + '/blob/' + TOO.branch + '/' + path + TOO.files[ index ]

	}


	function setDefaultContents( path, filesText ) {

		var txt, start, file;

		txt = filesText.toLowerCase();

		if ( location.hash ) { return; }

		if ( txt.includes( 'index.html' ) && TOO.noIndex !== 'true' ) {

			start = txt.indexOf( 'index.html' );

			file =  filesText.slice( start, start + 10 );

			getFileHTML( TOO.urlGHPages + path + file );

		} else if ( txt.includes( 'readme.md' ) ) {

			start = txt.indexOf( 'readme.md' );

			file =  filesText.slice( start, start + 9 );

			getFileMD( TOO.urlGHPages + path + file );

			file1.focus();

		} else if ( txt.includes( 'toogallery') ) {

			createPageOfImages( TOO.urlGHPages + path , TOO.keys );

		} else {

//			if ( path !== '' ) { file0.focus(); }

//			contents.innerHTML = '<h2 style="margin:200px 0 0 50px;" > Select a file to view from the menu </h2>';

		}


		setEditButton( path, file );
		setNextPreviousButtons( path, file );

	}


// formats to consider adding: PDF
// https://mozilla.github.io/pdf.js/

	function getFileSetContents( path, file ){

		url = TOO.urlGHPages + path + encodeURI( file );

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

		setEditButton( path, file );
		setNextPreviousButtons( path, file )

	}


	function getFileMD( url ) {

		var converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });

		requestFile( url, callbackMD );

		function callbackMD( xhr ) {

// console.log( 'resp', xhr.target.response );

			TOO.contents.innerHTML =

				'<div style=margin-left:50px;max-width:800px; >' +
					converter.makeHtml( xhr.target.response ) +
				'</div>';

			getFileDataXHR( xhr );

		}

	}


	function getFileHTML( url ){

		TOO.contents.innerHTML =
			'<iframe id=ifr src=' + url + ' width=' + ( window.innerWidth - 325 ) + ' height=' + ( window.innerHeight - 5 ) +
			' style="border:0px solid red"; >' +
		'<iframe>';

// how to catch and display errors loading iframes?

		menuFileData.innerHTML =
			'URL: ' + url.slice( 8 ).link( url ) + b +
		b;

//		if ( p !== '' ) { file0.focus(); }

	}


	function getFileImage( url ){

		TOO.contents.innerHTML =
			'<img id=image src="' + url +
			'" style="border:2px solid gray; margin: 25px 0 0 50px; max-width: 800px; " >';

		menuFileData.innerHTML =
			'URL: ' + url.slice( 8 ).link( url ) + b +
		b;

	}


	function getFileCode( url ) {

		TOO.contents.innerHTML =
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

		TOO.contents.innerHTML = page;

	}


	function getFileDataXHR( xhr ) {

		var lastMod = xhr.target.getResponseHeader ( "Last-Modified" );

		menuFileData.innerHTML =
			'<small><i>Loaded maximum first 10,000 characters.<br></i></small>' + b +
			'URL: ' + b + xhr.target.responseURL.slice( 8 ).link( xhr.target.responseURL ) + b +
			'Size: ' + xhr.total.toLocaleString() + ' bytes' + b +
			'Last modified: ' + b + lastMod + b +

		'';

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


// requestFile( 'http://http://jaanga.github.io/readme.md' , function( xhr ){ console.log( 'xhr', xhr.target.response ); } );

	function requestFile( url, callback ) {

		var xhr;
		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onload = callback;
		xhr.send( null );

	}
