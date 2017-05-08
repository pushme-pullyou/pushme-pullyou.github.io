// TooToo enable you to browse public GitHub user or organization repos, gather their files names, create menus and displays the files
// See https://pushme-pullyou.github.io
// Copyright © 2017 Pushme Pullyou authors. MIT license.

	let TOO = {};
	var b = '<br>';

	TOO.setCSS = function() {

		let css, container, contents, hamburger, menu;
		const b = '<br>';

		css = document.body.appendChild( document.createElement('style') );
		css.innerHTML =
			'html, body { font: 12pt monospace; height: 100%; margin: 0; }' +
			'a { color: crimson; text-decoration: none; }' +
			'a:hover { text-decoration: underline; }' +
			'button, input[type=button] { background-color: #ccc; border: 2px #fff solid; color: #322; }' +
			'pre, blockquote { background-color: #eee; padding: 10px; }' +
			'summary { outline: none; }' +
			'summary h3 { display: inline; }' +

			'.popUp { background-color: white; border: 1px solid red; left: 180px; opacity: 1.0; padding: 5px; position: absolute; width: 120px; z-index: 10; }' +

			'#bars { color: crimson; cursor: pointer; font-size: 24pt; text-decoration: none; }' +

			'#container {  height: 100%; left: 0; position: absolute; transition: left 1s; width: 100%; }' +

// let each type of contents decide its best width and placement
			'#contents { border: 0px #ccc solid; height: 100%; left: 325px; position: absolute; width: ' + ( window.innerWidth - 325 ) + 'px; }' +

			'#editButton { background-color: #555; color: #fff; opacity: 0.5; padding: 8px; position: fixed; right: 20px; top: 20px; }' +
			'#editButton a { text-decoration: none; color: #fff; }' +

			'#hamburger { background-color: #eee; left: 325px; position: absolute; top: 20px;  z-index: 1 }' +

			'#menu { background-color: #eee; border: 1px #ccc solid; box-sizing:border-box; height: 100%; overflow-y: auto; padding: 0 10px; position: fixed; width: 325px; }' +

			'#nextFile { color: #888; font-size: 36pt; opacity: 0.5; padding: 8px; position: fixed; right: 20px; top: ' + (0.5 * window.innerHeight ) + 'px; }' +

			'#previousFile { color: #888; font-size: 36pt; opacity: 0.5; padding: 8px; position: fixed; margin-left: 350px; top: ' + (0.5 * window.innerHeight ) + 'px; }' +

			'#hamburger h2, #menu h2, #menu h4 {margin: 0; }' +
			'#menuBreadcrumbs h2, #menuBreadcrumbs h3 { font-size: 14pt; margin: 0; }' +
			'#editButton:hover, #previousFile:hover, #nextFile:hover { cursor: pointer; opacity: 1; }' +
			'#nextFile a, #previousFile a { text-decoration: none; color: #888; }' +

		'';

	}

	TOO.init = function( user ) {

		TOO.user    = user.user;
		TOO.repo    = user.repo;
		TOO.branch  = user.branch;
		TOO.folder  = user.folder
		TOO.noIndex = user.noIndex,
		TOO.rawgit  = user.rawgit

//		TOO.path = null;
//		TOO.file = null;

		TOO.contents = contents;
		TOO.breadcrumbs = menuBreadcrumbs;
		TOO.menuTitle = menuTitle;
		TOO.menu = menu;
		TOO.menuItems = menuItems;
		TOO.menuInfo = menuInfo;

		TOO.setMenu = TOO.setMenuContents ? TOO.setMenuContents : TOO.setMenuDefault;

// trick to get TooToo to read the local file and view current edits

		if ( location.hash.includes( '@@@' ) ) {

			TOO.urlGHPages = '';

		} else if ( TOO.rawgit ) {

			TOO.urlGHPages = 'https://rawgit.com/' + TOO.user + '/' + TOO.repo + '/' + TOO.branch + '/' + TOO.folder + ( TOO.folder ? '/' : '' );

		} else {

			TOO.urlGHPages = 'https://' + TOO.user + '.github.io/' + TOO.repo + '/' + TOO.folder + ( TOO.folder ? '/' : '' );

		}

		TOO.getButtons();

		TOO.requestAPIContents();

	}


	TOO.getButtonsvvv = function() {

		TOO.editButton = document.body.appendChild( document.createElement( 'div' ) );
		TOO.editButton.id = 'editButton';
		TOO.editButton.innerHTML = 'Edit';
		TOO.editButton.title = 'Update this page using the GitHub source code editor';

		TOO.nextFile = document.body.appendChild( document.createElement( 'div' ) );
		TOO.nextFile.id = 'nextFile';
		TOO.nextFile.innerHTML = '&gt;';
		TOO.nextFile.title = 'Next file';

		TOO.previousFile = container.appendChild( document.createElement( 'div' ) );
		TOO.previousFile.id = 'previousFile';
		TOO.previousFile.innerHTML = '&lt;';
		TOO.previousFile.title = 'Previous file';

	}

	TOO.getButtons = function() {

		editButton = document.body.appendChild( document.createElement( 'div' ) );
		editButton.id = 'editButton';
		editButton.innerHTML = 'Edit';
		editButton.title = 'Update this page using the GitHub source code editor';
		TOO.editButton = editButton;

		nextFile = document.body.appendChild( document.createElement( 'div' ) );
		nextFile.id = 'nextFile';
		nextFile.innerHTML = '&gt;';
		nextFile.title = 'Next file';
		TOO.nextFile = nextFile;

		previousFile = container.appendChild( document.createElement( 'div' ) );
		previousFile.id = 'previousFile';
		previousFile.innerHTML = '&lt;';
		previousFile.title = 'Previous file';
		TOO.previousFile = previousFile;

	}

// request all the file names in the user's repo

	TOO.requestAPIContents = function() {

		let url, xhr, obj, treeNode;

		url = 'https://api.github.com/repos/' + TOO.user + '/' + TOO.repo + '/git/trees/' + TOO.branch + '?recursive=1';

		TOO.requestFile( url, callbackRequestFile );

		function callbackRequestFile( xhr ) {

			let response, paths, path;

			response = JSON.parse( xhr.target.response );

			paths = [];

			for ( let i = 0; i < response.tree.length; i++ ) {

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

			if ( location.hash ) {

				path = location.hash.slice( 1 ).split( '/' );

				TOO.file = path.pop();
				TOO.path = path.join( '/' );

				TOO.path = TOO.folder !== '' && TOO.folder === TOO.path ? '' : TOO.path;
				TOO.setMenu( TOO.path, TOO.file );

			} else {

				TOO.setMenu();

			}

		}


// http://stackoverflow.com/questions/17140711/how-to-show-a-list-or-array-into-a-tree-structure-in-javascript
// https://jsfiddle.net/z07q8omt/

			function buildTree( parts, treeNode ) {

				let keys, newNode;

				if ( parts.length === 0 ) { return; }

				keys = Object.keys( treeNode );

				for ( let i = 0 ; i < keys.length; i++ ) {

					if ( parts[ 0 ] === treeNode[ keys[ i ] ].text ) {

						buildTree( parts.splice( 1, parts.length ), treeNode[ keys[ i ] ].children );

						return;

					}

				}

				newNode = { 'text' : parts[ 0 ], 'children' : {} };

				treeNode[ newNode.text ] = newNode;

				buildTree( parts.splice( 1, parts.length ), newNode.children );

			}

	}


	TOO.setMenuDefault = function( path, file ) {

		TOO.file = file;
		TOO.path = path;

		let folders, obj;
		let foldersText, filesText;
//		let count, pathString;
		TOO.files = [];
		TOO.menuTitle.innerHTML="All Files";
		TOO.menuItems.innerHTML = '';

		folders = path ? path.split( '/' ) : [] ;

		obj = TOO.folder ? TOO.data[ TOO.folder ] : TOO.data;

// I don't really understand what is happening here, but it works...
// without the loop, the menu re-displays the current menu
// with the loop the menu displays the items in the just-selected folder

		for ( let i = 0; i < folders.length; i++ ) {

			obj = obj.children[ folders[ i ] ];

		}

		TOO.keys = Object.keys( obj.children );
		foldersText = '';
		filesText = ''; // '<small> Use tag and shift-tab to browse files quickly </small>' + b;
		count = 0;

		pathString = path ? path + '/' : '';

		TOO.keys = TOO.cleanUp( TOO.keys );

		for ( let i = 0; i < TOO.keys.length; i++ ) {

			key = TOO.keys[ i ];

			if ( Object.keys( obj.children[ key ].children ).length > 0 ) { // it's a folder

				foldersText +=

				' &#x1f4c1; <a href=JavaScript:TOO.setMenu("' + pathString + encodeURI( key ) + '"); >' +
					key +
				'</a>'+
				b;

			} else if ( key.indexOf( '.thumb.' ) === -1  ) { // it's a file

				filesText +=

				'<div id=file' + ( count++ ) + ' style=width:100%; >' +
					'<a href=JavaScript:TOO.getFileSetContents("' + pathString + '","' + encodeURI( key ) + '"); >' +
						key +
					'</a>' +
				'</div>';

				TOO.files.push( key );

			}

		}

		TOO.setBreadcrumbs( path );

		TOO.menuItems.innerHTML = foldersText + filesText;

		TOO.menuInfo.innerHTML = '<div> Number of files found: ' + TOO.length + b + b +

			'<a href="https://github.com/' + TOO.user + '/' + TOO.repo + '" target="_blank"> View repository on GitHub </a>' +

		'</div>';

		if ( TOO.file !== undefined ){

			TOO.getFileSetContents( pathString, TOO.file );

		} else {

			TOO.setDefaultContents( pathString, filesText );

		}

//		history.replaceState( '', document.title, window.location.pathname );

	}


	TOO.cleanUp = function( keys ){ return keys; };





	TOO.setBreadcrumbs = function( path ) {

		let name, txt, folders, str;

		name = TOO.folder ? TOO.folder : TOO.repo;

		txt = '<h2><a href=JavaScript:TOO.setMenu(); >' + name + '</a> &raquo; </h2>';
		folders = path ?  path.split( '/' ) : [] ;
		str = '';

		for ( let i = 0; i < folders.length; i++ ) {

			str += folders[ i ] + '/';

			txt += '<h3><a href=JavaScript:TOO.setMenu("' + str.slice( 0, -1 ) + '"); >' + folders[ i ] + '</a> &raquo; </h3>';

		}

		TOO.breadcrumbs.innerHTML = txt;

	}


// try to pick the most logical file to display, highlight it and display it contents

	TOO.setDefaultContents = function( path, filesText ) {

		let txt, start, file;

		txt = filesText.toLowerCase();

		if ( txt.includes( 'index.html' ) && TOO.noIndex !== true ) {

			start = txt.indexOf( 'index.html' );

			file =  filesText.slice( start, start + 10 );

// use getFileSetContents...
			location.hash = path + file;

			TOO.getFileHTML( TOO.urlGHPages + path + file );

		} else if ( txt.includes( 'readme.md' ) ) {

			start = txt.indexOf( 'readme.md' );

			file =  filesText.slice( start, start + 9 );

			location.hash = path + file;

			TOO.getFileMD( TOO.urlGHPages + path + file );

			file1.focus();

		} else if ( txt.includes( 'toogallery') ) {

			TOO.createPageOfImages( TOO.urlGHPages + path , TOO.keys );

		} else {

			file = TOO.files[ 0 ];
			TOO.getFileSetContents( path, file  );

		}

		TOO.file = file;
		TOO.setButtons( path, file );

	}


// formats to consider adding: PDF, STL & 3D formats
// https://mozilla.github.io/pdf.js/

	TOO.getFileSetContents = function( path, file ){

		if ( file === undefined ) {

			folder = TOO.folder ? TOO.folder + '/' : '';
			location.hash = path + folder;
			TOO.contents.innerHTML = '<center>no files in this folder</center>';
			return;

		}

		url = TOO.urlGHPages + path + encodeURI( file );

		folder = TOO.folder ? TOO.folder + '/' : '';

// why here
		location.hash = path + folder + file;

		let u = url.toLowerCase();

		if ( u.endsWith( '.md' ) ){

			TOO.getFileMD( url );

		} else if ( u.endsWith( '.html' ) || u.endsWith( '.htm' ) ) {

			TOO.getFileHTML( url );

		} else if ( u.endsWith( '.gif' ) || u.endsWith( '.ico' ) || u.endsWith( '.jpg' ) || u.endsWith( '.png' ) ||  u.endsWith( '.svg' ) ) {

			TOO.getFileImage( url );

		} else {

			TOO.getFileCode( url );

		}

		TOO.setButtons( path, file );

	};


// edit, next and previous buttons
	TOO.setButtons = function( path, file ) {

console.log( 'file', path,' - ', file );

		if ( TOO.editButton ) {

			folder = TOO.folder ? TOO.folder + '/' : '';

			TOO.editButton.innerHTML = '<a href="https://github.com/' + TOO.user + '/' + TOO.repo + '/blob/' + TOO.branch + '/' + folder + path + file + '" target="_blank"> Edit </a>';
		}

//		index = TOO.files.indexOf( path ? path : './' + file );
		index = TOO.files.indexOf( path + file );

		if ( path === '' && file === 'README.md' ) { index = 0; }

		for ( let i = 0; i < TOO.files.length; i++ ) {

			el = document.getElementById( 'file' + i );

			col = ( i === index ) ? '#ccc' : '';

			el.style.backgroundColor = col;

		}

//		if ( path === '' & file === 'README.md') { }

		indexNext = index + 1;

		if ( index >= TOO.files.length - 1 ) { indexNext = 0; }

		indexPrevious = index - 1;

		if ( index <= 0 ) { indexPrevious = TOO.files.length - 1; }

		if ( TOO.nextFile || TOO.previousFile ) {

			TOO.nextFile.innerHTML = '<a href=JavaScript:TOO.getFileSetContents("' + path + '","' + encodeURI( TOO.files[indexNext] ) + '"); > &gt; </a>';

			TOO.previousFile.innerHTML = '<a href=JavaScript:TOO.getFileSetContents("' + path + '","' + encodeURI( TOO.files[indexPrevious] ) + '"); > &lt; </a>';

		} else {



		}

	}


	TOO.getFileMD = function( url ) {

// https://github.com/showdownjs/showdown

		showdown.setFlavor('github');

		let converter = new showdown.Converter();

		TOO.requestFile( url, callbackMD );

		function callbackMD( xhr ) {

			TOO.contents.innerHTML =

			'<div style="border: 0px red solid; margin: 0 auto; width: 800px; position: relative;" >' +
				converter.makeHtml( xhr.target.response ) +
			'</div>';

			TOO.getFileDataXHR( xhr );

		}

	}


	 TOO.getFileHTML = function( url ){

		TOO.contents.innerHTML =
			'<iframe id=ifr src=' + url + ' width=' + ( window.innerWidth - 325 ) + ' height=' + ( window.innerHeight - 5 ) +
			' style="border:0px solid red"; >' +
		'<iframe>';

// how to catch and display errors loading iframes?

// improve this...

		menuFileData.innerHTML =
			'URL: ' + url.slice( 8 ).link( url ) + b +
		b;

	};


	 TOO.getFileImage = function( url ){

		TOO.contents.innerHTML =
			'<img id=image src="' + url +
			'" style="border:2px solid gray; margin: 25px 0 0 50px; max-width: 800px; " >';

		menuFileData.innerHTML =
			'URL: ' + url.slice( 8 ).link( url ) + b +
		b;

	};


	 TOO.getFileCode = function( url ) {

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

			TOO.requestFile( url, callback );

			function callback( xhr ) {

				TOO.getFileDataXHR( xhr );
				TOO.editor.setValue( xhr.target.response.slice( 0, 10000 ), -1 );

			}

		}

	};


	 TOO.createPageOfImages = function( path, photos ) {

		let page, item, item2, fileName;

		page = '';

		for ( let i = 0; i < photos.length; i++ ) {

			item = photos[ i ];
//			item2 = item.split( '/' )

//			fileName = item2.pop();
			fileName = item.replace( /[-_]/g, ' ' );
//console.log( 'item', item );

			page += '<div style=display:inline-block;margin:10px; >' +
				'<a href=JavaScript:TOO.getFileSetContents("' + path + item +'"); ><img src=' + path + encodeURI( item ) + ' height=200; title="' + fileName.slice( 0, -4 ) + '" ></a>' +
			'</div>';

		}

//console.log( 'page', page  );

		TOO.contents.innerHTML = page;

	}


	TOO.getFileDataXHR = function( xhr ) {

		let lastMod = xhr.target.getResponseHeader ( "Last-Modified" );

		menuFileData.innerHTML =
			'<small><i>Loaded maximum first 10,000 characters.<br></i></small>' + b +
			'URL: ' + b + xhr.target.responseURL.slice( 8 ).link( xhr.target.responseURL ) + b +
// or xhr.total ??
			'Size: ' + xhr.loaded.toLocaleString() + ' bytes' + b +
			'Last modified: ' + b + lastMod + b +
		'';

	}


// test: requestFile( 'http://http://jaanga.github.io/readme.md' , function( xhr ){ console.log( 'xhr', xhr.target.response ); } );

	 TOO.requestFile = function( url, callback ) {

		let xhr;
		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function(){ console.log( xhr ); }
		xhr.onload = callback;
		xhr.send( null );

	}


	TOO.menuSettings =

		'<details>' +

			'<summary><h3>Settings</h3></summary>' +

			'<div><button onclick=TOO.cssColorsDark();  >Dark</button>' +
				' <button onclick=TOO.cssColorsLight(); >Light</button>' +
				' <button onclick=TOO.cssColorsSepia(); >Sepia</button>' +
			'</div>' + b +

			'<div><button onclick=TOO.cssFontOpenSans(); >Open Sans</button>' +
				' <button onclick=TOO.cssFontInconsolata(); >Inconsolata</button>' +
				' <button onclick=TOO.cssFontMonospace(); >Monospace</button>' +
			'</div>' + b +

			'<div><button onclick=TOO.cssFontSizeNormal(); >Normal</button>' +
				' <button onclick=TOO.cssFontSizeLarger(); >Larger</button>' +
				' <button onclick=TOO.cssFontSizeLargest(); >Largest</button>' +
			'</div>' + b +

		'</details>' +
	'';


	TOO.cssColorsDark = function() {

		document.body.style.backgroundColor = '#222';
		document.body.style.color = '#ddd';
		TOO.menu.style.backgroundColor = '#555';

	};

	TOO.cssColorsLight = function() {

		document.body.style.backgroundColor = '#fff';
		document.body.style.color = '#000';
		TOO.menu.style.backgroundColor = '#eee';

	};

	TOO.cssColorsSepia = function() {

		document.body.style.backgroundColor = '#f3eacb';
		document.body.style.color = '#704214';
		TOO.menu.style.backgroundColor = '#704214';

	};

	TOO.cssFontOpenSans = function() {

		let fontID = 'Open+Sans';

		let font = document.body.appendChild( document.createElement( 'link' ) );
		font.id = fontID;
		font.rel = 'stylesheet';
		font.href = 'https://fonts.googleapis.com/css?family=' + fontID;

		document.body.style.fontFamily = 'Open Sans';

	};

	TOO.cssFontInconsolata = function() {

		let fontID = 'Inconsolata';

		let font = document.body.appendChild( document.createElement( 'link' ) );
		font.id = fontID;
		font.rel = 'stylesheet';
		font.href = 'https://fonts.googleapis.com/css?family=' + fontID;

		document.body.style.fontFamily = 'Inconsolata';

	};

	TOO.cssFontMonospace = function() {

		document.body.style.fontFamily = 'monospace';

	};

	TOO.cssFontSizeNormal = function() {

		document.body.style.fontSize = '12pt';

	};

	TOO.cssFontSizeLarger = function() {

		document.body.style.fontSize = '14pt';

	};

	TOO.cssFontSizeLargest = function() {

		document.body.style.fontSize = '18pt';

	}