
	user = {
		user : 'ladybug-tools',
		repo : 'epwmap',
		branch : 'gh-pages',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'Map of available .epw weather files',
		tagLine : 'Map of available .epw weather files',
		title : 'epwmap',
	};


	MNU.tableOfContents =
`
## epwmap

* [epwmap Read Me]( #README.md )
* [License]( #LICENSE )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

