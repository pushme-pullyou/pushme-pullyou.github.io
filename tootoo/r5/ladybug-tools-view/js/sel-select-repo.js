	let SEL = {};

	SEL.repoSelectedIndex = 0;
	SEL.typeSelectedIndex = 0;
//	let users = {};
	var TOO = {};

	SEL.urlAPIFolderRepo = 'https://api.github.com/repos/pushme-pullyou/pushme-pullyou.github.io/contents/tootoo/r4/dev-repo/';
	SEL.folderRepo = '../dev-repo/'


	 SEL.initSelectRepo = function() {

		mnuSelectItem.innerHTML =

			'<details open>' +

				'<summary><h3>Select User/ Repo/ Branch/ </h3></summary>' +

					'<select id=selRepo onchange=SEL.selectRepo(); title="Select repo" size=15 style=width:100%;  >' +

					'</select>' + b +

			'</details>' +

		'';

	}


	SEL.getRepoJS = function() {

		TOO.requestFile( SEL.urlAPIFolderRepo, SEL.callbackRepo );

	}


	SEL.callbackRepo = function( xhr ){

		let files, file;

		files = JSON.parse( xhr.target.response );

		for ( let file of files ) {

			file = file.name;

			if ( file.endsWith( '.js') ) {

				selRepo.innerHTML += '<option>' + file + '</option>';

			}

		 }

		selRepo.selectedIndex = SEL.repoSelectedIndex;

		SEL.selectRepo();

	}


	SEL.selectRepo = function(){

//console.clear();

		if ( SEL.script ) { SEL.script = null; }

		SEL.script = document.body.appendChild( document.createElement( 'script' ) );
		SEL.script.onload = SEL.onload;

		SEL.script.src = SEL.folderRepo + selRepo.value;

	}


	SEL.onload = function() {

		selType.selectedIndex = SEL.typeSelectedIndex;
		SEL.selectMenuType();

//		mnuSelectType.dispatchEvent( 'menusLoaded' );
//		container.dispatchEvent( event );


	}


	TOO.requestFile = function ( fileName, callback ) {

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', fileName, true );
		xhr.onerror = function( xhr ) { console.log( 'error', xhr  ); };
		xhr.onload = callback;
		xhr.send( null );

	}
