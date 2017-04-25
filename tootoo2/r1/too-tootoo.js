	TOO = {};

	TOO.setCSS = function() {

		let css, container, contents, hamburger, menu;

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


	TOO.initUser = function( usr ) {

		user = usr;

		TOO.setMenu = TOO.setMenuContents ? TOO.setMenuContents : TOO.setMenuDefault;

		TOO.initButtons();

		if ( user.rawgit ) {

			urlGHPages = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/';

		} else {

			urlGHPages = 'https://' + user.user + '.github.io/' + user.repo + '/';

		}

		TOO.setMenu( user.path);

	}


	TOO.initButtons = function() {

		editButton = document.body.appendChild( document.createElement( 'div' ) );
		editButton.id = 'editButton';
		editButton.innerHTML = 'Edit';
		editButton.title = 'Update this page using the GitHub source code editor';

		nextFile = document.body.appendChild( document.createElement( 'div' ) );
		nextFile.id = 'nextFile';
		nextFile.innerHTML = '&gt;';
		nextFile.title = 'Next file';

		previousFile = container.appendChild( document.createElement( 'div' ) );
		previousFile.id = 'previousFile';
		previousFile.innerHTML = '&lt;';
		previousFile.title = 'Previous file';

	}


	TOO.setMenuDefault = function ( path ) {

		let fileName;

		fileName = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/contents/' + ( path ? path : '' );

		TOO.setBreadcrumbs( path );

		TOO.requestFile( fileName, TOO.callbackFolderContents );

	}


	TOO.callbackFolderContents = function( xhr ) {

		let response, items, item, count;

		response = xhr.target.response;
		items = JSON.parse( response );
//console.log( 'item', items );
		files = [];
		count = 0;
		menuItems.innerHTML = '';

		for ( let i = 0; i < items.length; i++ ) {

			item = items[ i ];

			if ( item.type === 'dir' ) {

				menuItems.innerHTML +=
					'<a href=# onclick=TOO.setMenuDefault("' + item.path  + '"); > 🗀 ' + item.name  + '</a>' + b +
				'';

			}

		}

		for ( i = 0; i < items.length; i++ ) {

			item = items[ i ];

			if ( item.type === 'file' ) {

				menuItems.innerHTML +=
//					'<a href=# onclick=ifr.src="' + urlGHPages + '/' + item.path + '"; >' + item.name  + '</a>' + b +
					'<a href=# id=file' + count++ + ' onclick=TOO.getFileSetContents("' + item.path + '"); > ' + item.name + '</a>' + b +

				'';

				files.push( item.path );

			}

		}

		TOO.setDefaultContents();

	}


	TOO.setDefaultContents = function() {

		let txt, start, file, f;

		for ( var i = 0; i < files.length; i++ ) {

			file = files[ i ];
			f = file.toLowerCase();

			if ( f === 'index.html' || f === 'index.htm') { TOO.getFileSetContents( file ); return; }
			if ( f === 'readme.md' ) { TOO.getFileSetContents( file ); return; }

		}

		TOO.getFileSetContents( files[ 0 ]  );

	}


	TOO.setBreadcrumbs = function( path ) {

		let name, txt, folders, str;

		name = user.folder ? user.folder : user.repo;

		txt = '<h3><a href=JavaScript:TOO.setMenuDefault(); >' + name + '</a> &raquo; </h3>';

		folders = path ? path.split( '/' ) : [] ;

		str = '';

		for ( let i = 0; i < folders.length; i++ ) {

			str += folders[ i ] + '/';

			txt += '<h3><a href=JavaScript:TOO.setMenuDefault("' + str.slice( 0, -1 ) + '"); >' + folders[ i ] + '</a> &raquo; </h3>';

		}

		breadcrumbs.innerHTML = txt;

	}





	TOO.getFileSetContents = function( path ) {

		let url, u;

		if ( path === undefined ) {

			contents.innerHTML = '<center>no files in this folder</center>';
			return;

		}

		url = urlGHPages + path;

		u = url.toLowerCase();

		if ( u.endsWith( '.md' ) ){

			TOO.getFileMD( url );

		} else if ( u.endsWith( '.html' ) || u.endsWith( '.htm' ) ) {

			TOO.getFileHTML( url );

		} else if ( u.endsWith( '.gif' ) || u.endsWith( '.ico' ) || u.endsWith( '.jpg' ) || u.endsWith( '.png' ) ||  u.endsWith( '.svg' ) ) {

			TOO.getFileImage( url );

		} else {

			TOO.getFileCode( url );

		}

		TOO.setHighlightAndButtons( path );

	}


	TOO.getFileHTML = function( url ){

		contents.innerHTML =
			'<iframe id=ifr src=' + url + ' width=' + ( window.innerWidth - 325 ) + ' height=' + ( window.innerHeight - 5 ) +
			' style="border:0 none; " >' +
		'<iframe>';

	}


	TOO.getFileMD = function( url ) {

	// https://github.com/showdownjs/showdown

		showdown.setFlavor('github');

		let converter = new showdown.Converter();

		TOO.requestFile( url, callbackMD );

		function callbackMD( xhr ) {

			contents.innerHTML =

			'<div style="border: 0px red solid; margin: 0 auto; width: 800px; position: relative;" >' +
				converter.makeHtml( xhr.target.response ) +
			'</div>';

		}

	}


	TOO.getFileImage = function( url ){

		contents.innerHTML = '<img src="' + url + '" style="border: 0px solid gray; margin: 25px 0 0 50px; max-width: 800px; " >';

	}


	TOO.getFileCode = function( url ) {

	// try embed gist
			contents.innerHTML =
				'<div id=contentsCode style="border: 0px red solid; height: 900px; margin: 0 auto; width: 900px; position: relative;" >' +
				' item will appear here ' +
			'</div>';

			if ( editor ) {

				setEditContents();

			} else {

	// check here for latest: https://cdnjs.com/libraries/ace/
	// Anyway to get latest automatically?
	// use GitHub code embed??

				editor = document.body.appendChild( document.createElement( 'script' ) );
				editor.onload = setEditContents;
				editor.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js';

			}

			function setEditContents() {

				editor = ace.edit( 'contentsCode' );
				editor.$blockScrolling = Infinity;
				editor.getSession().setMode( 'ace/mode/markdown' );

				TOO.requestFile( url, callback );

				function callback( xhr ) {

					editor.setValue( xhr.target.response.slice( 0, 10000 ), -1 );

				}

			}

	}


	TOO.createPageOfImages = function( path ) {

	//		let page,items,  item, item2, fileName;

			page = '';

			fileName = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/contents/' + path;

			TOO.setBreadcrumbs( path );

			TOO.requestFile( fileName, callbackGalleryContents );

			function callbackGalleryContents( xhr ){

				response = xhr.target.response;
				items = JSON.parse( response );

				for ( let i = 0; i < items.length; i++ ) {

					item = items[ i ];

					source = item.download_url;

					if ( source.includes( 'TOOgallery' ) || source.includes( '.thumb' ) || source.endsWith( '.dat' ) || source.endsWith( '.lock' ) ) { continue; }

					page += '<div style=display:inline-block;margin:10px; >' +
						'<a href=JavaScript:TOO.getFileSetContents("' + item.path +'"); ><img src=' + source + ' height=200; title="' + fileName.slice( 0, -4 ) + '" ></a>' +
					'</div>';

				}

		//console.log( 'page', page  );

				contents.innerHTML = page;

			}

	}



	TOO.setHighlightAndButtons = function( path ) {

//highlight
		index = files.indexOf( path );

		for ( let i = 0; i < files.length; i++ ) {

			el = document.getElementById( 'file' + i );

			col = ( i === index ) ? '#ccc' : '';

			el.style.backgroundColor = col;

		}

// buttons
		if ( editButton ) {

			folder = user.folder ? user.folder + '/' : '';

			editButton.innerHTML = '<a href="https://github.com/' + user.user + '/' + user.repo + '/blob/' + user.branch + '/' + folder + path + '" target="_blank"> Edit </a>';

		}

		indexNext = index + 1;

		if ( index >= files.length - 1 ) { indexNext = 0; }

		indexPrevious = index - 1;

		if ( index <= 0 ) { indexPrevious = files.length - 1; }

		if ( nextFile || previousFile ) {

			nextFile.innerHTML = '<a href=JavaScript:TOO.getFileSetContents("' + files[ indexNext ] + '"); > &gt; </a>';

			previousFile.innerHTML = '<a href=JavaScript:TOO.getFileSetContents("' + files[ indexPrevious ] + '"); > &lt; </a>';

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