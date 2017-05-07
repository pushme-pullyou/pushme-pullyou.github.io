
	BUT = {};

// see CNT.getFileSetContents

	BUT.setHighlightAndButtons = function( path, gallery ) {

//highlight
		if ( gallery ) {

			index = MNU.files.indexOf( '#!' + path );

		} else {

			index = MNU.files.indexOf( path );

		}

		for ( let i = 0; i < MNU.files.length; i++ ) {

			el = document.getElementById( 'file' + i );

			col = ( i === index ) ? '#ccc' : '';

			if ( el ) { el.style.backgroundColor = col; } // else ...

		}



// buttons

		if ( butEditFile ) {

			var folder = user.folder ? user.folder + '/' : '';

			butEditFile.innerHTML = '<a href="https://github.com/' + user.user + '/' + user.repo + '/blob/' + user.branch + '/' + folder + path + '" target="_blank"> Edit </a>';

		}


		indexNext = index + 1;

		if ( MNU.files[ indexNext ].includes( '###' ) ) { indexNext++; }
		if ( indexNext >= MNU.files.length - 1 ) { indexNext = 0; }

		indexPrevious = index - 1;

		if ( indexPrevious <= 0 ) { indexPrevious = MNU.files.length - 1; }
		if ( MNU.files[ indexPrevious ].includes( '###' ) ) { indexPrevious--; }
		if ( indexPrevious <= 0 ) { indexPrevious = MNU.files.length - 1; }


		if ( butNextFile || butPreviousFile ) {

			if ( gallery ) {

				butNextFile.innerHTML = '<a href=JavaScript:CNT.createPageOfImages("' + MNU.files[ indexNext ].slice( 2 ) + '"); > &gt; </a>';
				butPreviousFile.innerHTML = '<a href=JavaScript:CNT.createPageOfImages("' + MNU.files[ indexPrevious ].slice( 2 ) + '"); > &lt; </a>';

			} else {

				butNextFile.innerHTML = '<a href=JavaScript:CNT.getFileSetContents("' + MNU.files[ indexNext ] + '"); > &gt; </a>';
				butPreviousFile.innerHTML = '<a href=JavaScript:CNT.getFileSetContents("' + MNU.files[ indexPrevious ] + '"); > &lt; </a>';

			}
		}

	}
