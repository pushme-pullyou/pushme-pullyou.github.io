
	let uriDefaultFile = 'README.md';

//	location.hash = 'threejs-basic.html';

	let css, script, divMenu, divContainer, hamburger;

	init();

	function init() {

		const txt = 
			'<p>' + document.head.querySelector( '[name=description]' ).content + '</p>' +
			'<p><a href=#README.md>read me</a></p>' +
			'<hr>' +
		'';

		css = document.head.appendChild( document.createElement( 'link' ) );
		css.rel = 'stylesheet';
		css.type = 'text/css';
		css.href = 'style.css';

		script = document.body.appendChild( document.createElement( 'script' ) );
		script.src = 'https://cdn.rawgit.com/showdownjs/showdown/1.8.5/dist/showdown.min.js';
		script.onload = onHashChange;

		divMenu = document.body.appendChild( document.createElement( 'div' ) );
		divMenu.id = 'divMenu';
		divMenu.innerHTML =
			'<h2>' +
				'<a  href = "" >' + document.title + '</a>' +
			'</h2>';

		hamburger = document.body.appendChild( document.createElement( 'div' ) );
		hamburger.id = 'hamburger';
		hamburger.innerHTML = 'slide &#9776';
		hamburger.onclick = toggleNav;

		divContainer = document.body.appendChild( document.createElement( 'div' ) );
		divContainer.id = 'divContainer';

// add event handlers

		window.addEventListener ( 'hashchange', onHashChange, false );

/// contents

		divMenu.innerHTML += txt;

	}



	function onHashChange() {

		const url = !location.hash ? uriDefaultFile : location.hash.slice( 1 );
		const ulc = url.toLowerCase();

		if ( ulc.endsWith( '.md' ) ) {

			requestFile( url, callbackMarkdown );

		} else if ( ulc.endsWith( '.html' ) ) {

			document.body.style.overflow = 'hidden';
			divContainer.innerHTML = '<iframe src=' + url + ' height=100% width=100% style=border:none; ></iframe>';

		} else if ( ulc.endsWith( '.gif' ) || ulc.endsWith( '.png' ) || ulc.endsWith( '.jpg' ) || ulc.endsWith( '.svg' )) {

			divContents.innerHTML = '<img src=' + url + ' >';

		} else {

			requestFile( urlGitHubPage + url, callbackToTextarea );

		}

	}



	function callbackMarkdown( xhr ){

		showdown.setFlavor('github');
		const converter = new showdown.Converter();
		const response = xhr.target.response;
		const html = converter.makeHtml( xhr.target.responseText );

		document.body.overflow = '';
		divContainer.innerHTML = '<div id=divContents ></div>';
		divContents.style.maxWidth = '800px';
		divContents.innerHTML = html;
		window.scrollTo( 0, 0 );

	}



	function callbackToTextarea( xhr ){

		const response = xhr.target.response;

		divContents.innerHTML = '<textarea style=height:100%;width:100%; >' + response + '</textarea>';

	}



	function requestFile( url, callback ) {

		const xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onerror = function( xhr ) { console.log( 'error:', xhr  ); };
//		xhr.onprogress = function( xhr ) { console.log(  'bytes loaded: ' + xhr.loaded.toLocaleString() ) }; /// or something
		xhr.onload = callback;
		xhr.send( null );

	}



	function toggleNav() {

		const width = getComputedStyle( document.documentElement ).getPropertyValue( '--mnu-width' );

		if ( !divMenu.style.width || divMenu.style.width === width ) {

			divMenu.style.width = '0';
			divMenu.style.padding = '0';
			hamburger.style.left = '-100px';
			divContainer.style.marginLeft = '0';

		} else {

			divMenu.style.width = width;
			divMenu.style.padding = '30px 10px 0 10px';
			hamburger.style.left = 'calc( var( --mnu-width ) - 100px )';
			divContainer.style.marginLeft = width;

		}

	}
