	user = {
		user : 'ladybug-tools',
		repo : '3d-models',
		branch : 'gh-pages',
		path : '',
		rawgit: true

		help : 'https://github.com/ladybug-tools/ladybug-web',
		path : '',
		subText : 'Browse & view stuff on Ladybug Web real fast!',
		tagLine : 'Browse & view stuff on Ladybug Web real fast!',
		title : 'Ladybug Web',
	};


	MNU.tableOfContents =
`
## Ladybug 3D Models

* [Ladybug Web Read Me]( #README.md )
* [License]( #LICENSE )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};
