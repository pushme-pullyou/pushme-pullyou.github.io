

	SEL.initSelectType = function() {

		mnuSelectType.innerHTML =

			'<details open>' +

				'<summary><h3>Select Menu Type</h3></summary>' +

					'<select id=selType onchange=SEL.selectMenuType(); title="Select type of menu" size=6 style=width:100%;  >' +
						'<option title="created by humans" >Table of Contents</option>' +
						'<option >All Files</option>' +
						'<option >Folders & Files</option>' +
						'<option >Folder Groups</option>' +
						'<option >List by Folders</option>' +
						'<option >Alphabetical</option>' +
					'</select>' + b +

			'</details>' + b +

		'';

		mnuContents.innerHTML =

			'<div id=mnuUserTitle ></div>' +
			'<div id=mnuUserTagline ></div>' + b +

			'<details open >' +

				'<summary><h3 id=menuTitle >Contents</h3></summary>' +

				'<div id=mnuBreadcrumbs ></div>' +
				'<div id=menuItems ></div>' +

			'</details>' + b +

		'';

	}


	SEL.selectMenuType = function() {

		var types = [ SEL.setMenuContents, SEL.getTreeAllFiles, SEL.setMenuFoldersFiles, SEL.createGroups, SEL.listByFolders, SEL.listAlphabetical ]
		SEL.setMenu = types[ selType.selectedIndex ];
		SEL.setMenu();

		menuTitle.innerHTML = selType.value;
		mnuBreadcrumbs.innerHTML = '';


	}




	SEL.setMenuContents = function() { // we have a table of contents / SEL.tableOfContents somewhere

		var text, fNames, fName;
		var index, ReadMe;

		SEL.files = [];

		showdown.setFlavor( 'github' );

		SEL.converter = new showdown.Converter();

		text = CON.massageText( MNU.tableOfContents );

		menuItems.innerHTML = text;

		fNames = MNU.tableOfContents.replace( / /g, '' ).replace( /(.*)\((.*)\)(.*)/gi, '$2' ).split( '\n' );

		for ( var i = 1; i < fNames.length - 1; i++ ) {

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

			let response, items, item, count;

			response = xhr.target.response;
			items = JSON.parse( response );

			SEL.files = [];
			count = 0;
			menuItems.innerHTML = '';

			for ( let item of items ) {

				if ( item.type === 'dir' ) {

					menuItems.innerHTML +=
						'<div><a href=JavaScript:location.hash="";SEL.getTreeAllFiles("' + item.path  + '");  > 🗀 ' + item.name  + '</a></div>' +
					'';

				}

			}

			for ( let item of items ) {

				if ( item.type === 'file' ) {

					menuItems.innerHTML += '<div><a href=#' + encodeURI( item.path ) + '  > ' + item.name + '</a></div>';

					SEL.files.push( item.path );

				}

			}

		}

	}



	SEL.setMenuFoldersFiles = function() {

		var tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';

		SEL.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );
			SEL.files = [];

			for ( let file of response.tree ) {

				if ( file.type === 'tree' ) { continue; }

				SEL.files.push( file.path );

			}

			menuItems.innerHTML =
				'Files count: ' + SEL.files.length + b +
				SEL.files.map( function( a ){ return '<small><div>' + a.link( '#' + a ) + '</div></small>'; } ).join( '' );

		}

	}


	SEL.createGroups = function() {

		let headers;
		let response, file, fileName;

		let tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';
		SEL.files = [];
		SEL.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );

			menuItems.innerHTML = '<select id=selHeaders size=20 onchange=SEL.onHeaderSelected() ></select>' + b + b +
				'<div id=selFile ></div>';

			SEL.headers = [];

			for ( let i = 0; i < response.tree.length; i++ ) {

				file = response.tree[ i ];

				if ( file.type === 'tree' ) { continue; }

				file = file.path;
				SEL.files.push( file );

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

		for ( let file of SEL.files ) {

			if ( file.includes( header ) ) {

				name = file.replace( ( header + "\/" ), '' );
				txt += '<div>' + name.link( '#' + file ) + '</div>';
			}

		}

		selFile.innerHTML = 'Files count: ' + SEL.files.length + b + txt;

	}


	SEL.listByFolders = function () {

		var txt, headers, response, file, fName, path, folders;

		txt =  '';
		headers = [];

		var tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';

		SEL.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );

			for ( let file of response.tree ) {

				if ( file.type === 'tree' ) { continue; }

				path = file.path;
				SEL.files.push( path )
				file = path.split( '/' );

				fName = file.pop();
				folders = file.join( '/' );

				if ( ! headers.includes( folders ) ) {

					txt += '<h4>' + folders + '</h4>';
					headers.push( folders );

				}

				txt += '<div>' + fName.link( '#' + path ) + '</div>';

			}

			menuItems.innerHTML = txt;

		}

	}



	SEL.listAlphabetical = function() {

		var tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';

		SEL.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );
			var txt, keys, path, name;

			txt = '';
			keys = [];
			SEL.files = [];

			for ( let file of response.tree ) {

				if ( file.type === 'tree' ) { continue; }

				path = file.path;
				name = path.split( '/' ).pop();

				SEL.files.push( file.path );
				keys.push( name + '#' + path );

			}

			keys = keys.sort();

			for ( let i = 0; i < keys.length; i++ ) {

				key = keys[ i ].split( '#' );
				txt += '<div><a href=#' + key[ 1 ] + ' title="' + key[ 1 ] + '" >' + ( i + 1 ) + ' ' + key[ 0 ] + '</a></div>';

			}

			menuItems.innerHTML = 'Files in repo: ' + SEL.files.length + b + txt;

		}

	}

////////////////// utilities

	SEL.highlightMenuItem = function() {

		let links;

		links = document.getElementsByTagName( 'a' );

		for ( let link of links ) {

			link.parentElement.style.backgroundColor = link.hash === location.hash  ? 'lightgreen' : '';

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
