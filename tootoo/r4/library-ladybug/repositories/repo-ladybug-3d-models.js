	user = {
		user : 'ladybug-tools',
		repo : '3d-models',
		branch : 'gh-pages',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug-web',
		path : '',
		subText : 'A collection of 3d models of buildings - along with viewers.',
		tagLine : 'A collection of 3d models of buildings - along with viewers.',
		title : 'Ladybug 3D Models',
	};


	MNU.tableOfContents =
`

Home Page
* [Ladybug Web Read Me]( #readme.md )
* [License]( #LICENSE )

A lot of files here, but most need to be updated to support HTTPS.
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};
