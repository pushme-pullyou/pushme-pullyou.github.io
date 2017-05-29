
	let SEL = {};
	let users = {};

	users.bPesquet = {
		user: 'bpesquet',
		subText: 'A modern introduction to an essential language.',
		repo: 'thejsway',
		branch: 'master',
		folder: '',
		rawgit: true,
//		defaultFile : 'LICENSE'
	};
	users.d3 = {
		user : 'd3',
		logo : '<img src=https://d3js.org/logo.svg height=32 >',
		repo : 'd3',
		branch : 'master',
		folder : '',
		rawgit: true
	};
	users.d3GH = {
		user : 'd3',
		logo : '<img src=https://d3js.org/logo.svg height=32 >',
		repo : 'd3.github.com',
		branch : 'master',
		folder : '',
		rawgit: true,
		defaultFile : 'LICENSE'
	};
	users.frontEnd = {
		user : 'FrontendMasters',
		repo : 'front-end-handbook-2017',
		branch : 'master',
		folder : '',
		rawgit: true
	};
	users.jaanga = {
		user : 'jaanga',
		logo : '<img src=https://jaanga.github.io/j.png height=32 >',
		repo : 'jaanga.github.io',
		branch : 'master',
		folder : '',
		defaultFile : 'readme.md'
	};
	users.jDemo = {
		user: 'jaanga',
		logo : '<img src=https://jaanga.github.io/j.png height=32 >',
		repo: 'jaanga.github.io',
		branch: 'master',
		folder: 'demo'
	};
	users.jDocs = {
		user: 'jaanga',
		logo : '<img src=https://jaanga.github.io/j.png height=32 >',
		repo: 'jaanga.github.io',
		branch: 'master',
		folder: 'documents'
	};
	users.jTerrain = {
		user: 'jaanga',
		logo : '<img src=https://jaanga.github.io/j.png height=32 >',
		repo: 'terrain3',
		branch: 'gh-pages',
		folder: ''
	};
	users.jupyter = {
		user : 'jupyter',
		logo : '<img src=https://blog.jupyter.org/content/images/2015/02/jupyter-sq-text.png height=32 >',
		repo : 'jupyter.github.io',
		branch : 'master',
		folder : '',
		rawgit: true
	};
	users.jupyterNotebook = {
		user : 'jupyter',
		logo : '<img src=https://blog.jupyter.org/content/images/2015/02/jupyter-sq-text.png height=32 >',
		repo : 'notebook',
		branch : 'master',
		folder : '',
		rawgit: true
	};
	users.ladybugDynamo = {
		user : 'ladybug-tools',
		repo : 'ladybug-dynamo',
		branch : 'gh-pages',
		folder : '',
		rawgit: true
	};
	users.ladybugWeb = {
		user : 'ladybug-tools',
		repo : 'ladybug-web',
		branch : 'gh-pages',
		folder : '',
		rawgit: true
	};
	users.leader = {
		user : 'leaderphotos',
		repo : 'leaderphotos.github.io',
		branch : 'master',
		folder :''
	};
	users.mrdoob = {
		user : 'mrdoob',
		repo : 'three.js',
		branch : 'dev',
		folder : '',
		rawgit: true
	};
	users.paulmasson = {
		user : 'paulmasson',
		logo : '<img src=http://paulmasson.github.io/apple-touch-icon.png height=32 >',
		repo : 'paulmasson.github.io',
		branch : 'master',
		folder : ''
	};
	users.pushmePullyou = {
		user : 'pushme-pullyou',
		repo : 'pushme-pullyou.github.io',
		branch : 'master',
		folder : '',
		noIndex: true,
		rawgit: null
	};
	users.pushmePullyouTooTo = {
		user : 'pushme-pullyou',
		repo : 'pushme-pullyou.github.io',
		branch : 'master',
		folder : 'tootoo',
		noIndex: true,
		rawgit: null
	};
	users.sagemathGH = {
		user : 'sagemath',
		repo : 'sagemath.github.io',
		branch : 'master',
		folder : ''
	};
	users.sagemathCell = {
		user : 'sagemath',
		repo : 'sagecell',
		branch : 'gh-pages',
		folder : '',
		rawgit: true
	};
	users.sagemathSageDev = {
		user : 'sagemath',
		repo : 'sage',
		branch : 'develop',
		folder : '',
		rawgit: true
	};
	users.sagemathDocs = {
		user : 'sagemath',
		repo : 'documentation',
		branch : 'gh-pages',
		folder : 'html'
	};
	users.sagemathPlanet = {
		user : 'sagemath',
		repo : 'planet',
		branch : 'gh-pages',
		folder : ''
	};
	users.theoArmour = {
		user : 'theo-armour',
		repo : 'theo-armour.github.io',
		branch : 'master',
		folder : ''
	};
	users.theoDraw = {
		user : 'theo-armour',
		repo : 'drawing',
		branch : 'master',
		folder : ''
	};
	users.theoPages2 = {
		user : 'theo-armour',
		repo : 'theo-armour.github.io',
		branch : 'master',
		folder : 'pages2'
	};
	users.prediqtiv = {
		user : 'prediqtiv',
		subText : 'Invest smarter',
		repo : 'prediqtiv.github.io',
		branch : 'master',
		folder : ''
	};

/*
	users. = {
		user : '',
		repo : '',
		branch : '',
		folder : ''
	};
*/


	 SEL.initSelectUsers = function() {

		mnuSelect.innerHTML =

				'<details open>' +

					'<summary><h3>Select User/ Repo/ Branch/ </h3></summary>' +

//						'<select id=selUser onchange=location.hash="";TOO.initUser(users[this.value]); title="Select user" size=15 style=width:100%;  >' +
//						'<select id=selUser onchange=TOO.initUser(users[this.value]); title="Select user" size=15 style=width:100%;  >' +
						'<select id=selUser onchange=SEL.selectUser(); title="Select user" size=15 style=width:100%;  >' +

						'</select>' + b +
					b +

				'</details>' +

		'';

//		SEL.getMenuSelectUserOptions();

	}



	SEL.getRepoOptions = function() {

//		let urlFolderAPI;

		urlFolderAPI = 'https://api.github.com/repos/pushme-pullyou/pushme-pullyou.github.io/contents/tootoo/r4/dev-repo/';

		TOO.requestFile( urlFolderAPI, callbackRepos );


	}


	function callbackRepos( xhr ){

//		let files, file;
//		let urlFolder = 'https://' + user.user + '.github.io/' + user.path + '/';

		files = xhr.target.response;

		files = JSON.parse( files );

		for ( let i = 0; i < files.length; i++) {

			file = files[ i ].name;

			if ( file.endsWith( '.js') ) {

				selUser.innerHTML += '<option>' + file + '</option>';

			}

		 }

		 selUser.selectedIndex = 7;

		 SEL.selectRepo();

	}


	SEL.selectRepo = function(){

console.clear();

//		location.hash="";
		history.replaceState( '', document.title, window.location.pathname );

		var scr = document.body.appendChild( document.createElement( 'script' ) );

		scr.onload = TOO.initUser;

		scr.src = '../dev-repo/' + selUser.value;
//		user = users[ selUser.value ];


	}




	SEL.selectUser = function(){

console.clear();

//		location.hash="";
		history.replaceState( '', document.title, window.location.pathname );
		user = users[ selUser.value ];
		TOO.initUser();

	}


	SEL.getMenuSelectUserOptions = function () {

		let user;

		users.keys = Object.keys(users);

		for (let i = 0; i < users.keys.length; i++) {

			user = users[users.keys[i]];

			selUser[i] = new Option(user.user + ' ' + user.repo + ' ' + user.folder + ' ' + user.branch, users.keys[i]);

		 }

		selUser.selectedIndex = users.keys.indexOf(user.user);

	 }
