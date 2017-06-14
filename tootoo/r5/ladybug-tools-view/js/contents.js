
	let CON = {};


	CON.editor = undefined;

	CON.getFileSetContents = function( path ) {

		TOO.urlGHPages = 'https://rawgit.com/' + user.user + '/' + user.repo + '/' + user.branch + '/' ;

		let url, u;

		if ( path === undefined ) {

			contents.innerHTML = '<center style=top:50%; >No files in this folder</center>';

			return;

		}

		url = TOO.urlGHPages + path;

		u = url.toLowerCase();

		if ( u.endsWith( '.md' ) ){

			CON.getFileMD( url );

		} else if ( u.endsWith( '.html' ) || u.endsWith( '.htm' ) ) {

			CON.getFileHTML( url );

		} else if ( u.endsWith( '.gif' ) || u.endsWith( '.ico' ) || u.endsWith( '.jpg' ) || u.endsWith( '.jpeg' ) || u.endsWith( '.png' ) ||  u.endsWith( '.svg' ) ) {

			CON.getFileImage( url );

		} else {

			CON.getFileCode( url );

		}

//		menu.scrollTop = 0;

	}


	CON.getFileHTML = function( url ){

		contents.innerHTML =
//			'<iframe id=ifr src=' + url + ' width=' + ( window.innerWidth - 325 ) + ' height=' + ( window.innerHeight - 5 ) +
//			'<iframe id=ifr src=' + url + ' width=' + ( window.innerWidth - 325 ) + ' height=100% ' +
			'<iframe id=ifrHTML src=' + url + ' > ' +
//			' style="border:0 none; " >' +
		'<iframe>';

	}


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};


	CON.getFileMD = function( url ) {

// https://github.com/showdownjs/showdown

		let text, response;

		showdown.setFlavor('github');

		SEL.requestFile( url, callbackMD );

		function callbackMD( xhr ) {

			response = xhr.target.response;

			if ( response.includes( 'DOCTYPE') ) {

// console.log( '', response  );

				contents.innerHTML = '<h1 style=text-align:center; >file not found</h1>';

				return;

			}



			text = CON.massageText( response );

			contents.innerHTML =

			'<div id=divMD >' + text + '</div>';

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

			SEL.requestFile( url, callback );

			function callback( xhr ) {

				editor.setValue( xhr.target.response.slice( 0, 10000 ), -1 );

			}

		}

	}


	CON.createPageOfImages = function( path ) {

			let page, url, items, item, source;

			page = '';

			url = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/contents/' + path;

			SEL.requestFile( url, callbackGalleryContents );

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




	CON.setButtons = function( path ) {

		var index, folder, indexNext, indexPrevious;

		if ( butEditFile ) {

			folder = user.path ? user.path + '/' : '';

			butEditFile.innerHTML = '<a href="https://github.com/' + user.user + '/' + user.repo + '/blob/' + user.branch + '/' + folder + path + '" target="_blank"> Edit </a>';

		}

		index = SEL.files.indexOf( path );

		indexNext = index + 1;
		if ( indexNext >= SEL.files.length ) { indexNext = 0; }

		indexPrevious = index - 1;
		if ( indexPrevious < 0 ) { indexPrevious = SEL.files.length - 1; }

		if ( butNextFile || butPreviousFile ) {

			butNextFile.innerHTML = '<a href="#' + SEL.files[ indexNext ] + '" > &gt; </a>';
			butPreviousFile.innerHTML = '<a href="#' + SEL.files[ indexPrevious ] + '" > &lt; </a>';

		}


	}
