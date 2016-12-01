// Copyright &copy; 2016 Jaanga authors. MIT License.

// Documentation: https://developer.github.com/v3/


// Updates left column only

	var DAT = {};

	DAT.get = {};
	DAT.userData = undefined; // will hold all the data for current user


// functions that create menu items

	DAT.getMenuDetailsUserData = function() {

		var menuDetailsUserData =

			'<details id=DATdetailsTemplate open title="See \'DAT\' namespace and \'dat-data.js\'" >' +

				'<summary><h3>GitHub User Data</h3></summary>' +

				'<div id=DATdivUserData ></div>' + b +

				'<small>' +
					'Items are as sent and ordered by GitHub. ' +
					'Display of this content is a WIP. Needs to be curated.' + b +
				'</small>' + b +

			'</details>' +

		'';

		MNU.css.innerHTML += '.DATbuttonMiddle { width: 108px; }';

		return menuDetailsUserData;

	};



// Called from the HTML file

	DAT.getUserData = function( user ) {

		var url, xhr, keys, txt;

		url = 'https://api.github.com/users/' +  user + '?' + ( API.token || '' );

		COR.requestFile( url, callbackUserData );

		function callbackUserData( xhr ) {

			DAT.userData = JSON.parse( xhr.target.responseText );

			if ( DAT.userData.message ) { // error - probably over rate limit

				DATdivUserData.innerHTML = DAT.userData.message;

				return;

			}

			DAT.keys = Object.keys( DAT.userData );
			txt =  '';

			for ( var i = 0; i < DAT.keys.length; i++ ) {

				txt += '<div>' + ( DAT.get[ DAT.keys[ i ] ]( DAT.userData[ DAT.keys[ i ] ], i ) || '' ) + '</div>';

			}

			DATdivUserData.innerHTML = txt;

		}

	}



// in alphabetical order ~ see DAT.userData
// IIRC, there appears to be no published list of the following user fields.
// And thus the following have been gathered by observation of DAT.userData for a number of users?

	DAT.get.avatar_url = function( item, index ) {

		return '<a href=https://avatars.githubusercontent.com/u/' + DAT.userData.id + ' target=_blank ><img src=' + item + ' width=280; ></a>';

	};


	DAT.get.bio = function( item, index ) {

		if ( item ) { return 'Bio: ' + item; }

	};


	DAT.get.blog = function( item, index ) {

		if ( item ) {

			if ( item.includes( 'http' ) || item.includes( '.com' )  ) {

				return 'Blog: '+ item.link( item );

			} else {

				return 'Blog: ' + item;

			}

		}

	};


	DAT.get.collaborators = function( item, index ) {

		if ( item ) { return 'collaborators: ' + item( DAT.userData.collaborators ); }

	};


	DAT.get.company = function( item, index ) {

		if ( item ) {

			if ( item.includes( 'http' ) || item.includes( '.com' )  ) {

				return 'Company: ' + item.link( item );

			} else {

				return 'Company: <a href=https://www.google.com/#q=' + item.replace( / /g, '+' ) + ' target=_blank > ' + item + ' </a>';

			}

		}

	};


	DAT.get.created_at = function( item, index ) {

		return 'Joined: ' + ( new Date( item ) ).toLocaleDateString();

	};


	DAT.get.disk_usage = function( item, index ) {

		if ( item ) { return 'disk_usage: ' + item( DAT.userData.disk_usage ); }

	};


	DAT.get.email = function( item, index ) {

		if ( item ) { return 'Email: <a href=mailto:' + item + ' > ' + item + ' </a>'; }

	};


	DAT.get.events_url = function( item, index ) {

		return '<button class=DATbuttonLeft onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/events"); > raw </button> ' +

			'<button  class=DATbuttonMiddle onclick=RES.getEvents("' + DAT.userData.login + '",0); > events </button> ' +

			'<a href=https://github.com/' + DAT.userData.login + '?tab=activity target=_blank >activity</a>' +

		'';

	};


	DAT.get.followers = function( item, index ) {

		return '<button class=DATbuttonLeft onclick=DAT.getRawData("' + DAT.userData.followers_url + '"); > raw </button> ' +

			'<button  class=DATbuttonMiddle onclick=RES.getFollowers("' + DAT.userData.login + '",' + index + '); > followers </button> ' +

			'<a href=https://github.com/' + DAT.userData.login + '/followers target=_blank >' + item.toLocaleString() + ' followers </a>' +

		'';

	};


	DAT.get.followers_url = function( item, index ) {

// covered in DAT.get.followers

//		return 'Followers URL: ' + item;

	};


	DAT.get.following = function( item ) {

		return '<button class=DATbuttonLeft onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/following"); > raw </button> ' +

			'<button  class=DATbuttonMiddle onclick=RES.getFollowing("' + DAT.userData.login + '"); > following </button> ' +

			'<a href=https://github.com/' + DAT.userData.login + '/following target=_blank >' + item.toLocaleString() + ' following</a>'

		'';

	};


	DAT.get.following_url = function( item, index ) {

// see DAT.get.following

//		return 'Following URL: ' + item;

	};


	DAT.get.gists_url = function( item, index ) {

// see DAT.get.public_gists

//		return 'Gists: ' + item;

	};


	DAT.get.gravatar_id = function( item, index ) {

		if ( item ) { return 'Gravater ID: ' + item; }

	};



	DAT.get.hireable = function( item, index ) {

		if ( item ) { return 'Hireable: ' + item; }

	};


	DAT.get.html_url = function( item, index ) {

//		return 'html url: ' + item;

	};


	DAT.get.id = function( item, index ) {

		return '<button class=DATbuttonLeft onclick=DAT.getRawData("https://api.github.com/user/' + item + '");  title="unformatted API data results straight from GitHub" > raw </button> ' +

			'<button class=DATbuttonMiddle onclick=DAT.fetchEventsDrawTable("https://api.github.com/user/' + item + '",' + index + '); title="GitHub API data prettified" > id </button> ' +

			'<a href=https://api.github.com/user/' + item + ' target=_blank >' + item.toLocaleString() + '</a>' +
		'';

	};


	DAT.get.location = function( item, index ) {

		if ( item ) {

			return 'Location: <a href=https://www.google.com/#q=' + item.replace( / /g, '+' ) + '+' + DAT.userData.login + '&nfpr=1 target=_blank > ' + item + ' </a>';

		}

	};


	DAT.get.login = function( item, index ) {

		return '<button class=DATbuttonLeft onclick=DAT.getRawData("https://api.github.com/users/' + item + '"); title="unformatted API data results straight from GitHub" > raw </button> ' +

			'<button class=DATbuttonMiddle onclick=DAT.fetchEventsDrawTable("https://api.github.com/users/' + item + '",' + index + '); title="GitHub API data prettified" > login </button> ' +

			'<a href=' + DAT.userData.html_url + ' title="Link to the data as rendered by GitHub" target=_blank >' + item + '</a>' +

		'';

	};


	DAT.get.name = function( item, index ) {

		if ( item ) {

			return 'name: <a href=https://www.google.com/#q=' + item.replace( / /g, '+' ) + '+github target=_blank > ' + item + ' </a>';

		}

	};


	DAT.get.organizations_url = function( item, index ) {

		if ( DAT.userData.type === "Organization" ) { return; }

		return '<button class=DATbuttonLeft onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/orgs"); > raw </button> ' +

			'<button class=DATbuttonMiddle onclick=RES.getOrgs("' + DAT.userData.login + '"); > organizations </button> ' +

			'<a href=https://github.com/' + DAT.userData.login + '?tab=organizations target=_blank> orgs </a>' +

		'';

	};


	DAT.get.owned_private_repos = function( item, index ) {

		return 'Owned_private_repos: <a href=' + DAT.userData.owned_private_repos + ' >' + item + '</a>';

	};


	DAT.get.plan = function( item, index ) {

		return 'plan: <a href=' + DAT.userData.plan + ' >' + item + '</a>';

	};


	DAT.get.private_gists = function( item, index ) {

		return 'Private_gists: <a href=' + DAT.userData.private_gists + ' >' + item + '</a>';

	};


	DAT.get.public_repos = function( item, index ) {

// see DAT.get.repos_url

//		return 'Public repos: <a href=' + DAT.userData.repos_url + ' >' + item + '</a>';

	};


	DAT.get.public_gists = function( item, index ) {

		return '<button class=DATbuttonLeft onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/gists"); > raw </button> ' +

			'<button  class=DATbuttonMiddle onclick=RES.getGists("' + DAT.userData.login + '"); > gists </button> ' +

			'<a href=https://gist.github.com/' + DAT.userData.login + ' target=_blank >' + item + ' gists </a>' +

		'';

	};


	DAT.get.repos_url = function( item, index ) {

		return '<button class=DATbuttonLeft onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/repos"); > raw </button> ' +

			'<button  class=DATbuttonMiddle onclick=RES.getRepos("' + DAT.userData.login + '"); > repos </button> ' +

			'<a href=https://github.com/' + DAT.userData.login + '?tab=repositories target=_blank >' + DAT.userData.public_repos + ' repos</a>' +

		'';
	};


	DAT.get.received_events_url = function( item, index ) {

		return '<button class=DATbuttonLeft onclick=DAT.getRawData("' + DAT.userData.received_events_url + '"); > raw </button> ' +

			'<button  class=DATbuttonMiddle onclick=RES.getReceivedEvents("' + DAT.userData.login + '"); > received events </button> ' +

		'';

	};


	DAT.get.starred_url = function( item, index ) {

		return '<button class=DATbuttonLeft onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/starred"); > raw </button> ' +

			'<button  class=DATbuttonMiddle onclick=RES.getStarred("' + DAT.userData.login + '",' + index + '); > starred </button> ' +

			'<a href=https://github.com/stars/' + DAT.userData.login + ' target=_blank >stars</a>' +

		'';

	};


	DAT.get.subscriptions_url= function( item, index ) {

		return '<button class=DATbuttonLeft onclick=DAT.getRawData("https://api.github.com/users/' + DAT.userData.login + '/subscriptions"); > raw </button> ' +

			'<button  class=DATbuttonMiddle onclick=RES.getSubscriptions("' + DAT.userData.login + '"); target=_blank > subscriptions </button> ' +

		'';
	};


	DAT.get.site_admin = function( item, index ) {

		if ( item ) { return 'Site admin: ' + item; }

	};


	DAT.get.total_private_repos = function( item, index ) {

		return 'total_private_repos: <a href=' + DAT.userData.total_private_repos + ' >' + item + '</a>';

	};


	DAT.get.type = function( item, index ) {

		return 'Type: ' + item;

	};


	DAT.get.updated_at = function( item, index ) {

		var date = new Date( item );

		return 'Updated: <a href=https://github.com/' + DAT.userData.login + '?tab=overview&from=' +
			item.slice( 0, 10 ) + ' target=_blank > ' + date.toLocaleDateString() + ' </a>';

	};


	DAT.get.url = function( item, index ) {

//
		return 'url: ' + item.link( item );

	};


	DAT.get.watchers = function( item, index ) {

		return 'url: ' + item;

	};



//==============================================================================


// for all the 'raw' buttons in the left column

	DAT.getRawData = function( url ) {

		var xhr, urlToken;

		urlToken = url + '?' + ( API.token || '' );

		COR.requestFile( urlToken, callback );

		function callback( xhr ) {

			MNU.contents.innerText = '\nURL sent: ' + url + '\n\nGitHub API Response:\n\n' + xhr.target.response;

			window.scrollTo( 0, 0 );

		}

	}


// prettified data

	DAT.fetchEventsDrawTable = function( url, index ) {

		var xhr, obj, keys, txt;

		urlToken = url + '?' + ( API.token || '' );

		COR.requestFile( urlToken, callback );

		function callback( xhr ) {

			obj = JSON.parse( xhr.target.responseText );

// error message ?

			keys = Object.keys( obj );

			txt =

				'<h1>' +
					DAT.userData.type + ': ' + DAT.userData.login.link( DAT.userData.html_url ) + ' ' + ( DAT.keys[ index ] || '' ) +
				'</h1>' +

				'raw url: <a href=' + url + ' target="_blank" >' + url + '</a>' + b +

			b;

			for ( var i = 0; i < keys.length; i++ ) {

				txt += '<tr><td>' + keys[ i ] + ': </td><td> ' + obj[ keys[ i ] ] + '</td></tr>';

			}

			MNU.contents.innerHTML = '<table>' + txt + '</table>' + COR.getMenuFooter();

			window.scrollTo( 0, 0 );

		}

	};
