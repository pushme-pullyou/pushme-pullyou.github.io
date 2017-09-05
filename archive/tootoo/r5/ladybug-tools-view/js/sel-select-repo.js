	let SEL = {};

	SEL.repoSelectedIndex = 0;


	SEL.urlAPIFolderRepo = 'https://api.github.com/repos/pushme-pullyou/pushme-pullyou.github.io/contents/tootoo/r4/dev-repo/';
	SEL.folderRepo = '../dev-repo/'


	 SEL.initSelectRepo = function() {

		mnuSelectItem.innerHTML =

			'<details open>' +

				'<summary><h3>Select User / Repo </h3></summary>' +

					'<select id=selRepo onchange=SEL.selectRepo(); title="Select repo" size=15 style=width:100%;  >' +

					'</select>' + b +

			'</details>' +

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


	SEL.getRepoJS = function() {

		SEL.requestFile( SEL.urlAPIFolderRepo, SEL.callbackRepo );

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

		mnuUserTitle.innerHTML = '<h3>' + user.title + '</h3>';
		mnuUserTagline.innerHTML = user.tagLine;
		SEL.selectMenuType();

	}


	SEL.requestFile = function ( fileName, callback ) {

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', fileName, true );
		xhr.onerror = function( xhr ) { console.log( 'error', xhr  ); };
		xhr.onload = callback;
		xhr.send( null );

	}
