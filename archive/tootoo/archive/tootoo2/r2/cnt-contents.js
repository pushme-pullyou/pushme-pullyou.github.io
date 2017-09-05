
	TOO.getFileSetContents = function( path ) {

		let url, u;

		if ( path === undefined ) {

			contents.innerHTML = '<center>no files in this folder</center>';
			return;

		}

		url = TOO.urlGHPages + path;

		u = url.toLowerCase();

		if ( u.endsWith( '.md' ) ){

			TOO.getFileMD( url );

		} else if ( u.endsWith( '.html' ) || u.endsWith( '.htm' ) ) {

			TOO.getFileHTML( url );

		} else if ( u.endsWith( '.gif' ) || u.endsWith( '.ico' ) || u.endsWith( '.jpg' ) || u.endsWith( '.png' ) ||  u.endsWith( '.svg' ) ) {

			TOO.getFileImage( url );

		} else {

			TOO.getFileCode( url );

		}

		BUT.setHighlightAndButtons( path );

		location.hash = path;

	}


	TOO.getFileHTML = function( url ){

		contents.innerHTML =
			'<iframe id=ifr src=' + url + ' width=' + ( window.innerWidth - 325 ) + ' height=' + ( window.innerHeight - 5 ) +
			' style="border:0 none; " >' +
		'<iframe>';

	}


	TOO.massageText = function( response ){

		text = TOO.converter.makeHtml( response );

		return text;

	};


	TOO.getFileMD = function( url ) {

// https://github.com/showdownjs/showdown

		showdown.setFlavor('github');

		TOO.converter = new showdown.Converter();

		TOO.requestFile( url, callbackMD );

		function callbackMD( xhr ) {

			text = TOO.massageText( xhr.target.response );

			contents.innerHTML =

			'<div style="margin: 0 auto; width: 800px; position: relative;" >' +
				text +
			'</div>';

			contents.scrollTop = 0;

		}

	}


	TOO.getFileImage = function( url ){

		contents.innerHTML = '<img src="' + url + '" style="border: 0px solid gray; margin: 25px 0 0 50px; max-width: 800px; " >';

	}


	TOO.getFileCode = function( url ) {

// try embed gist
		contents.innerHTML =
			'<div id=contentsCode style="border: 0px red solid; height: 900px; margin: 0 auto; width: 900px; position: relative;" >' +
			' item will appear here ' +
		'</div>';

		if ( TOO.editor ) {

			setEditContents();

		} else {

// check here for latest: https://cdnjs.com/libraries/ace/
// Anyway to get latest automatically?
// use GitHub code embed??

			TOO.editor = document.body.appendChild( document.createElement( 'script' ) );
			TOO.editor.onload = setEditContents;
			TOO.editor.src = 'https://cdnjs.cloudflare.com/ajax/libs/ace/1.2.6/ace.js';

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


	TOO.createPageOfImages = function( path ) {

			let page, items, item, fileName;

			page = '';
//			count = 0;

			fileName = 'https://api.github.com/repos/' + user.user + '/' + user.repo + '/contents/' + path;

			TOO.requestFile( fileName, callbackGalleryContents );

			function callbackGalleryContents( xhr ){

				response = xhr.target.response;
				items = JSON.parse( response );

				for ( let i = 0; i < items.length; i++ ) {

					item = items[ i ];

					source = item.download_url;

					if ( source.includes( 'TOOgallery' ) || source.includes( '.thumb' ) || source.includes( '.highlight' ) || source.endsWith( '.dat' )  || source.endsWith( '.lock' ) ) { continue; }

					page += '<div style=display:inline-block;margin:10px; >' +
						'<a href=JavaScript:TOO.getFileSetContents("' + item.path +'"); ><img src=' + source + ' height=200; title="' + fileName.slice( 0, -4 ) + '" ></a>' +
					'</div>';

				}

				contents.innerHTML = page;

				TOO.setHighlightAndButtons( path, true );

			}

	}

