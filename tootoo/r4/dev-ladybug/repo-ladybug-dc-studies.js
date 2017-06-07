
	user = {
		user : 'ladybug-tools',
		repo : 'ladybug',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/dc-studies',
		path : '',
		subText : 'Daylight coefficient studies',
		tagLine : 'Daylight coefficient studies',
		title : 'dc-studies',
	};


	MNU.tableOfContents =
`
## dc-studies

* [dc-studies Read Me]( #README.md )
* [License]( #LICENSE )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

