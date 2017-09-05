// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/


	var SEL = SEL || {};

// init menus

	SEL.getMenuDetailsSelectGroup = function() {

		var menuDetailsSelectGroup =

			'<details id=SELdetailsSelectGroup open title="See \'SEL\' namespace and \'sel-select.js\'" >' +

				'<summary><h3>Select types of GitHub users</h3></summary>' +

					'<select id=SELselGroup onchange=COR.setNullHash();SEL.setUserDetails(); title="Select the group of users" size=15 >' +

						USR.groupOptions +

					'</select>' +

				'<small>Enter your query and press enter: </small>' + b +

				'<input id=SELinpQuery placeholder="Enter a search query" onchange=SEL.getSearchItems(this.value); style=width:100%; >' + b +

				b +

			'</details>' +

		'';

		return menuDetailsSelectGroup

	};



	SEL.getMenuDetailsSelectUser = function() {

		menuDetailsSelectUser =

			'<details id=SELdetailsSelectPopular open title="See \'SEL\' namespace and \'sel-select.js\'" >' +

				'<summary><h3>Select GitHub user and repo</h3></summary>' +

				'<select id=SELselUser onchange=SEL.getUserDetails(this.value); title="Select the user" size=15 ></select>' + b +

				b +

				'<input id=SELinpUser placeholder="Enter a GitHub user name" onchange=SEL.getUserDetails(this.value); size=35>' + b +

				b +

				'<div id=SELstats ></div>' + b +

			'</details>' +

//		'<div id=menuFolderNameTableOfContents ></div>' +

		'<div id=menuUserInfo ></div>' +

		'';

		return menuDetailsSelectUser;

	};


// called by HTML file

	SEL.setUserDetails = function() {

		if ( SELselGroup.value === 'listFavorites' ) {

			SELselUser.innerHTML = USR.peepsFavorites;

			SEL.getUserDetails( SELselUser.value );

		} else if ( location.hash.length ) {

			SEL.getSearchItems( SELselGroup.value );

			SEL.getUserDetails( location.hash.slice( 1 ) );

		} else {

			SEL.getSearchItems( SELselGroup.value );

		}

		SELinpQuery.value = SELselGroup.value;

	};



	SEL.getSearchItems = function( query ) {

		var url, xhr, response, item, user;

//		url = 'https://api.github.com/search/repositories?q=' + query + '&sort=comments&order=desc&per_page=100&' + ( API.token || '' );
		url = 'https://api.github.com/search/repositories?q=' + query + '&sort=stars&order=desc&per_page=100&' + ( API.token || '' );

		COR.requestFile( url, callbackSearch );


		function callbackSearch( xhr ) {

			response = JSON.parse( xhr.target.responseText );

			if ( response.message ) { // there's been an error... // Add this to COR

console.log( 'response', response);

				COR.contents.innerHTML =


					'<h1>' + response.message + '</h1>' +
					'<p>See: </p>' +
					'<p>' + ("https://github.com/settings/tokens").link( "https://github.com/settings/tokens" ) + '</p>' +
					'<p>' + ('https://developer.github.com/v3/auth/#basic-authentication').link( 'https://github.com/settings/tokens' ) + '</p>' +
				'';

				return;

			}

			SELstats.innerHTML = 'Github users found with ' + SELinpQuery.value + ' : ' + response.total_count.toLocaleString();

			SELselUser.innerHTML = '';

			for ( var i = 0; i < response.items.length; i++ ) {

				item = response.items[ i ];

				SELselUser[ SELselUser.length ] = new Option( ( i + 1 ) + ' ' + item.full_name, item.owner.login );

			}

			if ( !location.hash ) {

				SELselUser.selectedIndex = Math.floor( SELselUser.length * Math.random() );

				SELinpUser.value = '';

				SEL.getUserDetails( SELselUser.value );

			} else {

				SELselGroup.selectedIndex = -1;

				SELinpQuery.value = '';

				SELselUser.selectedIndex = -1;

				user = location.hash.slice( 1 );

				SEL.getUserDetails( user );

				SELinpUser.value = user;

			}

		}

	};



	SEL.getUserDetails = function( user ) {

console.log( 'user', user );

		if ( SELselGroup.value === 'listFavorites' ) {

			location.hash = user.toLowerCase();

			DAT.getUserData( user.toLowerCase() ); // left column update

			EUS.requestGitHubAPIUserEvents( user.toLowerCase() ); // middle and right columns update


		}

	};



/*

	SEL.getUserDetails = function( user ) {

		location.hash = user;

		if ( DAT.getUserData ) {

			DAT.getUserData( user );

			switch( DAT.currentTopic ) {

				case 'events':
					DAT.getEvents ( user, 0, contents )
					break;
				case 'gists':
					DAT.getGists ( user )
					break;
				case 'orgs':
					DAT.getOrgs( user )
					break;
				case 'repos':
					DAT.getRepos( user )
					break;
				case 'stats':
//					EUS.buildStatsReport( user )
					break;
				default:
					DAT.getRepos( user )

			}

//		DAT.getRepos( user );

		}

// updates contents and right side

		if ( EUS.requestGitHubAPIUserEvents ) {

			EUS.target = updates;
			EUS.requestGitHubAPIUserEvents( user);

		}

	}

*/
