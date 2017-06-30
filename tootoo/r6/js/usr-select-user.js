
	let USR = {};

//	USR.selectedIndex = Math.floor( Math.random() * users.keys.length );
	USR.selectedIndex = 0;

	USR.initSelectUsers = function() {


		mnuSelectItem.innerHTML =
				'<details open>' +

					'<summary><h3>Select User/ Repo/ Branch/ </h3></summary>' +

						'<select id=selUser onchange=USR.selectUser(); title="Select user" size=15 style=width:100%;  >' +

						'</select>' + b +
					b +

				'</details>' +

		'';

		USR.getMenuSelectUserOptions();

	}



	USR.getMenuSelectUserOptions = function () {

		users.keys = Object.keys( users );

		for ( let i = 0, usr; i < users.keys.length; i++ ) {

			usr = users[ users.keys[ i ] ];

			selUser[ i ] = new Option( usr.user + ' ' + usr.repo + ' ' + usr.path + ' ' + usr.branch, users.keys[ i ] );

		}

		selUser.selectedIndex = USR.selectedIndex;
		user = users[ selUser.value ];
		user.server = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/' ;

	}


	USR.selectUser = function(){

//console.clear();

//		location.hash="";
		history.replaceState( '', document.title, window.location.pathname );
		user = users[ selUser.value ];

		user.server = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/' ;

		TYP.selectMenuType();

	}

