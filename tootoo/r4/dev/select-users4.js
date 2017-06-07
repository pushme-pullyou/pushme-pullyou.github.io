
	let SEL = {};
	let users = {};

	var urlAPIFolderRepos = 'https://api.github.com/repos/pushme-pullyou/pushme-pullyou.github.io/contents/tootoo/r4/dev-repo/';
	var folderRepo = '../dev-repo/'

	users.bPesquet = {
		user: 'bpesquet',
		subText: 'A modern introduction to an essential language.',
		repo: 'thejsway',
		branch: 'master',
		path: '',
		rawgit: true,
//		defaultFile : 'LICENSE'
	};
	users.d3 = {
		user : 'd3',
		logo : '<img src=https://d3js.org/logo.svg height=32 >',
		repo : 'd3',
		branch : 'master',
		path : '',
		rawgit: true
	};
	users.d3GH = {
		user : 'd3',
		logo : '<img src=https://d3js.org/logo.svg height=32 >',
		repo : 'd3.github.com',
		branch : 'master',
		path : '',
		rawgit: true,
		defaultFile : 'LICENSE'
	};
	users.frontEnd = {
		user : 'FrontendMasters',
		repo : 'front-end-handbook-2017',
		branch : 'master',
		path : '',
		rawgit: true
	};
	users.jaanga = {
		user : 'jaanga',
		logo : '<img src=https://jaanga.github.io/j.png height=32 >',
		repo : 'jaanga.github.io',
		branch : 'master',
		path : '',
		defaultFile : 'readme.md'
	};
	users.jDemo = {
		user: 'jaanga',
		logo : '<img src=https://jaanga.github.io/j.png height=32 >',
		repo: 'jaanga.github.io',
		branch: 'master',
		path: 'demo'
	};
	users.jDocs = {
		user: 'jaanga',
		logo : '<img src=https://jaanga.github.io/j.png height=32 >',
		repo: 'jaanga.github.io',
		branch: 'master',
		path: 'documents'
	};
	users.jTerrain = {
		user: 'jaanga',
		logo : '<img src=https://jaanga.github.io/j.png height=32 >',
		repo: 'terrain3',
		branch: 'gh-pages',
		path: ''
	};
	users.jupyter = {
		user : 'jupyter',
		logo : '<img src=https://blog.jupyter.org/content/images/2015/02/jupyter-sq-text.png height=32 >',
		repo : 'jupyter.github.io',
		branch : 'master',
		path : '',
		rawgit: true
	};
	users.jupyterNotebook = {
		user : 'jupyter',
		logo : '<img src=https://blog.jupyter.org/content/images/2015/02/jupyter-sq-text.png height=32 >',
		repo : 'notebook',
		branch : 'master',
		path : '',
		rawgit: true
	};


	users.ladybugTools = {
		user : 'ladybug-tools',
		repo : 'ladybug-tools.github.io',
		branch : 'master',
		path : '',
		rawgit: true
	};

	users.ladybugTools3dModels = {
		user : 'ladybug-tools',
		repo : '3d-models',
		branch : 'gh-pages',
		path : '',
		rawgit: true
	};

	users.ladybugToolsLadybug = {
		user : 'ladybug-tools',
		repo : 'ladybug',
		branch : 'master',
		path : '',
		rawgit: true
	};
	users.ladybugToolsLadybug = {
		user : 'ladybug-tools',
		repo : 'ladybug',
		branch : 'gh-pages',
		path : '',
		rawgit: true
	};

	users.ladybugToolsButterfly = {
		user : 'ladybug-tools',
		repo : 'butterfly',
		branch : 'master',
		path : '',
		rawgit: true
	};

	users.ladybugToolsButterflyPlus = {
		user : 'ladybug-tools',
		repo : 'butterfly-plus',
		branch : 'master',
		path : '',
		rawgit: true
	};

	users.ladybugDcStudies = {
		user : 'ladybug-tools',
		repo : 'dc-studies',
		branch : 'master',
		path : '',
		rawgit: true
	};

	users.ladybugDynamo = {
		user : 'ladybug-tools',
		repo : 'ladybug-dynamo',
		branch : 'gh-pages',
		path : '',
		rawgit: true
	};

	users.ladybugToolsHoneybee = {
		user : 'ladybug-tools',
		repo : 'honeybee',
		branch : 'master',
		path : '',
		rawgit: true
	};

	users.ladybugToolsHoneybeePlus = {
		user : 'ladybug-tools',
		repo : 'honeybee-plus',
		branch : 'master',
		path : '',
		rawgit: true
	};

	users.ladybugWeb = {
		user : 'ladybug-tools',
		repo : 'ladybug-web',
		branch : 'gh-pages',
		path : '',
		rawgit: true
	};
	users.leader = {
		user : 'leaderphotos',
		repo : 'leaderphotos.github.io',
		branch : 'master',
		path :''
	};
	users.mrdoob = {
		user : 'mrdoob',
		repo : 'three.js',
		branch : 'dev',
		path : '',
		rawgit: true
	};
	users.paulmasson = {
		user : 'paulmasson',
		logo : '<img src=http://paulmasson.github.io/apple-touch-icon.png height=32 >',
		repo : 'paulmasson.github.io',
		branch : 'master',
		path : ''
	};
	users.pushmePullyou = {
		user : 'pushme-pullyou',
		repo : 'pushme-pullyou.github.io',
		branch : 'master',
		path : '',
		noIndex: true,
		rawgit: null
	};
	users.pushmePullyouTooTo = {
		user : 'pushme-pullyou',
		repo : 'pushme-pullyou.github.io',
		branch : 'master',
		path : 'tootoo',
		noIndex: true,
		rawgit: null
	};
	users.sagemathGH = {
		user : 'sagemath',
		repo : 'sagemath.github.io',
		branch : 'master',
		path : ''
	};
	users.sagemathCell = {
		user : 'sagemath',
		repo : 'sagecell',
		branch : 'gh-pages',
		path : '',
		rawgit: true
	};
	users.sagemathSageDev = {
		user : 'sagemath',
		repo : 'sage',
		branch : 'develop',
		path : '',
		rawgit: true
	};
	users.sagemathDocs = {
		user : 'sagemath',
		repo : 'documentation',
		branch : 'gh-pages',
		path : 'html'
	};
	users.sagemathPlanet = {
		user : 'sagemath',
		repo : 'planet',
		branch : 'gh-pages',
		path : ''
	};
	users.theoArmour = {
		user : 'theo-armour',
		repo : 'theo-armour.github.io',
		branch : 'master',
		path : ''
	};
	users.theoDraw = {
		user : 'theo-armour',
		repo : 'drawing',
		branch : 'master',
		path : ''
	};
	users.theoPages2 = {
		user : 'theo-armour',
		repo : 'theo-armour.github.io',
		branch : 'master',
		path : '', //pages2'
		subText : 'pet the cat',
	};
	users.prediqtiv = {
		user : 'prediqtiv',
		subText : 'Invest smarter',
		repo : 'prediqtiv.github.io',
		branch : 'master',
		path : ''
	};

/*
	users. = {
		user : '',
		repo : '',
		branch : '',
		path : ''
	};
*/


	 SEL.initSelectRepos = function() {

		mnuSelect.innerHTML =

				'<details open>' +

					'<summary><h3>Select User/ Repo/ Branch/ </h3></summary>' +

						'<select id=selUser onchange=SEL.selectRepo(); title="Select repo" size=15 style=width:100%;  >' +

						'</select>' + b +
					b +

				'</details>' +

				'<div id=mnuUserTitle ></div>' +
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

				selUser.innerHTML += '<option>' + file + '</option>';

			}

		 }

		selUser.selectedIndex = 8;

		SEL.selectRepo();

	}


	SEL.selectRepo = function(){

//console.clear();

//		location.hash="";
		history.replaceState( '', document.title, window.location.pathname );

// only create if not already
		var scr = document.body.appendChild( document.createElement( 'script' ) );

		scr.onload = TOO.initUser;

		scr.src = folderRepo + selUser.value;
		user = users[ selUser.value ];

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

