
	let MNU = {};

	const b = '<br>';

var styles = [ createGroups, createTableOfContents, listAlphabetical ];

	MNU.init = function() {

		let txt;

		if ( MNU.tableOfContents ) {

				txt =
					'<p>' +
					'<button onclick=TOO.setMenu=TOO.setMenuContents;TOO.setMenu(); >Table of Contents</button>' +
					' <button onclick=TOO.setMenu=TOO.setMenuDefault;TOO.setMenu(); >All Files</button>' +
				'</p>';

		} else {

			txt =
			'<p id=fileCount ></p>' +

			'<p style=float:left;>' +
				'<select id=selContents onchange=styles[this.selectedIndex](); >' +
					'<option selected > Grouped </option>' +
					'<option> Table of Contents </option>' +
					'<option > Alphabetical </option>' +
				'<select>' +
			'</p>' +

			'<p id=mnuFileHeaders ></p>' +

			'<div id=pageLinks ></div>' +


			'<hr style=clear:both; >' +

			'<p id=fileNames ></p>';
		}

		mnuContents.innerHTML =

			txt +

			'<details open >' +

				'<summary><h3 id=menuTitle >Contents</h3></summary>' +

				'<div id=breadcrumbs ></div>' +
				'<div id=menuItems ></div>' +

			'</details>' + b +

		'';

		mnuSettings.innerHTML =

			'<details>' +

				'<summary><h3>Settings</h3></summary>' +

				'<div><button onclick=MNU.cssColors("#222","#ddd","#555");  >Dark</button>' +
					' <button onclick=MNU.cssColors("#fff","#000","#eee"); >Light</button>' +
					' <button onclick=MNU.cssColors("#f3eacb","#704214","#704214"); >Sepia</button>' +
				'</div>' + b +

				'<div><button onclick=MNU.cssFontOpenSans(); >Open Sans</button>' +
					' <button onclick=MNU.cssFontInconsolata(); >Inconsolata</button>' +
					' <button onclick=MNU.cssFontMonospace(); >Monospace</button>' +
				'</div>' + b +

				'<div><button onclick=MNU.cssFontSize("12pt"); >Normal</button>' +
					' <button onclick=MNU.cssFontSize("14pt"); >Larger</button>' +
					' <button onclick=MNU.cssFontSize("18pt"); >Largest</button>' +
				'</div>' + b +

			'</details>' +
		'';

		mnuAbout.innerHTML =

			'<details>' +

				'<summary><h3>About</h3></summary>' +

				'<p>Copyright &copy; ' + ( new Date() ).getFullYear() + ' ' + user.user + ' authors. ' +
				'<a href=http://github.com/' + user.user + '/' + user.repo + ' >MIT license</a>.</p>' +
				'<p>Click the \'i in a circle\' icon for more <a href=index.html#README.md title="Click here for help and information" >help</a>.</p>' +

			'</details>' +

			'<hr>' +

			'<center><a href=javascript:menu.scrollTop=0; style=text-decoration:none; onmouseover=pop2.style.display=""; onmouseout=pop2.style.display="none"; ><h1>' + ( user.logo ? user.logo : '❦' ) + '</h1></a></center>' +
			'<div class=popUp id=pop2 style=display:none;bottom:20px; >' + user.user + ' - ' + user.subText + '.<br>Click here to return to the top of the page</div>' +

		'';

		requestAPIContents();

	};


	function requestAPIContents() {

		let place, user, repo, branch, xhr;
//		var response, file;

		xhr = new XMLHttpRequest();
		xhr.open( 'GET', tree, true );
		xhr.onload = callback;
		xhr.send( null );

		function callback() {

			response = JSON.parse( xhr.response );
			files = [];

			for ( let i = 0; i < response.tree.length; i++ ) {

				file = response.tree[ i ].path;

//				if ( file.indexOf( 'docs' ) === -1 ) { continue; }

				if ( !file.endsWith( '.md' ) && !file.endsWith( '.html' ) ) { continue; }

				files.push( file );

			}

			fileCount.innerHTML = 'Files count: ' + files.length;

			createGroups();
//			listAlphabetical();

		}

	}



	function createGroups() {

		let headers;
		let txt, file, fileName;

		mnuFileHeaders.innerHTML = '<select id=selHeaders size=20 onchange=onHeaderSelected() ></select>';

		headers = [];

		for ( let i = 0; i < files.length; i++ ) {

			file = files[ i ].split( '/' );
			fileName = file.pop();
			file = file.join( '/' ); // .replace( 'docs/', '' );

			if ( headers.indexOf( file ) === -1 && file.length ) {

				selHeaders[ selHeaders.length ] = new Option( file  );

				headers.push( file );

			}

		}

		selHeaders.selectedIndex = 0;
		onHeaderSelected();

	}



	function onHeaderSelected() {

		let txt, header, menuFiles, name;

		txt = '';
		header = selHeaders.value;
		menuFiles = [];


		for ( let i = 0; i < files.length; i++ ) {

			if ( files[ i ].includes( header ) ) {

				name = files[ i ].replace( ( header + "\/" ), '' );   // .replace( '.html', '' );

				txt += '<p id=mnu_' + i + ' onclick=load("' + files[ i ] + '");  >' + name + '</p>';

				menuFiles.push( files[ i ] );
			}

		}

		fileNames.innerHTML = txt;
		load( menuFiles[ 0 ] );

	}



	function createTableOfContents() {

		var txt, headers, file, fName;

		txt =  '';
		headers = [];

		for ( var i = 0; i < files.length; i++ ) {

			file = files[ i ].split( '/' );

			fName = file.pop().replace( '.html', '' ) ;
			file = file.join( '/' ); // .replace( 'cookbook-html/examples/', '' );

			if ( headers.indexOf( file ) === -1 ) {

				txt += '<h4>' + file.replace( 'docs', '' ) + '</h4>';
				headers.push( file );

			}

			txt += '<div id=mnu_' + i + ' onclick=load("' + files[ i ] + '");  >' + ( i + 1 ) + ' ' + fName + '</div>';

		}

		mnuFileHeaders.innerHTML = '';
		fileNames.innerHTML = txt + '';
		load( files[ 0 ] );

	}



	function listAlphabetical() {

//		var txt, obj, file, keys;

		txt = '';
		obj = {};
		alpha = [];

		for ( var i = 0; i < files.length; i++ ) {

			file = files[ i ].split( '/' ).pop();
			obj[ file ] = files[ i ];

		}

		keys = Object.keys( obj );
		keys.sort();

		for ( i = 0; i < keys.length; i++ ) {

//			txt += '<div id=mnu_' + keys[ i ].replace( '.html', '' ) + ' onclick=load("' + obj[ keys[ i ] ] + '");  >' + ( i + 1 ) + ' ' + keys[ i ] + '</div>';
			txt += '<div id=mnu_' + i + ' onclick=load("' + obj[ keys[ i ] ] + '");  >' + ( i + 1 ) + ' ' + keys[ i ] + '</div>';
			alpha.push( obj[ keys[ i ] ] );
		}

		mnuFileHeaders.innerHTML = '';
		fileNames.innerHTML = txt;

	}



	function load( fName ) {

		fileName = fName;

		loadDocs( fileName );

/*
		blameName = fileName.replace( 'docs\/api', '' ).replace( '.html', '.js' );
		file = fileName.split( '/' ).pop().replace( '.html', '' );

		pageLinks.innerHTML =
			'<div style=float:right;text-align:right; >' + b +
			'<p><button onclick=loadDocs(fileName); >Docs</button></p>' +
			'<p><button onclick=loadSource(fileName); >Source</button><p>' +
			'<p><a href=https://github.com/mrdoob/three.js/blame/master/src' + blameName + ' target="_blank">Blame</a></p>' +
			'<p><a href=https://github.com/mrdoob/three.js/commits/master/src' + blameName + ' target="_blank">History</a></p>' +
			'<p><a href=https://github.com/' + user.user + '/' + user.repo + '/blob/master/src' + blameName + ' target="_blank">Normal</a></p>' +
//			'<p><a href=https://www.google.com/#q=' + file + '&tbs=qdr:y target="_blank">Google</a></p>' +
//			'<p><a href=http://stackoverflow.com/search?q=%5Bthree.js%5D+' + file + ' target="_blank">stacko\'flow</a></p>' +

		'</div>';
*/

	}


	function loadDocs( fName ) {

console.log( 'fName', fName);

		contents.innerHTML = '<iframe src = "' + urlBase + fName + '"; ></iframe>';

		document.title = fName.split( '/' ).pop() + ' - GitHub API File Viewer R1';

		MNU.setHighlightAndButtons( fName );

	}




//////////



	MNU.cssColors = function( back, color, mnu ) {

		document.body.style.backgroundColor = back;
		document.body.style.color = color;
		menu.style.backgroundColor = mnu;

	};


	MNU.cssFontOpenSans = function() {

		let fontID = 'Open+Sans';

		let font = document.body.appendChild( document.createElement( 'link' ) );
		font.id = fontID;
		font.rel = 'stylesheet';
		font.href = 'https://fonts.googleapis.com/css?family=' + fontID;

		document.body.style.fontFamily = 'Open Sans';

	};


	MNU.cssFontInconsolata = function() {

		let fontID = 'Inconsolata';

		let font = document.body.appendChild( document.createElement( 'link' ) );
		font.id = fontID;
		font.rel = 'stylesheet';
		font.href = 'https://fonts.googleapis.com/css?family=' + fontID;

		document.body.style.fontFamily = 'Inconsolata';

	};


	MNU.cssFontMonospace = function() {

//		document.body.style.fontFamily = '"Lucida Console", Monaco, monospace';
		document.body.style.fontFamily = 'monospace';

	};


	MNU.cssFontSize = function( size ) {

		document.body.style.fontSize = size;

	};



	MNU.setHighlightAndButtons = function( path ) {

		var index, el, col, folder, indexNext, indexPrevious;

//highlight

		fs = selContents.value === 'Alphabetical' ? alpha : files;

		index = fs.indexOf( path );

		for ( let i = 0; i < fs.length; i++ ) {

			el = document.getElementById( 'mnu_' + i );

			color = ( i === index ) ? '#ccc' : '';

			if ( el ) {

				el.style.backgroundColor = color;
//				el.scrollIntoView();  // not working

			}

		}


// buttons

		if ( butEditFile ) {

			folder = user.folder ? user.folder + '/' : '';

			butEditFile.innerHTML = '<a href="https://github.com/' + user.user + '/' + user.repo + '/blob/' + user.branch + '/' + folder + path + '" target="_blank"> Edit </a>';

		}


		indexNext = index + 1;
		if ( indexNext >= fs.length ) { indexNext = 0; }

		indexPrevious = index - 1;
		if ( indexPrevious < 0 ) { indexPrevious = fs.length - 1; }

		if ( butNextFile || butPreviousFile ) {

			butNextFile.innerHTML = '<a href=JavaScript:load("' + fs[ indexNext ] + '"); > &gt; </a>';
			butPreviousFile.innerHTML = '<a href=JavaScript:load("' + fs[ indexPrevious ] + '"); > &lt; </a>';

		}


	}
