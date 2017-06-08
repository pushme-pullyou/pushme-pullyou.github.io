
	user = {
		user : 'ladybug-tools',
		repo : 'ladybug-tools.github.io',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug-tools.github.io',
		path : '',
		subText : 'adybug Tools GitHub presence!',
		tagLine : 'Ladybug Tools GitHub presence!',
		title : 'Ladybug Tools',
	};


	MNU.tableOfContents =
`
## Ladybug

* [Ladybug Read Me]( #README.md )
* [License]( #LICENSE )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

