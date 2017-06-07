
	users.ladybugToolsLadybug = {
		user : 'ladybug-tools',
		repo : 'butterfly',
		branch : 'master',
		path : '',
		rawgit: true

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'Browse & view stuff on Ladybug Web real fast!',
		tagLine : 'Browse & view stuff on Ladybug Web real fast!',
		title : 'Ladybug',
	};


	MNU.tableOfContents =
`
## Ladybug

* [Ladybug Read Me]( #readme.md )
* [License]( #license.md )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

