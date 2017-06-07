
	user = {
		user : 'ladybug-tools',
		repo : 'butterfly',
		branch : 'master',
		path : '',
		rawgit: true

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'A light python API for creating and running OpenFoam cases for CFD simulation.',
		tagLine : 'A light python API for creating and running OpenFoam cases for CFD simulation.',
		title : 'butterfly',
	};


	MNU.tableOfContents =
`
## butterfly

* [butterfly Read Me]( #README.md )
* [License]( #LICENSE )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

