
	BUT = {};

	BUT.initButtons = function() {

		editButton = document.body.appendChild( document.createElement( 'div' ) );
		editButton.id = 'editButton';
		editButton.innerHTML = 'Edit';
		editButton.title = 'Update this page using the GitHub source code editor';

		nextFile = document.body.appendChild( document.createElement( 'div' ) );
		nextFile.id = 'nextFile';
		nextFile.innerHTML = '&gt;';
		nextFile.title = 'Next file';

		previousFile = container.appendChild( document.createElement( 'div' ) );
		previousFile.id = 'previousFile';
		previousFile.innerHTML = '&lt;';
		previousFile.title = 'Previous file';

	}



	BUT.setHighlightAndButtons = function( path, gallery ) {

//highlight
		index = TOO.files.indexOf( path );

		for ( let i = 0; i < TOO.files.length; i++ ) {

			el = document.getElementById( 'file' + i );

			col = ( i === index ) ? '#ccc' : '';

			el.style.backgroundColor = col;

		}

// buttons
		if ( editButton ) {

			folder = user.folder ? user.folder + '/' : '';

			editButton.innerHTML = '<a href="https://github.com/' + user.user + '/' + user.repo + '/blob/' + user.branch + '/' + folder + path + '" target="_blank"> Edit </a>';

		}

		indexNext = index + 1;

		if ( index >= TOO.files.length - 1 ) { indexNext = 0; }

		indexPrevious = index - 1;

		if ( index <= 0 ) { indexPrevious = TOO.files.length - 1; }

		if ( nextFile || previousFile ) {

			if ( gallery ) {

				nextFile.innerHTML = '<a href=JavaScript:TOO.createPageOfImages("' + TOO.files[ indexNext ] + '"); > &gt; </a>';
				previousFile.innerHTML = '<a href=JavaScript:TOO.createPageOfImages("' + TOO.files[ indexPrevious ] + '"); > &lt; </a>';

			} else {

				nextFile.innerHTML = '<a href=JavaScript:TOO.getFileSetContents("' + TOO.files[ indexNext ] + '"); > &gt; </a>';
				previousFile.innerHTML = '<a href=JavaScript:TOO.getFileSetContents("' + TOO.files[ indexPrevious ] + '"); > &lt; </a>';

			}
		}

	}
