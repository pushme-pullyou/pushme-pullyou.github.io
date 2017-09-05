
    MNU = {};

	MNU.initThreeColumns = function() {

		MNU.getCSSThreeColomns();

		MNU.menu = document.body.appendChild( document.createElement( 'div' ) );
		MNU.menu.id = 'MNUmenu';
/*

// use something like this in your HTML file
		MNU.menu.innerHTML =

			COR.getMenuDetailsHeader() +

			COR.getMenuDetailsTemplate() +

			COR.getMenuDetailsAbout() +

			COR.getMenuFooter() +

		b;
*/

		MNU.contents = document.body.appendChild( document.createElement( 'div' ) );
		MNU.contents.id = 'MNUcontents';
		MNU.contents.innerHTML = '<h1>contents</h1><div id=MNUdivContents >' + COR.txt + '</div>';

		MNU.updates = document.body.appendChild( document.createElement( 'div' ) );
		MNU.updates.id = 'MNUupdates';
		MNU.updates.innerHTML = '<h1>updates</h1><div id=MNUdivUpdates >' + COR.txt + '</div>';

//		detailsTemplate.setAttribute('open', 'open');

//		window.addEventListener( 'hashchange', onHashChange, false );

//		if ( location.hash.match( '.md' ) ) { onHashChange(); }


	};


	MNU.getCSSThreeColomns = function() {

		MNU.css = document.body.appendChild( document.createElement( 'style' ) );
		MNU.css.innerHTML =

			'body { font: 12pt monospace; margin: 0; }' +

			'a { color: crimson; text-decoration: none; }' +

			'button, input[type=button] { background-color: #ccc; border: 2px #fff solid; color: #322; cursor: pointer; }' +

			'img { max-width: 100%; }' +
			'iframe { width: 100%; }' +

			'select { width: 100%; }' +
			'summary h2, summary h3, summary h4 { display: inline; }' +
			'summary { outline: none; }' +

//			'.DATbuttonMiddle { width: 108px; }' +
			'.issue { background-color: #fff; border: 1px solid; }' +
//			'.CORpopUP { background-color: white; left: 140px; border: 1px solid red; opacity: 1.0; padding: 5px; position: absolute; width: 140px; z-index: 10; }' +

			'#MNUcontents { border: 0px red solid; left: 24%; position: absolute; top: 0; width: 50%; }' +

			'#MNUmenu { background-color: #eee; height: ' + window.innerHeight + 'px; padding: 0 5px 0 10px; overflow-x: hidden; overflow-y: auto; position: fixed; max-width: 20%; }' +
			'#MNUmenu h1, #MNUmenu h2, #MNUmenu h3 { margin: 0; }' +
			'#MNUmenu img { max-width: 200px; }' +

			'#MNUupdates { background-color: #eee;  height: ' + window.innerHeight + 'px; right: 0; max-width: 20%; overflow-x: hidden; overflow-y: auto; padding: 0 20px; position: fixed; }' +

// DAT?

//			'#repositoryEvents h4 { margin: 0; }' +
//			'#repositoryEvents { max-height: 200px; overflow-y: scroll; font-size: 9pt; }' +

		'';

	};
