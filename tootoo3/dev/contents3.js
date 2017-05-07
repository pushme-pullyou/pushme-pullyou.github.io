
	let CON = {};

	CON.editor = undefined;

	CON.getFileSetContents = function( path ) {

		let url, u;

		if ( path === undefined ) {

			contents.innerHTML = '<center>No files in this folder</center>';

			return;

		}

		url = TOO.urlGHPages + path;

		u = url.toLowerCase();

		if ( u.endsWith( '.md' ) ){

			CON.getFileMD( url );

		} else if ( u.endsWith( '.html' ) || u.endsWith( '.htm' ) ) {

			CON.getFileHTML( url );

		} else if ( u.endsWith( '.gif' ) || u.endsWith( '.ico' ) || u.endsWith( '.jpg' ) || u.endsWith( '.png' ) ||  u.endsWith( '.svg' ) ) {

			CON.getFileImage( url );

		} else {

			CON.getFileCode( url );

		}

		CON.setHighlightAndButtons( path );

		location.hash = path;

	}


	CON.getFileHTML = function( url ){

		contents.innerHTML =
//			'<iframe id=ifr src=' + url + ' width=' + ( window.innerWidth - 325 ) + ' height=' + ( window.innerHeight - 5 ) +
			'<iframe id=ifr src=' + url + ' width=' + ( window.innerWidth - 325 ) + ' height=100% ' +
			' style="border:0 none; " >' +
		'<iframe>';

	}


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};


	CON.getFileMD = function( url ) {

// https://github.com/showdownjs/showdown

		showdown.setFlavor('github');

		TOO.requestFile( url, callbackMD );

		function callbackMD( xhr ) {



			text = CON.massageText( xhr.target.response );

			contents.innerHTML =

			'<div style="margin: 0 auto; width: 800px; position: relative;" >' +
				text +
			'</div>';

			contents.scrollTop = 0;

		}

	}


	CON.getFileImage = function( url ){

		contents.innerHTML = '<img src="' + url + '" style="border: 0px solid gray; margin: 25px 0 0 50px; max-width: 800px; " >';

	}


	CON.getFileCode = function( url ) {

// try embed gist

		contents.innerHTML =
			'<div id=contentsCode style="border: 0px red solid; height: 100%; margin: 0 auto; width: 900px; position: relative;" >' +
			' item will appear here ' +
		'</div>';

		if ( CON.editor !== undefined ) {

			setEditContents();

		} else {

// check here for latest: https://cdnjs.com/libraries/ace/
// Anyway to get latest automatically?
// use GitHub code embed??

			CON.editor = document.body.appendChild( document.createElement( 'script' ) );
			CON.editor.onload = setEditContents;
			CON.editor.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js';

		}


		function setEditContents() {

			editor = ace.edit( 'contentsCode' );
			editor.$blockScrolling = Infinity;
			editor.getSession().setMode( 'ace/mode/markdown' );

			TOO.requestFile( url, callback );

			function callback( xhr ) {

				editor.setValue( xhr.target.response.slice( 0, 10000 ), -1 );

			}

		}

	}


	CON.createPageOfImages = function( path ) {

			let page, url, items, item, source;

			page = '';

			url = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/contents/' + path;

			TOO.requestFile( url, callbackGalleryContents );

			function callbackGalleryContents( xhr ){

				response = xhr.target.response;
				items = JSON.parse( response );

				for ( let i = 0; i < items.length; i++ ) {

					item = items[ i ];

					source = item.download_url;

					if ( source.includes( '.thumb' ) || source.includes( '.highlight' ) || source.endsWith( '.dat' )  ||
						source.endsWith( '.lock' ) ) { continue; }

					page += '<div style=display:inline-block;margin:10px; >' +
						'<a href=JavaScript:CON.getFileSetContents("' + item.path +'"); ><img src=' + source + ' height=200; title="' + url.slice( 0, -4 ) + '" ></a>' +
					'</div>';

				}

				contents.innerHTML = page;

				CON.setHighlightAndButtons( path, true );

				location.hash = '!' + path;

			}

	}




	CON.setHighlightAndButtons = function( path, gallery ) {

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
		if ( indexNext >= MNU.files.length ) { indexNext = 0; }
		if ( MNU.files[ indexNext ].includes( '###' ) ) { indexNext++; }
		if ( indexNext >= MNU.files.length ) { indexNext = 0; }

		indexPrevious = index - 1;

		if ( indexPrevious < 0 ) { indexPrevious = MNU.files.length - 1; }
		if ( MNU.files[ indexPrevious ].includes( '###' ) ) { indexPrevious--; }
		if ( indexPrevious < 0 ) { indexPrevious = MNU.files.length - 1; }


		if ( butNextFile || butPreviousFile ) {

			if ( gallery ) {

				butNextFile.innerHTML = '<a href=JavaScript:CON.createPageOfImages("' + MNU.files[ indexNext ].slice( 2 ) + '"); > &gt; </a>';
				butPreviousFile.innerHTML = '<a href=JavaScript:CON.createPageOfImages("' + MNU.files[ indexPrevious ].slice( 2 ) + '"); > &lt; </a>';

			} else {

				butNextFile.innerHTML = '<a href=JavaScript:CON.getFileSetContents("' + MNU.files[ indexNext ] + '"); > &gt; </a>';
				butPreviousFile.innerHTML = '<a href=JavaScript:CON.getFileSetContents("' + MNU.files[ indexPrevious ] + '"); > &lt; </a>';

			}
		}

	}
