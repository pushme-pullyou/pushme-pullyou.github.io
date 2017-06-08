
	user = {
		user : 'ladybug-tools',
		repo : 'butterfly-primer',
		branch : 'master',
		path : '',
		rawgit: true,

		help : 'https://github.com/ladybug-tools/ladybug',
		path : '',
		subText : 'Browse & view stuff on Ladybug Web real fast!',
		tagLine : 'Browse & view stuff on Ladybug Web real fast!',
		title : 'butterfly primer',
	};


	MNU.tableOfContents =
`
## Butterfly Primer

* [utterfly-primer Read Me]( #README.md )
* [License]( #LICENSE )
`;


	CON.massageText = function( response ){

		CON.converter = new showdown.Converter();
		text = CON.converter.makeHtml( response );

		return text;

	};

