	var SEL = SEL || {};


	SEL.typeSelectedIndex = MNU.tableOfContents ? 0 : 1;

	SEL.initSelectType = function() {

		mnuSelectType.innerHTML =

			'<details id=mnuTypeDetails open>' +

				'<summary><h3>Select Menu Type</h3></summary>' +

					'<select id=selType onchange=SEL.selectMenuType(); title="Select type of menu" size=6 style=width:100%;  >' +
						'<option title="created by humans" >Table of Contents</option>' +
						'<option >All Files</option>' +
						'<option >Folders & Files</option>' +
						'<option >Folder Groups</option>' +
						'<option >List by Folders</option>' +
						'<option >Alphabetical</option>' +
					'</select>' + b +

			'</details>'

		'';


		selType.selectedIndex = SEL.typeSelectedIndex;

	}



	SEL.selectMenuType = function() {

		var types = [ SEL.setMenuContents, SEL.getTreeAllFiles, SEL.setMenuFoldersFiles, SEL.createGroups, SEL.listByFolders, SEL.listAlphabetical ]
		var path = user.path ? user.path : undefined;
		SEL.setMenu = types[ selType.selectedIndex ];
		SEL.setMenu( path );

		mnuContentsTitle.innerHTML = selType.value;
		mnuBreadcrumbs.innerHTML = '';

	}



	SEL.setMenuContents = function() { // we have a table of contents / SEL.tableOfContents somewhere

		let text, fNames, fName;

		if ( !MNU.tableOfContents ){

			mnuItems.innerHTML = 'Sadly, no human has created a curated menu for this repository. Do try another type of menu';
			return;
		}

		SEL.files = [];

		showdown.setFlavor( 'github' );

		SEL.converter = new showdown.Converter();

		text = CON.massageText( MNU.tableOfContents );

		mnuItems.innerHTML = text;

		fNames = MNU.tableOfContents.replace( / /g, '' ).replace( /(.*)\((.*)\)(.*)/gi, '$2' ).split( '\n' );

		for ( let i = 1; i < fNames.length - 1; i++ ) {

			fName = fNames[ i ];
			if ( fName.includes( '##' ) || fName === '' || fName.length < 5 ) { continue; }

			SEL.files.push( fName.replace( '#', '' ) );

		}

		CON.setDefaultContents();

	}



	SEL.getTreeAllFiles = function( path ) {
		let url;

		url = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/contents/' + ( path ? path : '' );

		SEL.requestFile( url, callback );

		SEL.setBreadcrumbs( path );

		function callback( xhr ) {

//			let response, items, item, link;

			response = xhr.target.response;
			items = JSON.parse( response );

			SEL.files = [];
			mnuItems.innerHTML = '';

			for ( let item of items ) {

				if ( item.type === 'dir' ) {

					mnuItems.innerHTML +=
//						'<div><a href=JavaScript:location.hash="";SEL.getTreeAllFiles("' + item.path  + '");  > 🗀 ' + item.name  + '</a></div>' +
						'<div><a href=JavaScript:SEL.getTreeAllFiles("' + item.path  + '");  > &#x1f5c0; ' + item.name  + '</a></div>' +

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

					SEL.files.push( item.path );

				}

			}

			CON.setDefaultContents();

		}

	}



	SEL.setMenuFoldersFiles = function( path ) {

		var tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';

		SEL.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );
			SEL.files = [];

			for ( let file of response.tree ) {

				if ( file.type === 'tree' ) { continue; }
				if ( !file.path.includes( path ) ) { continue; }

				SEL.files.push( file.path );

			}

			mnuItems.innerHTML =
				'Files count: ' + SEL.files.length + b +
				SEL.files.map( function( a ){ return '<small><div>' + a.link( '#' + a ) + '</div></small>'; } ).join( '' );

			CON.setDefaultContents();
		}

	}



	SEL.createGroups = function( path ) {

		let headers;
		let response, file, fileName;

		let tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';
		SEL.groups = [];
		SEL.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );

			mnuItems.innerHTML = '<select id=selHeaders size=20 onchange=SEL.onHeaderSelected() style=width:100%; ></select>' + b + b +
				'<div id=selFile ></div>';

			SEL.headers = [];

			for ( let i = 0; i < response.tree.length; i++ ) {

				file = response.tree[ i ];

				if ( file.type === 'tree' ) { continue; }
				if ( !file.path.includes( path ) ) { continue; }

				file = file.path;
				SEL.groups.push( file );

				file = file.split( '/' );
				fileName = file.pop();
				file = file.join( '/' );

				if ( ! SEL.headers.includes( file ) ) {

					selHeaders[ selHeaders.length ] = new Option( file  );

					SEL.headers.push( file );

				}

			}

		}

	}



	SEL.onHeaderSelected = function() {

		let txt, header, name;

		txt = '';

		header = selHeaders.value;
		SEL.files = [];
		for ( let file of SEL.groups ) {

			if ( file.includes( header ) ) {

				name = file.replace( ( header + "\/" ), '' );
				txt += '<div>' + name.link( '#' + file ) + '</div>';

				SEL.files.push( file );
			}

		}

		selFile.innerHTML = 'Files count: ' + SEL.files.length + b + txt;

		CON.setDefaultContents();

	}


	SEL.listByFolders = function ( path ) {

		let txt, headers, response, file, fName, filePath, folders;
		let tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';
		let link = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/';

		txt =  '';
		headers = [];

		SEL.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );

			for ( let file of response.tree ) {

				if ( file.type === 'tree' ) { continue; }
				if ( !file.path.includes( path ) ) { continue; }

				filePath = file.path;
				SEL.files.push( filePath )
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



	SEL.listAlphabetical = function( path ) {

		let tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';
		let link = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/';
//		let response, txt, keys, filePath, name;

		SEL.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );

			txt = '';
			keys = [];
			SEL.files = [];

			for ( let file of response.tree ) {

				if ( file.type === 'tree' ) { continue; }
				if ( !file.path.includes( path ) ) { continue; }

				filePath = file.path;
				name = filePath.split( '/' ).pop();

				SEL.files.push( file.path );
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
			'Files in repo: ' + SEL.files.length + b +
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

	SEL.highlightMenuItem = function() {

		let links;

		links = document.getElementsByTagName( 'a' );

		for ( let link of links ) {

			link.parentElement.style.backgroundColor = link.hash && link.hash === location.hash  ? 'darkgray' : '';

		}

	}



	SEL.setBreadcrumbs = function( path ) {

		let name, txt, folders, str;

		name = user.repo;

		name = user.path ? user.path : user.repo;

		txt = '<h3><a href=JavaScript:SEL.getTreeAllFiles(); >' + name + '</a> &raquo; </h3>';

		folders = path ? path.split( '/' ) : [] ;

		str = '';

		for ( let folder of folders ) {

			str += folder + '/';

			txt += '<h3><a href=JavaScript:SEL.getTreeAllFiles("' + str.slice( 0, -1 ) + '"); >' + folder + '</a> &raquo; </h3>';

		}

		mnuBreadcrumbs.innerHTML = txt;

	}



	SEL.requestFile = function ( fileName, callback ) {

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', fileName, true );
		xhr.onerror = function( xhr ) { console.log( 'error', xhr  ); };
		xhr.onload = callback;
		xhr.send( null );

	}
