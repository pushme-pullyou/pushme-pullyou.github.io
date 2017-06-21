
	let USR = {};

	USR.initSelectUsers = function() {


//		mnuSelect.innerHTML =
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

		for ( let i = 0; i < users.keys.length; i++ ) {

			user = users[ users.keys[ i ] ];

			selUser[ i ] = new Option( user.user + ' ' + user.repo + ' ' + user.path + ' ' + user.branch, users.keys[ i ] );

		}

		selUser.selectedIndex = Math.floor( Math.random() * users.keys.length );
		selUser.selectedIndex = 10;

//		USR.selectUser();

	}


	USR.selectUser = function(){

//console.clear();

//		location.hash="";
		history.replaceState( '', document.title, window.location.pathname );
		user = users[ selUser.value ];

//		TOO.initUser();
		SEL.selectMenuType();

	}

