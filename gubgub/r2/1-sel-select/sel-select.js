// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/


	var SEL = SEL || {};

	var DAT = DAT || {};

	var EUS = EUS || {};

// init menus

	SEL.getMenuDetailsSelectQuery = function() {

		var menuDetailsSelectQuery =

			'<details id=SELdetailsSelectQuery open title="See \'SEL\' namespace and \'sel-select.js\'" >' +

				'<summary><h3>Select types of GitHub users</h3></summary>' +

					'<select id=SELselQuery onchange=SEL.setUserDetails(); title="Select the group of users" size=15 >' +

						USR.groupOptions +

					'</select>' +

				'<small>Enter your query and press enter: </small>' + b +

				'<input id=SELinpQuery placeholder="Enter a search query" onchange=SEL.getQueryItems(this.value); style=width:100%; >' + b +

				b +

			'</details>' +

		'';

		return menuDetailsSelectQuery;

	};



	SEL.getMenuDetailsSelectUser = function() {

		menuDetailsSelectUser =

			'<details id=SELdetailsSelectPopular open title="See \'SEL\' namespace and \'sel-select.js\'" >' +

				'<summary><h3>Select GitHub user and repo</h3></summary>' +

				'<select id=SELselUser onchange=location.hash=this.value; title="Select the user" size=15 ></select>' + b +

				b +

				'<input id=SELinpUser placeholder="Enter a GitHub user name" onchange=SEL.getUserDetails(this.value); size=35>' + b +

				b +

				'<div id=SELstats ></div>' + b +

			'</details>' +

		'<div id=menuUserInfo ></div>' +

		'';

		return menuDetailsSelectUser;

	};


//==============================================================================

	SEL.setUserDetails = function() {

		if ( SELselQuery.value === 'listFavorites' ) {

			SELselUser.innerHTML = USR.peepsFavorites;

			SEL.user = SELselUser.value;

			SEL.getUserDetails();  // currently selected option

		} else {

			COR.setNullHash();

			SEL.getQueryItems( SELselQuery.value );

		}

	};


	SEL.getUserDetails = function() {

		window.scrollTo( 0, 0 );

		MNU.updates.scrollTop = 0;


// Create an event here, have the following scripts listen

		if ( DAT.getUserData ) {

			DAT.getUserData( SEL.user );
		}

		if ( EUS.requestGitHubAPIUserEvents ) {

			EUS.requestGitHubAPIUserEvents( SEL.user );

		} else {

			MNUdivUpdates.innerHTML = 'User: ' + SEL.user + ' events will appear here';
			MNUdivContents.innerHTML = 'User: ' + SEL.user + ' data will appear here';

		}

	};

	SEL.getQueryItems = function( query ) {

		var url, xhr, response, item, user;

		SELinpQuery.value = SELselQuery.value;

		url = 'https://api.github.com/search/repositories?q=' + query + '&sort=stars&order=desc&per_page=100&' + ( API.token || '' );

		COR.requestFile( url, callbackQuery );

		function callbackQuery( xhr ) {

			response = JSON.parse( xhr.target.responseText );

			if ( response.message ) { // there's been an error... // Add this to COR

console.log( 'error response.message', response );

				COR.contents.innerHTML =

					'<h1>' + response.message + '</h1>' +
					'<p>See: </p>' +
					'<p>' + ("https://github.com/settings/tokens").link( "https://github.com/settings/tokens" ) + '</p>' +
					'<p>' + ('https://developer.github.com/v3/auth/#basic-authentication').link( 'https://github.com/settings/tokens' ) + '</p>' +
				'';

				return;

			}

			SELstats.innerHTML = 'Github users found with ' + SELinpQuery.value + ' : ' + response.total_count.toLocaleString();

			SEL.getUserItems( response );

		}

	}


	SEL.getUserItems = function( response ) {

		SELselUser.innerHTML = '';

		for ( var i = 0; i < response.items.length; i++ ) {

			item = response.items[ i ];

			SELselUser[ SELselUser.length ] = new Option( ( i + 1 ) + ' ' + item.full_name, item.owner.login );

		}

		if ( !location.hash ) {

//console.log( 'no hash ', 23 );

			SELselUser.selectedIndex = Math.floor( SELselUser.length * Math.random() );

			SEL.user = SELselUser.value;

			SEL.getUserDetails();

		} else {

			SELselQuery.selectedIndex = -1;

			SEL.getUserDetails();

		}

	};
