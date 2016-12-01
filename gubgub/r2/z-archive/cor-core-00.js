// Copyright © 2016 Jaanga authors. MIT License


	var b = '<br>';
	var COR = {};

	var API = API || {};
	var SER = SER || {};
	var DAT = DAT || {};
	var EUS = EUS || {};

	API.token = '';


// Add USR defaults to COR?

	COR.converter = new showdown.Converter( { strikethrough: true, literalMidWordUnderscores: true, simplifiedAutoLink: true, tables: true });

	COR.documentTitle = document.title;

	COR.objectName = 'COR';

//	COR.readMeURL = 'core-r1.html#../README.md'; // for testing
	COR.readMeURL = '#README.md';

	COR.readMeText = 'This is the COR default version of GubGub.';

	COR.taglineHeader =

		'<small>' +
			'Explore and monitor the <a href="https://github.com/about" target="_blank">many GitHub projects</a> ' +
			'helped by the <a href=" https://developer.github.com/v3/" target="_blank">GitHub API</a> and client-side cookbook JavaScript.' + b +
		'</small>';

//	COR.txt = '<p>lorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur?</p>';
	COR.txt = '<p>GitHub API responses will appear here.</p>';



	COR.getMenuDetailsHeader = function() {

		var menuDetailsHeader =

			'<h3>' +
				'<a href=http://jaanga.github.io/ title="Jaanga - your 3D happy place" > &#x2766 Jaanga </a> &raquo; ' +
			'</h3>' +
			'<h2>' +
				'<a href="" title="Click here to refresh this page" >' + document.title + '</a> ~ ' +
				'<a href=' + COR.readMeURL + ' onmouseover=CORpopHelp.style.display=""; onmouseout=CORpopHelp.style.display="none"; > &#x24D8; </a>' +

			'</h2>' +

			COR.taglineHeader +

			'<div class=CORpopUP id=CORpopHelp style=display:none; ><p>Hi there!</p>Click the i-in-circle info icon for README & latest updates.</div>' +

		b;

		MNU.css.innerHTML += '.CORpopUP { background-color: white; left: 140px; border: 1px solid red; opacity: 1.0; padding: 5px; position: absolute; width: 140px; z-index: 10; }';

		return menuDetailsHeader;

	};


	COR.getMenuDetailsAbout = function() {

		var menuDetailsAbout =

			'<details id=detailsAbout title="See \'COR\' namespace and \'cor-core-r1.js\'" >' +

				'<summary><h3>About</h3></summary>' +

				'<p>' +
					'Copyright &copy; 2016 <a href=https://github.com/orgs/jaanga/people target="_blank">Jaanga authors</a>' + b +
					'<jaanga.github.io/license.md >MIT license</a>' +
				'</p>' +

				'<p>Thank you <a href=https://developer.github.com/v3/ > GitHub API </a><p>' +

				'<p>Click the \'i in a circle\' info icon for more <a href=index.html#README.md >help</a></p>' +

				'<p>Kindly report any issues at <a href="https://github.com/jaanga/gubgub/issues" target="_blank">jaanga/gubgub/issues</a></p>' +

			'</details>' +

		'';

		return menuDetailsAbout;

	};


	COR.getMenuFooter = function() {

		var footer =

			'<hr>' +

			'<center>' +
				'<a href=javascript:COR.menu.scrollTop=0; style=text-decoration:none; onmouseover=pop2.style.display=""; onmouseout=pop2.style.display="none"; ><h1> &#x2766 <h1></a>' +
			'</center>' +

			'<div class=CORpopUP id=pop2 style=display:none;bottom:100px; >' +
				'Jaanga - your 3D happy place.<br>Click here to return to the top of the page' + b +
			'</div>' +

		'';

// should CSS be added here instead of in HTML?

		return footer;

	};


	COR.getPageFooter = function() {

		return b + '<hr>' +
		'<center><h1>' +
			'<a href=javascript:window.scrollTo(0,0); style=text-decoration:none; > &#x2766; </a>' +
		'</h1></center>';

	}

// Use in HTML
// 			COR.getMenuDetailsTemplate() +
//		CORdetailsTemplate.setAttribute( 'open', 'open' );

	COR.getMenuDetailsTemplate = function() {

		var menuDetailsTemplate =

			'<details id=CORdetailsTemplate >' +

				'<summary><h3>Template</h3></summary>' +

				'<div id=CORdivTemplate >' +

					'<p><button > button </button></p>' +

					'<p>' + ( 'home').link( '../index.html') + '<p>' +
					'<p>' + ( 'readme').link( '#README.md') + '<p>' +

					COR.txt + b +

				'</div>' +

			'</details>' +

		'';

		return menuDetailsTemplate;

	};


// utils

	COR.requestFile = function( url, callback ) {

		var xhr;

		xhr = new XMLHttpRequest();
		xhr.crossOrigin = 'anonymous';
		xhr.open( 'GET', url, true );
		xhr.onload = callback;
		xhr.send( null );

	}


	COR.setNullHash = function() {

		history.replaceState( '', document.title, window.location.pathname );

	}

	COR.onRequestErrorMessage = function( response ) {

		if ( response.message ) {

			COR.contents.innerHTML = response.message;

			return;

		}

	}


	COR.onHashChange = function() {

		var url, callback, xhr;

		url = location.hash.slice( 1 );

		if ( url.match( 'token=' ) ){ return;  }

		callback = function( xhr ) {

// add error message handler

//			COR.onRequestErrorMessage( xhr )

			if ( xhr.message ) { COR.contents.innerHTML = xhr.message; return; }
console.log( 'xhr.target', xhr.target );
			MNUdivContents.innerHTML = COR.converter.makeHtml( xhr.target.responseText );

			document.title = url.split( '/' ).pop() + ' ~ ' + COR.documentTitle;

			COR.setNullHash();

//console.log( 'url', url, READMEbespokeText );

			if ( url.match( 'README.md' ) ){ READMEbespokeText.innerHTML = COR.readMeText; }

		};

		COR.requestFile( url, callback );

	};
