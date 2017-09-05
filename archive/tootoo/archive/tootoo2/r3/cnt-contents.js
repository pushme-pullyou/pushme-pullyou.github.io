
	let CNT = {};
	CNT.editor = undefined;

	CNT.getFileSetContents = function( path ) {

		let url, u;

		if ( path === undefined ) {

			contents.innerHTML = '<center>No files in this folder</center>';

			return;

		}

		url = TOO.urlGHPages + path;

		u = url.toLowerCase();

		if ( u.endsWith( '.md' ) ){

			CNT.getFileMD( url );

		} else if ( u.endsWith( '.html' ) || u.endsWith( '.htm' ) ) {

			CNT.getFileHTML( url );

		} else if ( u.endsWith( '.gif' ) || u.endsWith( '.ico' ) || u.endsWith( '.jpg' ) || u.endsWith( '.png' ) ||  u.endsWith( '.svg' ) ) {

			CNT.getFileImage( url );

		} else {

			CNT.getFileCode( url );

		}

		BUT.setHighlightAndButtons( path );

		location.hash = path;

	}


	CNT.getFileHTML = function( url ){

		contents.innerHTML =
//			'<iframe id=ifr src=' + url + ' width=' + ( window.innerWidth - 325 ) + ' height=' + ( window.innerHeight - 5 ) +
			'<iframe id=ifr src=' + url + ' width=' + ( window.innerWidth - 325 ) + ' height=100% ' +
			' style="border:0 none; " >' +
		'<iframe>';

	}


	CNT.massageText = function( response ){

		CNT.converter = new showdown.Converter();
		text = CNT.converter.makeHtml( response );

		return text;

	};


	CNT.getFileMD = function( url ) {

// https://github.com/showdownjs/showdown

		showdown.setFlavor('github');

		TOO.requestFile( url, callbackMD );

		function callbackMD( xhr ) {



			text = CNT.massageText( xhr.target.response );

			contents.innerHTML =

			'<div style="margin: 0 auto; width: 800px; position: relative;" >' +
				text +
			'</div>';

			contents.scrollTop = 0;

		}

	}


	CNT.getFileImage = function( url ){

		contents.innerHTML = '<img src="' + url + '" style="border: 0px solid gray; margin: 25px 0 0 50px; max-width: 800px; " >';

	}


	CNT.getFileCode = function( url ) {

// try embed gist

		contents.innerHTML =
			'<div id=contentsCode style="border: 0px red solid; height: 100%; margin: 0 auto; width: 900px; position: relative;" >' +
			' item will appear here ' +
		'</div>';

		if ( CNT.editor !== undefined ) {

			setEditContents();

		} else {

// check here for latest: https://cdnjs.com/libraries/ace/
// Anyway to get latest automatically?
// use GitHub code embed??

			CNT.editor = document.body.appendChild( document.createElement( 'script' ) );
			CNT.editor.onload = setEditContents;
			CNT.editor.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js';

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


	CNT.createPageOfImages = function( path ) {

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
						'<a href=JavaScript:CNT.getFileSetContents("' + item.path +'"); ><img src=' + source + ' height=200; title="' + url.slice( 0, -4 ) + '" ></a>' +
					'</div>';

				}

				contents.innerHTML = page;

				BUT.setHighlightAndButtons( path, true );

				location.hash = '!' + path;

			}

	}

