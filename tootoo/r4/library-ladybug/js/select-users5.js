
	let SEL = {};
	let users = {};

	var urlAPIFolderRepos = 'https://api.github.com/repos/pushme-pullyou/pushme-pullyou.github.io/contents/tootoo/r4/dev-repo/';
	var folderRepo = '../dev-repo/'


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


	}

	SEL.selectMenuType = function() {

		var types = [ TOO.setMenuContents, TOO.setMenuDefault, SEL.setMenuFoldersFiles, SEL.createGroups, SEL.listContents, SEL.listAlphabetical ]
		TOO.setMenu = types[ selType.selectedIndex ];
		TOO.setMenu();
		menuTitle.innerHTML = selType.value;

	}


	SEL.setMenuFoldersFiles = function() {

		var tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';

		TOO.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );
			files = [];

			for ( let i = 0; i < response.tree.length; i++ ) {

				file = response.tree[ i ];

				if ( file.type === 'tree' ) { continue; }

				files.push( file.path );

			}

			menuItems.innerHTML =
				'Files count: ' + files.length + b +
				files.map( function(a){ return a.link( '#' + a ); } ).join( b );

		}

	}


	SEL.createGroups = function() {

		let headers;
		let txt, file, fileName;
files = [];

		var tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';

		TOO.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );

			menuItems.innerHTML = '<select id=selHeaders size=20 onchange=SEL.onHeaderSelected() ></select>' + b + b +
				'<div id=selFile ></div>';

			headers = [];

			for ( let i = 0; i < response.tree.length; i++ ) {

				file = response.tree[ i ];

				if ( file.type === 'tree' ) { continue; }
				file = file.path;
				files.push( file );
				file = file.split( '/' );
				fileName = file.pop();
				file = file.join( '/' ); // .replace( 'docs/', '' );

				if ( headers.indexOf( file ) === -1 ) {

					selHeaders[ selHeaders.length ] = new Option( file  );

					headers.push( file );

				}

			}

		}




	}

	SEL.onHeaderSelected = function() {

		let txt, header, name;

		txt = '';

		header = selHeaders.value;

		for ( let i = 0; i < files.length; i++ ) {

			file = files[ i ];
			if ( file.includes( header ) ) {

				name = file.replace( ( header + "\/" ), '' );
				txt += name.link( '#' + file ) + b;
			}

		}

		selFile.innerHTML = txt;

	}


	SEL.listContents = function () {

		var txt, headers, file, fName, path;

		txt =  '';
		headers = [];

		var tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';

		TOO.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );

			for ( var i = 0; i < response.tree.length; i++ ) {

				file = response.tree[ i ];
				if ( file.type === 'tree' ) { continue; }
				path = file.path;
				file = path.split( '/' );

				fName = file.pop();
				folders = file.join( '/' );

				if ( ! headers.includes( folders ) ) {

					txt += '<h4>' + folders + '</h4>';
					headers.push( folders );

				}

				txt += fName.link( '#' + path ) + b;

			}

			menuItems.innerHTML = txt + '';

		}

	}



	SEL.listAlphabetical = function() {

		var tree = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/git/trees/' + user.branch + '?recursive=1';

		TOO.requestFile( tree, callback );

		function callback( xhr ) {

			response = JSON.parse( xhr.target.response );
//			var txt, obj, file, keys;

			txt = '';
			obj = {};

			for ( let i = 0; i < response.tree.length; i++ ) {

				file = response.tree[ i ];
				if ( file.type === 'tree' ) { continue; }
				name = file.path;

				name = name.split( '/' ).pop();
				obj[ name ] = name;
				obj[ name ]= file.path;
			}

			keys = Object.keys( obj );
			keys.sort();

			for ( i = 0; i < keys.length; i++ ) {

				txt += '<a id=mnu_' + i + ' href=#' + obj[ keys[ i ] ] + ' >' + ( i + 1 ) + ' ' + keys[ i ] + '</a>' + b;

			}

			menuItems.innerHTML = txt

		}

	}




// used by Library type scripts

	 SEL.initSelectRepos = function() {

		mnuSelectItem.innerHTML =

			'<details open>' +

				'<summary><h3>Select User/ Repo/ Branch/ </h3></summary>' +

					'<select id=selRepo onchange=SEL.selectRepo(); title="Select repo" size=15 style=width:100%;  >' +

					'</select>' + b +

			'</details>' +

		'';

		SEL.getRepoOptions();

	}



	SEL.getRepoOptions = function() {

		TOO.requestFile( urlAPIFolderRepos, SEL.callbackRepos );

	}


	SEL.callbackRepos = function( xhr ){

		let files, file;

		files = xhr.target.response;

		files = JSON.parse( files );

		for ( let i = 0; i < files.length; i++) {

			file = files[ i ].name;

			if ( file.endsWith( '.js') ) {

				selRepo.innerHTML += '<option>' + file + '</option>';

			}

		 }

		selRepo.selectedIndex = 10;

		SEL.selectRepo();

	}


	SEL.selectRepo = function(){

//console.clear();

//		location.hash="";
		history.replaceState( '', document.title, window.location.pathname );

// add: only create if not already
		var scr = document.body.appendChild( document.createElement( 'script' ) );
		scr.onload = SEL.onload;

		scr.src = folderRepo + selRepo.value;

	}


	SEL.onload = function() {

		TOO.initUser();

	}


///////////////////

	SEL.initSelectUsers = function() {

		mnuSelect.innerHTML =

				'<details open>' +

					'<summary><h3>Select User/ Repo/ Branch/ </h3></summary>' +

						'<select id=selUser onchange=SEL.selectUser(); title="Select user" size=15 style=width:100%;  >' +

						'</select>' + b +
					b +

				'</details>' +

		'';

		SEL.getMenuSelectUserOptions();

	}



	SEL.getMenuSelectUserOptions = function () {

		users.keys = Object.keys( users );

		for ( let i = 0; i < users.keys.length; i++ ) {

			user = users[ users.keys[ i ] ];

			selUser[ i ] = new Option( user.user + ' ' + user.repo + ' ' + user.path + ' ' + user.branch, users.keys[ i ] );

		}

		selUser.selectedIndex = Math.floor( Math.random() * users.keys.length );
		selUser.selectedIndex = 10;

		SEL.selectUser();

	}


	SEL.selectUser = function(){

//console.clear();

//		location.hash="";
		history.replaceState( '', document.title, window.location.pathname );
		user = users[ selUser.value ];

		TOO.initUser();

	}

