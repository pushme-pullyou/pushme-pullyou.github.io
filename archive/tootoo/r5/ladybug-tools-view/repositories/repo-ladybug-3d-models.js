	user = {
		user : 'ladybug-tools',
		repo : '3d-models',
		branch : 'gh-pages',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug-web',
		path : '',
		subText : 'Browse & view stuff on Ladybug Web real fast!',
		tagLine : 'Browse & view stuff on Ladybug 3D real fast!',
		title : 'Ladybug 3D Models',
	};


	MNU.tableOfContents =
`

Home Page
* [Ladybug Web Read Me]( #README.md )
* [License]( #LICENSE )

A lot of files here, but most need to be updated to support HTTPS.
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};
