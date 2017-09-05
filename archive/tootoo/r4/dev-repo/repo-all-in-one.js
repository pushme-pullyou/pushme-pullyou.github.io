
//	let protocol, firstDot, path;

	protocol = location.protocol;

	if ( protocol === 'file:' ) {

		if ( location.pathname.includes( 'github.io' ) ) {

			firstDot = location.pathname.indexOf( 'github.io' );
			user = location.pathname.slice( 0, firstDot - 1 );
			user = user.slice( user.lastIndexOf( '/' ) + 1 );
			repo = user + '.github.io';

			path = location.pathname.slice( firstDot + 10, location.pathname.lastIndexOf( '/' )  );

		} else if ( location.pathname.includes( 'github.com' ) ) {

			firstDot = location.pathname.indexOf( 'github.com' );
			user = location.pathname.slice( 0, firstDot - 1 );
			user = user.slice( user.lastIndexOf( '/' ) + 1 );
			repo = user + '.github.com';
			path = location.pathname.slice( firstDot + 11, location.pathname.lastIndexOf( '/' )  );
		}

	} else if ( protocol.includes( 'http' ) ) {

		firstDot = location.hostname.indexOf( '.github.io' );
		user = location.hostname.slice( 0, firstDot );
		path = location.pathname.slice( 1, location.pathname.lastIndexOf( '/' )  );

	}

// console.log( 'u', user, 'p', path );

//	MNU.tableOfContents = '';

	user = {
		user : user,
		repo : repo,
		branch : 'master',
		path : path,
		tagLine : 'testing',
	};

	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};