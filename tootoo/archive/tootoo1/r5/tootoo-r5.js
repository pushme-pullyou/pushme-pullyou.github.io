// Copyright © 2017 Jaanga authors. MIT license.

	var TOO = {};
	var b = '<br>';

	TOO.init = function( user ) {

		TOO.user    = user.user;
		TOO.repo    = user.repo;
		TOO.branch  = user.branch;
		TOO.folder  = user.folder
		TOO.noIndex = user.noIndex,
		TOO.rawgit  = user.rawgit

		TOO.contents = contents;
		TOO.breadcrumbs = menuBreadcrumbs;
		TOO.menu = menuItems;
		TOO.menuInfo = menuInfo;

		TOO.url = 'https://api.github.com/repos/' + TOO.user + '/' + TOO.repo + '/git/trees/' + TOO.branch + '?recursive=1';

		if ( TOO.rawgit ) {

			TOO.urlGHPages = 'https://rawgit.com/' + TOO.user + '/' + TOO.repo + '/' + TOO.branch + '/' + TOO.folder + ( TOO.folder ? '/' : '' );

		} else {

			TOO.urlGHPages = 'https://' + TOO.user + '.github.io/' + TOO.repo + '/' + TOO.folder + ( TOO.folder ? '/' : '' );

		}

		getButtons();

		requestAPIContents();

	}


	function getButtons() {

		button = document.body.appendChild( document.createElement( 'div' ) );
		button.id = 'button';
		button.innerHTML = 'Edit';
		TOO.button = button;

		nextFile = document.body.appendChild( document.createElement( 'div' ) );
		nextFile.id = 'nextFile';
		nextFile.innerHTML = '&gt;';
		TOO.nextFile = nextFile;

		previousFile = container.appendChild( document.createElement( 'div' ) );
		previousFile.id = 'previousFile';
		previousFile.innerHTML = '&lt;';
		TOO.previousFile = previousFile;

	}


	function requestAPIContents() {

		var xhr, obj, treeNode;

		requestFile( TOO.url, callbackRequestFile );

		function callbackRequestFile( xhr ) {

			var response, paths, path;

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
		var foldersText, filesText;
		var count, pathString;
		TOO.files = [];

		folders = path ? path.split( '/' ) : [] ;

		obj = TOO.folder ? TOO.data[ TOO.folder ] : TOO.data;

// I don't really understand what is happening here, but it works...
// without the loop, the menu re-displays the current menu
// with the loop the menu displays the items in the just-selected folder

		for ( var i = 0; i < folders.length; i++ ) {

			obj = obj.children[ folders[ i ] ];

		}

		TOO.keys = Object.keys( obj.children );
		foldersText = '';
		filesText = ''; // '<small> Use tag and shift-tab to browse files quickly </small>' + b;
		count = 0;

		pathString = path ? path + '/': '';

		for ( var i = 0; i < TOO.keys.length; i++ ) {

			key = TOO.keys[ i ];

			if ( Object.keys( obj.children[ key ].children ).length > 0 ) {

				foldersText += ' &#x1f4c1; <a href=JavaScript:setMenu("' + pathString + encodeURI( key ) + '"); >' + key + '</a>'+ b; // it's a folder

			} else {

				filesText += '<div id=file' + ( count++ ) + ' style=width:100%; ><a  href=JavaScript:getFileSetContents("' + pathString + '","' + encodeURI( key ) + '"); >' +
					key +
				'</a></div>';

				TOO.files.push( key );
			}

		}

		setBreadcrumbs( path );

		TOO.menu.innerHTML = foldersText + filesText;

		TOO.menuInfo.innerHTML = '<div> Number of files found: ' + TOO.length + b + b +

			'<a href="https://github.com/' + TOO.user + '/' + TOO.repo + '" target="_blank"> View repository on GitHub </a>' +

		'</div>';

		setDefaultContents( pathString, filesText );

//		history.replaceState( '', document.title, window.location.pathname );

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

			file =  TOO.files[ 0 ];
			getFileSetContents( path, file  );

		}

		setButtons( path, file );

	}


// formats to consider adding: PDF, STL & 3D formats
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

		setButtons( path, file );

	}


	function setButtons( path, file ) {

		if ( TOO.button ) {

			TOO.button.innerHTML = '<a href="https://github.com/' + TOO.user + '/' + TOO.repo + '/blob/' + TOO.branch + '/' + path + file + '" target="_blank"> Edit </a>';
		}

		index = TOO.files.indexOf( file );

		for ( var i = 0; i < TOO.files.length; i++ ) {

			el = document.getElementById( 'file' + i );

			col = ( i === index )  ? '#ccc' : '';

			el.style.backgroundColor = col;

		}

		indexNext = index + 1;

		if ( index >= TOO.files.length - 1 ) { indexNext = 0; }

		indexPrevious = index - 1;

		if ( index <= 0 ) { indexPrevious = TOO.files.length - 1; }

		if ( TOO.nextFile ) {

			TOO.nextFile.innerHTML = '<a href=JavaScript:getFileSetContents("' + path + '","' + encodeURI( TOO.files[indexNext] ) + '"); > &gt; </a>';

			TOO.previousFile.innerHTML = '<a href=JavaScript:getFileSetContents("' + path + '","' + encodeURI( TOO.files[indexPrevious] ) + '"); > &lt; </a>';

		}

	}


	function getFileMD( url ) {

// https://github.com/showdownjs/showdown

		showdown.setFlavor('github');

		var converter = new showdown.Converter();

		requestFile( url, callbackMD );

		function callbackMD( xhr ) {

			TOO.contents.innerHTML =

			'<div style="border: 0px red solid; margin: 0 auto; width: 800px; position: relative;" >' +
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

// improve this...

		menuFileData.innerHTML =
			'URL: ' + url.slice( 8 ).link( url ) + b +
		b;

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
			'<div id=contentsCode style="border: 0px red solid; height: 100%; margin: 0 auto; width: 900px; position: relative;" >' +
			' item will appear here ' +
		'</div>';

		if ( TOO.editor ) {

			setEditContents();

		} else {

// check here for latest: https://cdnjs.com/libraries/ace/
// Anyway to get latest automatically?

			TOO.editor = document.body.appendChild( document.createElement( 'script' ) );
			TOO.editor.onload = setEditContents;
			TOO.editor.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js';

		}

		function setEditContents() {

			TOO.editor = ace.edit( 'contentsCode' );
			TOO.editor.$blockScrolling = Infinity;
			TOO.editor.getSession().setMode( 'ace/mode/markdown' );

			requestFile( url, callback );

			function callback( xhr ) {

				getFileDataXHR( xhr );
				TOO.editor.setValue( xhr.target.response.slice( 0, 10000 ), -1 );

			}

		}

	}


	function createPageOfImages( path, photos ) {

		var page, item, item2, fileName;

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


// test: requestFile( 'http://http://jaanga.github.io/readme.md' , function( xhr ){ console.log( 'xhr', xhr.target.response ); } );

	function requestFile( url, callback ) {

		var xhr;
		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onload = callback;
		xhr.send( null );

	}
