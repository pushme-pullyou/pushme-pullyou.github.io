
	users = {
		user : 'ladybug-tools',
		repo : 'butterfly-plus',
		branch : 'master',
		path : '',
		rawgit: true

		help : 'https://github.com/ladybug-tools/butterfly=plus',
		path : '',
		subText : 'Browse & view stuff on Ladybug Web real fast!',
		tagLine : 'Butterfly[+] plugins...',
		title : 'Butterfly[+] plugins',
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

