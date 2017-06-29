	var TYP = TYP || {};


	TYP.typeSelectedIndex = MNU.tableOfContents ? 0 : 1;

	TYP.initSelectType = function() {

		mnuSelectType.innerHTML =

			'<details id=mnuTypeDetails open>' +

				'<summary><h3>Select Menu Type</h3></summary>' +

					'<select id=selType onchange=TYP.selectMenuType(); title="Select type of menu" size=6 style=width:100%;  >' +
						'<option title="created by humans" >Table of Contents</option>' +
						'<option >All Files</option>' +
						'<option >Folders & Files</option>' +
						'<option >Folder Groups</option>' +
						'<option >List by Folders</option>' +
						'<option >Alphabetical</option>' +
					'</select>' + b +

			'</details>'

		'';


		selType.selectedIndex = TYP.typeSelectedIndex;

	}



	TYP.selectMenuType = function() {

		var types = [ TYP.setMenuContents, TYP.getTreeAllFiles, TYP.setMenuFoldersFiles, TYP.createGroups, TYP.listByFolders, TYP.listAlphabetical ]
		var path = user.path ? user.path : undefined;
		TYP.setMenu = types[ selType.selectedIndex ];
		TYP.setMenu( path );

		mnuContentsTitle.innerHTML = selType.value;
		mnuBreadcrumbs.innerHTML = '';

	}



	TYP.setMenuContents = function() { // we have a table of contents / TYP.tableOfContents somewhere

		let text, fNames, fName;

		if ( !MNU.tableOfContents ){

			mnuItems.innerHTML = 'Sadly, no human has created a curated menu for this repository. Do try another type of menu';
			return;
		}

		TYP.files = [];

		showdown.setFlavor( 'github' );

		TYP.converter = new showdown.Converter();

		text = CON.massageText( MNU.tableOfContents );

		mnuItems.innerHTML = text;

		fNames = MNU.tableOfContents.replace( / /g, '' ).replace( /(.*)\((.*)\)(.*)/gi, '$2' ).split( '\n' );

		for ( let i = 1; i < fNames.length - 1; i++ ) {

			fName = fNames[ i ];
			if ( fName.includes( '##' ) || fName === '' || fName.length < 5 ) { continue; }

			TYP.files.push( fName.replace( '#', '' ) );

		}

		CON.setDefaultContents();

	}



	TYP.getTreeAllFiles = function( path ) {

		let url;

		url = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/contents/' + ( path ? path : '' );

		TYP.requestFile( url, callback );

		TYP.setBreadcrumbs( path );

		function callback( xhr ) {

			let response, items, item, link;

			response = xhr.target.response;
			items = JSON.parse( response );

			TYP.files = [];
			mnuItems.innerHTML = '';

			for ( let item of items ) {

				if ( item.type === 'dir' ) {

					mnuItems.innerHTML +=
//						'<div><a href=JavaScript:location.hash="";TYP.getTreeAllFiles("' + item.path  + '");  > 🗀 ' + item.name  + '</a></div>' +
						'<div><a href=JavaScript:TYP.getTreeAllFiles("' + item.path  + '");  > 🗀 ' + item.name  + '</a></div>' +

					'';

				}

			}

			link = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/';

			for ( let item of items ) {

				if ( !item.path && !item.path.includes( path ) ) { continue; }

				if ( item.type === 'file' ) {

					mnuItems.innerHTML +=
					'<div>' +
						'<a href=#' + encodeURI( item.path ) + '  > ' + item.name + '</a> ' +
						( item.path.endsWith( '.html') ? '<a href="' + encodeURI( link + item.path ) + '" target=_blank >&#x1F5D7;</a>' : '' ) +
					'</div>';

					TYP.files.push( item.path );

				}

			}

			CON.setDefaultContents();

		}

	}



	TYP.setMenuFoldersFiles = function( path ) {

		var tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';

		TYP.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );
			TYP.files = [];

			for ( let file of response.tree ) {

				if ( file.type === 'tree' ) { continue; }
				if ( !file.path.includes( path ) ) { continue; }

				TYP.files.push( file.path );

			}

			mnuItems.innerHTML =
				'Files count: ' + TYP.files.length + b +
				TYP.files.map( function( a ){ return '<small><div>' + a.link( '#' + a ) + '</div></small>'; } ).join( '' );

			CON.setDefaultContents();
		}

	}



	TYP.createGroups = function( path ) {

		let headers;
		let response, file, fileName;

		let tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';
		TYP.groups = [];
		TYP.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );

			mnuItems.innerHTML = '<select id=selHeaders size=20 onchange=TYP.onHeaderSelected() style=width:100%; ></select>' + b + b +
				'<div id=selFile ></div>';

			TYP.headers = [];

			for ( let i = 0; i < response.tree.length; i++ ) {

				file = response.tree[ i ];

				if ( file.type === 'tree' ) { continue; }
				if ( !file.path.includes( path ) ) { continue; }

				file = file.path;
				TYP.groups.push( file );

				file = file.split( '/' );
				fileName = file.pop();
				file = file.join( '/' );

				if ( ! TYP.headers.includes( file ) ) {

					selHeaders[ selHeaders.length ] = new Option( file  );

					TYP.headers.push( file );

				}

			}

		}

	}



	TYP.onHeaderSelected = function() {

		let txt, header, name;

		txt = '';

		header = selHeaders.value;
		TYP.files = [];
		for ( let file of TYP.groups ) {

			if ( file.includes( header ) ) {

				name = file.replace( ( header + "\/" ), '' );
				txt += '<div>' + name.link( '#' + file ) + '</div>';

				TYP.files.push( file );
			}

		}

		selFile.innerHTML = 'Files count: ' + TYP.files.length + b + txt;

		CON.setDefaultContents();

	}


	TYP.listByFolders = function ( path ) {

		let txt, headers, response, file, fName, filePath, folders;
		let tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';
		let link = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/';

		txt =  '';
		headers = [];

		TYP.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );

			for ( let file of response.tree ) {

				if ( file.type === 'tree' ) { continue; }
				if ( !file.path.includes( path ) ) { continue; }

				filePath = file.path;
				TYP.files.push( filePath )
				file = filePath.split( '/' );

				fName = file.pop();
				folders = file.join( '/' );

				if ( ! headers.includes( folders ) ) {

					txt += '<h4>' + folders + '</h4>';
					headers.push( folders );

				}

				txt += '<div>' +
					fName.link( '#' + filePath ) + ' ' +
					( filePath.endsWith( '.html') ? '<a href="' + encodeURI( link + filePath ) + '" target=_blank >&#x1F5D7;</a>' : '' ) +

				'</div>';

			}

			mnuItems.innerHTML = txt;

			CON.setDefaultContents();

		}

	}



	TYP.listAlphabetical = function( path ) {

		let tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';
		let link = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/';
//		let response, txt, keys, filePath, name;

		TYP.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );

			txt = '';
			keys = [];
			TYP.files = [];

			for ( let file of response.tree ) {

				if ( file.type === 'tree' ) { continue; }
				if ( !file.path.includes( path ) ) { continue; }

				filePath = file.path;
				name = filePath.split( '/' ).pop();

				TYP.files.push( file.path );
				keys.push( name + '#' + filePath );

			}

			keys = keys.sort();

			for ( let i = 0; i < keys.length; i++ ) {

				key = keys[ i ].split( '#' );
				filePath =  key[ 1 ];
				txt +=
				'<div>' +
					'<a href=#' + filePath + ' title="' + filePath + '" >' + ( i + 1 ) + ' ' + key[ 0 ] + '</a> ' +
					(  filePath.endsWith( '.html') ? '<a href="' + encodeURI( link + filePath ) + '" target=_blank >&#x1F5D7;</a>' : '' ) +
				'</div>';

			}

			mnuItems.innerHTML =
			'Files in repo: ' + TYP.files.length + b +
			'Search <input id=inpText oninput=update(); />' + b +
			'<div id=mnuSelected ></div>';

			update();

		}

	}

	function update() {

		str = inpText.value;
		let link = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/';
		txt = '';
		for ( let i = 0; i < keys.length; i++ ) {

			key = keys[ i ].split( '#' );
			name = key[ 0 ];
			if ( name.includes( str ) ) {
//console.log( '', name );
			filePath =  key[ 1 ];
			txt +=
			'<div>' +
				'<a href=#' + filePath + ' title="' + filePath + '" >' + ( i + 1 ) + ' ' + key[ 0 ] + '</a> ' +
				(  filePath.endsWith( '.html') ? '<a href="' + encodeURI( link + filePath ) + '" target=_blank >&#x1F5D7;</a>' : '' ) +
			'</div>';
			}

		}

		mnuSelected.innerHTML = txt;

		CON.setDefaultContents();
// console.log( '', inpText.value  );

	}

////////////////// utilities

	TYP.highlightMenuItem = function() {

		let links;

		links = document.getElementsByTagName( 'a' );

		for ( let link of links ) {

			link.parentElement.style.backgroundColor = link.hash && link.hash === location.hash  ? 'darkgray' : '';

		}

	}



	TYP.setBreadcrumbs = function( path ) {

		let name, txt, folders, str;

		name = user.repo;

		name = user.path ? user.path : user.repo;

		txt = '<h3><a href=JavaScript:TYP.getTreeAllFiles(); >' + name + '</a> &raquo; </h3>';

		folders = path ? path.split( '/' ) : [] ;

		str = '';

		for ( let folder of folders ) {

			str += folder + '/';

			txt += '<h3><a href=JavaScript:TYP.getTreeAllFiles("' + str.slice( 0, -1 ) + '"); >' + folder + '</a> &raquo; </h3>';

		}

		mnuBreadcrumbs.innerHTML = txt;

	}



	TYP.requestFile = function ( fileName, callback ) {

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', fileName, true );
		xhr.onerror = function( xhr ) { console.log( 'error', xhr  ); };
		xhr.onload = callback;
		xhr.send( null );

	}
