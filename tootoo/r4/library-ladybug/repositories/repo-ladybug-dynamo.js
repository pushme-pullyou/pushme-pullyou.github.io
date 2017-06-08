
	user = {
		user : 'ladybug-tools',
		repo : 'ladybug-dynamo',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug-dynamo',
		path : '',
		subText : 'Browse & view stuff on Ladybug Web real fast!',
		tagLine : 'Browse & view stuff on Ladybug Web real fast!',
		title : 'ladybug-dynamo',
	};


	MNU.tableOfContents =
`
## ladybug-dynamo

* [ladybug-dynamo Read Me]( #README.md )
* [License]( #LICENSE )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

